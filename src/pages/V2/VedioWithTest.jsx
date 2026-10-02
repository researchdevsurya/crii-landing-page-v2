import React, { useCallback, useEffect, useMemo, useRef } from "react";

export default function CareerReadinessExperience({ bgVideo }) {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  // Direct DOM refs — avoids React re-renders on every scroll frame
  const sceneRefs = useRef([]);
  const videoRef = useRef(null);

  /*
   * ============================================================
   * STORY CONTENT (2 SCENES)
   * ============================================================
   */

  const scenes = useMemo(
    () => [
      {
        eyebrow: "Access for All",
        title: (
          <>
            Built for every student.
            <br />
            Available to every participating school.
          </>
        ),
        description:
          "A school-wide career readiness programme designed to reach students across grades, interests and education pathways.",
      },
      {
        eyebrow: "The complete program",
        title: <>Comprehensive by design.</>,
        description:
          "Assessment, counselling, career education, resources and decision tools, brought together without adding another cost to the school.",
      },
    ],
    [],
  );

  /*
   * ============================================================
   * 2-SCENE TIMED TRANSITIONS (computed per frame, no React state)
   * ============================================================
   */

  const getSceneState = (index, progress) => {
    let opacity = 0;
    let translateY = 0;
    let blur = 0;

    if (index === 0) {
      if (progress <= 0.4) {
        opacity = 1;
        translateY = 0;
        blur = 0;
      } else if (progress < 0.52) {
        const t = (progress - 0.4) / 0.12;
        opacity = 1 - t;
        translateY = -t * 30;
        blur = t * 4;
      } else {
        opacity = 0;
        translateY = -30;
        blur = 4;
      }
    } else if (index === 1) {
      if (progress <= 0.48) {
        opacity = 0;
        translateY = 30;
        blur = 4;
      } else if (progress < 0.6) {
        const t = (progress - 0.48) / 0.12;
        opacity = t;
        translateY = (1 - t) * 30;
        blur = (1 - t) * 4;
      } else {
        opacity = 1;
        translateY = 0;
        blur = 0;
      }
    }

    return { opacity, translateY, scale: 1, blur };
  };

  /*
   * ============================================================
   * RENDER FRAME — direct DOM writes, zero React re-renders
   * ============================================================
   */

  const renderFrame = useCallback((progress) => {
    // Video movement
    const videoScale = 1.02 + progress * 0.04;
    const videoY = progress * -4;

    if (videoRef.current) {
      videoRef.current.style.transform = `translate3d(0, ${videoY}px, 0) scale(${videoScale})`;
    }

    // Scene text transitions
    for (let i = 0; i < 2; i++) {
      const el = sceneRefs.current[i];
      if (!el) continue;

      const state = getSceneState(i, progress);
      el.style.transform = `translateY(${state.translateY}px) scale(${state.scale})`;
      el.style.opacity = String(state.opacity);
      el.style.filter = state.blur > 0.05 ? `blur(${state.blur}px)` : "none";
    }
  }, []);

  /*
   * ============================================================
   * SCROLL PROGRESS — passive listener, RAF-throttled
   * ============================================================
   */

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        renderFrame(0);
        return;
      }

      const scrolled = -rect.top;
      const normalized = scrolled / scrollableDistance;
      const clamped = Math.min(Math.max(normalized, 0), 1);

      renderFrame(clamped);
    };

    const handleScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [renderFrame]);

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[200vh]
        w-full
        bg-black
      "
    >
      {/* ======================================================
          STICKY FULLSCREEN AREA
      ====================================================== */}
      <div
        className="
          sticky
          top-0
          h-screen
          min-h-[520px]
          w-full
          overflow-hidden
          bg-black
        "
      >
        {/* ====================================================
            BACKGROUND VIDEO
        ==================================================== */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              will-change-transform
            "
            style={{
              transform: "translate3d(0, 0, 0) scale(1.02)",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>

        {/* ====================================================
            MAIN DARK OVERLAYS
        ==================================================== */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Top / Bottom Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Side Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

        {/* Cinematic Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ====================================================
            CENTERED STORY CONTAINER
        ==================================================== */}
        <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-5 sm:px-8 md:px-12">
          {scenes.map((scene, index) => (
            <div
              key={index}
              ref={(el) => (sceneRefs.current[index] = el)}
              className="
                absolute
                inset-x-0
                mx-auto
                w-full
                max-w-[1500px]
                px-4
                sm:px-8
                text-center
              "
              style={{
                willChange: "transform, opacity, filter",
                pointerEvents: "none",
                opacity: index === 0 ? 1 : 0,
              }}
            >
              {/* Eyebrow */}
              <div className="mb-6 sm:mb-8 flex items-center justify-center gap-3">
                <span className="text-sm font-medium tracking-wide text-white/95 md:text-xl">
                  {scene.eyebrow}
                </span>
              </div>

              {/* Title */}
              <h2 className="mx-auto max-w-7xl text-[clamp(2.85rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">
                {scene.title}
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 sm:mt-8 md:mt-10 max-w-3xl text-sm sm:text-base md:text-xl font-normal leading-relaxed text-white/90">
                {scene.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Fade Gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </section>
  );
}
