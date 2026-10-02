import React, { useCallback, useEffect, useRef, useState } from "react";
import pathwayVideo from "../../assets/New/pathway_vedio.mp4";

/* ============================================================
   CONFIG
============================================================ */

// Higher = snappier, lower = more cinematic
const DAMPING = 12;

// Scroll length of the section (in viewport heights)
const SCROLL_LENGTH_VH = 250;

// Word blocks with staggered sequential timing (Pathways comes late in initial sequence)
const WORDS = [
  {
    label: "Courses.",
    start: 0.1,
    exit: 0.28,
    pos: "left-[4%] top-[28%] sm:left-[6%] md:left-[8%] lg:left-[10%] sm:top-[30%]",
    align: "text-left",
  },
  {
    label: "Careers.",
    start: 0.18,
    exit: 0.36,
    pos: "right-[4%] top-[48%] sm:right-[6%] md:right-[8%] lg:right-[10%] sm:top-[50%]",
    align: "text-right",
  },
  {
    label: "Colleges.",
    start: 0.32,
    exit: 0.48,
    pos: "left-[4%] top-[28%] sm:left-[6%] md:left-[8%] lg:left-[10%] sm:top-[30%]",
    align: "text-left",
  },
  {
    label: "Pathways.",
    start: 0.44,
    exit: 0.58,
    pos: "right-[4%] top-[48%] sm:right-[6%] md:right-[8%] lg:right-[10%] sm:top-[50%]",
    align: "text-right",
  },
];

const FADE_SPAN = 0.06; // how much scroll a fade-in / fade-out takes

/* ============================================================
   HELPERS
============================================================ */

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// smooth 0 → 1 between a and b
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ============================================================
   COMPONENT
============================================================ */

