import React, { useCallback, useEffect, useRef } from "react";
import careervedio from "../../../assets/New/careervedio.mp4";

export default function VedioFiller1() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const rafRef = useRef(null);

  /* =========================================================
     HELPERS
  ========================================================= */

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const ease = (value) => value * value * (3 - 2 * value);

  /* =========================================================
     RENDER FRAME — direct DOM writes, zero React re-renders
  ========================================================= */

  const renderFrame = useCallback((progress) => {
    const range = (start, end) => clamp((progress - start) / (end - start));

    // Video movement
    const videoProgress = ease(range(0, 1));
    const videoScale = 1.05 - videoProgress * 0.025;
    const videoY = videoProgress * -2.5;

    if (videoRef.current) {
      videoRef.current.style.transform = `translate3d(0, ${videoY}vh, 0) scale(${videoScale})`;
    }

    // Overlay
    const overlayEnter = ease(range(0, 0.18));
    const overlayExit = ease(range(0.72, 0.98));
    const overlayOpacity = overlayEnter * (1 - overlayExit);

    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(overlayOpacity);
    }

    // Text
    const textEnter = ease(range(0.02, 0.2));
    const textEnterY = (1 - textEnter) * 35;
    const textExit = ease(range(0.7, 0.95));
    const textExitY = textExit * -35;
    const textY = textEnterY + textExitY;
    const textOpacity = textEnter * (1 - textExit);

    if (textRef.current) {
      textRef.current.style.transform = `translate3d(0, ${textY}px, 0)`;
      textRef.current.style.opacity = String(textOpacity);
    }

    // Eyebrow
    const eyebrowEnter = ease(range(0.02, 0.18));
    const eyebrowY = (1 - eyebrowEnter) * 16;
    if (eyebrowRef.current) {
      eyebrowRef.current.style.transform = `translate3d(0, ${eyebrowY}px, 0)`;
    }

    // Heading
    const headingEnter = ease(range(0.04, 0.2));
    const headingY = (1 - headingEnter) * 24;
    if (headingRef.current) {
      headingRef.current.style.transform = `translate3d(0, ${headingY}px, 0)`;
    }

    // Description
    const descriptionEnter = ease(range(0.06, 0.22));
    const descriptionY = (1 - descriptionEnter) * 20;
    if (descriptionRef.current) {
      descriptionRef.current.style.transform = `translate3d(0, ${descriptionY}px, 0)`;
    }
  }, []);

  /* =========================================================
     SCROLL LISTENER — passive, RAF-throttled
  ========================================================= */

  useEffect(() => {
    const updateScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollDistance = sectionHeight - viewportHeight;

      if (scrollDistance <= 0) {
        renderFrame(0);
        return;
      }

      const currentScroll = -rect.top;
      const value = Math.min(1, Math.max(0, currentScroll / scrollDistance));
      renderFrame(value);
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        updateScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [renderFrame]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[150vh]
        w-full
        bg-black
      "
    >
      {/* =====================================================
          STICKY SCREEN
      ====================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
          bg-black
        "
      >
        {/* ===================================================
            BACKGROUND VIDEO
        ==================================================== */}

        <div
          className="
            absolute
            -top-[5vh]
            left-0
            z-0
            h-[115vh]
            w-full
            overflow-hidden
          "
        >
          <video
            ref={videoRef}
            className="
              h-full
              w-full
              object-cover
              object-center
              will-change-transform
            "
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{
              transform: "translate3d(0, 0, 0) scale(1.05)",
              transformOrigin: "center center",
            }}
          >
            <source src={careervedio} type="video/mp4" />
          </video>
        </div>

        {/* ===================================================
            BASE CINEMATIC DARKENING
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-black/30
          "
        />

        {/* ===================================================
            RISING CINEMATIC GRADIENT
        ==================================================== */}

        <div
          ref={overlayRef}
          className="
            pointer-events-none
            absolute
            inset-0
            z-[11]
          "
          style={{
            opacity: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.05) 0%,
                rgba(0,0,0,0.14) 18%,
                rgba(0,0,0,0.28) 40%,
                rgba(0,0,0,0.48) 68%,
                rgba(0,0,0,0.68) 100%
              )
            `,
          }}
        />

        {/* ===================================================
            CENTER READABILITY
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[12]
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.35)_100%)]
          "
        />

        {/* ===================================================
            BOTTOM CINEMATIC FADE
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[13]
            h-48
            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
          "
        />

        {/* ===================================================
            TEXT OVERLAY
        ==================================================== */}

        <div
          ref={textRef}
          className="
            absolute
            inset-0
            z-20

            flex
            items-center
            justify-center

            px-5
            sm:px-8
            md:px-12

            will-change-[transform,opacity]
          "
          style={{
            transform: "translate3d(0, 35px, 0)",
            opacity: 0,
          }}
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              text-center
            "
          >
            {/* =================================================
                EYEBROW
            ================================================== */}

            <p
              ref={eyebrowRef}
              className="
                mb-8
                text-sm
                font-medium
                text-white/95
                md:text-xl
              "
              style={{
                transform: "translate3d(0, 16px, 0)",
              }}
            >
              Built into everyday learning
            </p>

            {/* =================================================
                MAIN HEADING
            ================================================== */}

            <h1
              ref={headingRef}
              className="
                mx-auto
                max-w-9xl
                px-4
                sm:px-6
                lg:px-8
                text-[clamp(3rem,8vw,8rem)]
                font-semibold
                leading-[0.92]
                tracking-[-0.035em]
                text-white
              "
              style={{
                transform: "translate3d(0, 24px, 0)",
              }}
            >
              Information changes decisions.
              <br />
              {/* <span className="text-white/90">built into school.</span> */}
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              ref={descriptionRef}
              className="
                mx-auto
                mt-12
                max-w-2xl
                leading-7
                tracking-[-0.01em]
                text-white/95
                font-normal
                md:text-xl
                md:leading-8
              "
              style={{
                transform: "translate3d(0, 20px, 0)",
              }}
            >
              College and career readiness becomes part of the school experience
              not a separate event. Students get continuous guidance,
              exploration, and preparation as they move from classroom to
              future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