export default function StudentPathwaysHero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const whiteBgRef = useRef(null);
  const blendOverlayRef = useRef(null);
  const finalOverlayRef = useRef(null);

  const openingRef = useRef(null);
  const wordRefs = useRef([]);
  const barRef = useRef(null);

  const target = useRef(0); // real scroll progress
  const current = useRef(0); // smoothed progress
  const raf = useRef(0);
  const running = useRef(false);
  const lastTs = useRef(0);
  const wantTime = useRef(0);
  const readyRef = useRef(false);

  const [src, setSrc] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  /* ----------------------------------------------------------
     1. PRELOAD VIDEO INTO MEMORY
     A blob URL makes every seek local + instant (no network
     range requests), which is the biggest fix for stutter.
  ---------------------------------------------------------- */
  useEffect(() => {
    let revoked = false;
    let objectUrl = null;
    const controller = new AbortController();

    fetch(pathwayVideo, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("bad response");
        return r.blob();
      })
      .then((blob) => {
        if (revoked) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        // Fall back to normal streaming
        setSrc(pathwayVideo);
      });

    return () => {
      revoked = true;
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  /* ----------------------------------------------------------
     2. RENDER: update video + text directly on the DOM
     (no React re-render per frame)
  ---------------------------------------------------------- */
  const applyVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v || !readyRef.current) return;
    const d = v.duration;
    if (!Number.isFinite(d) || d <= 0) return;

    // stay slightly before the last frame so it never "ends"
    const t = Math.min(wantTime.current, d - 0.04);

    if (v.seeking) return;

    if (Math.abs(v.currentTime - t) > 1 / 90) {
      v.currentTime = t;
    }
  }, []);

  const render = useCallback(
    (p) => {
      const v = videoRef.current;
      if (v && Number.isFinite(v.duration)) {
        wantTime.current = p * v.duration;
        applyVideo();
      }

      // Opening header: "Students today have More choices"
      if (openingRef.current) {
        const out = smooth(0.06, 0.14, p);
        openingRef.current.style.opacity = String(1 - out);
        openingRef.current.style.transform = `translate3d(-50%, ${
          -25 * out
        }px, 0)`;
      }

      // Word blocks (Courses, Careers, Colleges, Pathways)
      WORDS.forEach((w, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const inn = smooth(w.start, w.start + FADE_SPAN, p);
        const out = smooth(w.exit, w.exit + FADE_SPAN, p);
        el.style.opacity = String(inn * (1 - out));
        el.style.transform = `translate3d(0, ${(1 - inn) * 30 - out * 20}px, 0) scale(${
          0.94 + 0.06 * inn
        })`;
      });

      // White background transition
      const whiteProgress = smooth(0.56, 0.72, p);
      if (whiteBgRef.current) {
        whiteBgRef.current.style.opacity = String(whiteProgress);
      }

      // Blend overlay (seamless top gradient feather into white)
      if (blendOverlayRef.current) {
        blendOverlayRef.current.style.opacity = String(whiteProgress);
      }

      // Video translation to bottom (full bleed width, seamless blending)
      if (videoWrapperRef.current) {
        const vidShift = smooth(0.58, 0.78, p);
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        const translateY = vidShift * (isMobile ? 8 : 22); // moves down only 8vh on mobile to eliminate bottom white gap
        const scale = isMobile ? 1.1 : 1.02;

        videoWrapperRef.current.style.transform = `translate3d(0, ${translateY}vh, 0) scale(${scale})`;
      }

      // Final Ecosystem Overlay Text: "Career Ready India is a complete career..."
      if (finalOverlayRef.current) {
        const finalInn = smooth(0.66, 0.82, p);
        finalOverlayRef.current.style.opacity = String(finalInn);
        finalOverlayRef.current.style.transform = `translate3d(-50%, ${
          (1 - finalInn) * 30
        }px, 0)`;
      }

      // Progress bar
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
        barRef.current.style.backgroundColor =
          whiteProgress > 0.5
            ? "rgba(15, 23, 42, 0.8)"
            : "rgba(103, 232, 249, 0.7)";
      }
    },
    [applyVideo],
  );

  /* ----------------------------------------------------------
     3. LOOP — only runs while there is something to animate
  ---------------------------------------------------------- */
  const reduceMotion = useRef(false);

  const tick = useCallback(
    (ts) => {
      const dt = Math.min(0.05, (ts - lastTs.current) / 1000 || 0.016);
      lastTs.current = ts;

      const diff = target.current - current.current;

      if (reduceMotion.current) {
        current.current = target.current;
      } else {
        // frame-rate independent easing
        current.current += diff * (1 - Math.exp(-dt * DAMPING));
      }

      if (Math.abs(target.current - current.current) < 0.0002) {
        current.current = target.current;
      }

      render(current.current);

      if (current.current !== target.current) {
        raf.current = requestAnimationFrame(tick);
      } else {
        running.current = false;
      }
    },
    [render],
  );

  const kick = useCallback(() => {
    if (running.current) return;
    running.current = true;
    lastTs.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  }, [tick]);

  /* ----------------------------------------------------------
     4. SCROLL → TARGET
     Geometry is cached, so scrolling never forces layout.
  ---------------------------------------------------------- */
  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let top = 0;
    let range = 1;

    const measure = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;
      top = section.getBoundingClientRect().top + window.scrollY;
      range = Math.max(1, section.offsetHeight - sticky.offsetHeight);
    };

    const onScroll = () => {
      target.current = clamp01((window.scrollY - top) / range);
      kick();
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    current.current = target.current; // no fly-in on first load
    render(current.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    // layout can shift while images/fonts load
    const ro = new ResizeObserver(onResize);
    if (sectionRef.current) ro.observe(sectionRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      running.current = false;
    };
  }, [kick, render]);

  /* ----------------------------------------------------------
     5. VIDEO EVENTS
  ---------------------------------------------------------- */
  const handleReady = () => {
    const v = videoRef.current;
    if (!v || readyRef.current) return;
    if (!Number.isFinite(v.duration) || v.duration <= 0) return;

    readyRef.current = true;

    const unlock = v.play();
    if (unlock && typeof unlock.then === "function") {
      unlock
        .then(() => v.pause())
        .catch(() => {})
        .finally(() => {
          render(current.current);
          setReady(true);
        });
    } else {
      v.pause();
      render(current.current);
      setReady(true);
    }
  };

  const handleSeeked = () => applyVideo();

  const handleError = () => {
    console.error("Failed to load pathway video:", pathwayVideo);
    setError(true);
  };

  /* ============================================================
     UI
  ============================================================ */

  const wordBase =
    "absolute z-20 will-change-[transform,opacity] opacity-0 select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]";

  const wordTitle =
    "text-[clamp(3.2rem,8.5vw,9.5rem)] font-semibold tracking-[-0.045em] leading-[0.92] text-white";

  const wordEyebrow =
    "text-sm sm:text-lg md:text-xl font-medium uppercase tracking-[0.2em] text-white/85 mb-1 sm:mb-2";

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#01050b] text-white"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      aria-label="Student pathways"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-[#01050b]"
        style={{ height: "100vh" }}
      >
        {/* WHITE BACKGROUND LAYER (revealed as you scroll) */}
        <div
          ref={whiteBgRef}
          className="pointer-events-none absolute inset-0 z-10 bg-white will-change-opacity"
          style={{ opacity: 0 }}
        />

        {/* VIDEO CONTAINER (full-bleed, moves to bottom without harsh box edges) */}
        <div
          ref={videoWrapperRef}
          className="pointer-events-none absolute inset-0 z-15 h-full w-full overflow-hidden will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) scale(1)" }}
        >
          {src && (
            <video
              ref={videoRef}
              src={src}
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              aria-hidden="true"
              onLoadedMetadata={handleReady}
              onLoadedData={handleReady}
              onCanPlay={handleReady}
              onSeeked={handleSeeked}
              onError={handleError}
              className="h-full w-full select-none object-cover object-center will-change-transform"
            />
          )}
        </div>

        {/* SEAMLESS GRADIENT BLEND OVERLAY (feathers the top of the video into white) */}
        <div
          ref={blendOverlayRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-[52vh] sm:h-[65vh] z-20 bg-gradient-to-b from-white via-white/90 via-45% to-transparent will-change-opacity"
          style={{ opacity: 0 }}
        />

        {/* OPENING HEADER */}
        <div
          ref={openingRef}
          className="absolute left-1/2 top-[7%] z-20 w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 text-center will-change-[transform,opacity] md:top-[8%]"
          style={{ transform: "translate3d(-50%,0,0)" }}
        >
          <p className="text-sm font-semibold text-white sm:text-base md:text-4xl tracking-[-0.01em]">
            Students today have
          </p>
          <h1 className="mt-2 text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-white">
            More choices
          </h1>
        </div>

        {/* WORDS (Courses, Careers, Colleges, Pathways) */}
        {WORDS.map((w, i) => (
          <div
            key={w.label}
            ref={(el) => (wordRefs.current[i] = el)}
            className={`${wordBase} ${w.pos} ${w.align}`}
          >
            <p className={wordEyebrow}>More</p>
            <h2 className={wordTitle}>{w.label}</h2>
          </div>
        ))}

        {/* FINAL OVERLAY ON WHITE BACKGROUND */}
        <div
          ref={finalOverlayRef}
          className="pointer-events-none absolute left-1/2 top-[5%] sm:top-[8%] md:top-[10%] z-25 w-full max-w-9xl px-4 xs:px-6 sm:px-10 text-center will-change-[transform,opacity]"
          style={{
            transform: "translate3d(-50%, 30px, 0)",
            opacity: 0,
          }}
        >
          <div className="mx-auto max-w-9xl">
            <p className="mb-2 sm:mb-4 text-xs xs:text-sm sm:text-base md:text-2xl mt-5 font-light tracking-[-0.01em] text-gray-800">
              What is Career Ready India
            </p>
            <h2
              className="
                text-[40px]
                sm:text-[40px]
                md:text-[50px]
                lg:text-[60px]
                xl:text-[70px]
          
                font-light
                leading-[1.1]
tracking-[-0.035em]
text-black
              "
            >
              Career Ready India is a{" "}
              <span className="font-bold">complete</span> career and college
              readiness ecosystem for{" "}
              <span className="font-bold">every student</span>, built into the
              school and provided at <span className="font-bold">no cost</span>.
            </h2>
          </div>
        </div>

        {/* PROGRESS BAR */}

        {/* LOADING */}
        <div
          className={`absolute inset-0 z-50 flex items-center justify-center bg-[#01050b] transition-opacity duration-700 ${
            ready || error ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-center">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border border-white/10 border-t-cyan-300" />
            <p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-white/30">
              Loading
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#01050b] px-6 text-center">
            <div>
              <p className="text-sm text-white/70">Unable to load the video.</p>
              <p className="mt-2 text-xs text-white/30">
                Please check the MP4 file.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
