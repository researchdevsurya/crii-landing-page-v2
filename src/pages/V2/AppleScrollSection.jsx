import React, { useCallback, useEffect, useRef } from "react";
import bg2 from "../../assets/New/bg2.png";
import bg2Mobile from "../../assets/New/bg2-mobile.webp";

export default function AppleScrollSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);

  /* =========================================================
     HELPERS
  ========================================================= */

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const smooth = (value) => value * value * (3 - 2 * value);

  /* =========================================================
     RENDER FRAME — direct DOM writes, zero React re-renders
  ========================================================= */

  const renderFrame = useCallback((progress) => {
    const range = (start, end) => clamp((progress - start) / (end - start));

    /* FLUID TEXT MOTION */
    const textRise = smooth(range(0.04, 0.44));
    const textExit = smooth(range(0.56, 0.94));
    const textY = (1 - textRise) * 20 - textExit * 20;
    const textOpacity = textRise * (1 - textExit);

    if (textRef.current) {
      textRef.current.style.transform = `translate3d(0, ${textY}vh, 0)`;
      textRef.current.style.opacity = String(textOpacity);
    }

    /* OVERLAY */
    const overlayRise = smooth(range(0.02, 0.44));
    const overlayExit = smooth(range(0.58, 0.96));
    const overlayY = (1 - overlayRise) * 14 - overlayExit * 10;
    const overlayOpacity = overlayRise * (1 - overlayExit) * 0.74;

    if (overlayRef.current) {
      overlayRef.current.style.transform = `translate3d(0, ${overlayY}vh, 0)`;
      overlayRef.current.style.opacity = String(overlayOpacity);
    }

    /* IMAGE PARALLAX */
    const imageY = progress * 8;
    const imageScale = 1.035 - progress * 0.025;

    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(0, -${imageY}vh, 0) scale(${imageScale})`;
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
      const maxScroll = sectionHeight - viewportHeight;

      const scrolled = -rect.top;
      const value =
        maxScroll > 0 ? Math.min(1, Math.max(0, scrolled / maxScroll)) : 0;
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
        h-[145vh]
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
            IMAGE
        ==================================================== */}

        <div
          ref={imageRef}
          className="
            absolute
            left-0
            -top-[6vh]
            z-0

            h-[120vh]
            w-full

            will-change-transform
          "
          style={{
            transform: "translate3d(0, 0, 0) scale(1.035)",
            transformOrigin: "center center",
          }}
        >
          <picture>
            {/* Mobile */}
            <source media="(max-width: 767px)" srcSet={bg2Mobile} />

            {/* Desktop + Tablet */}
            <img
              src={bg2}
              alt="Career Readiness"
              draggable="false"
              className="
                block
                h-full
                w-full

                select-none

                object-cover
                object-center
              "
            />
          </picture>
        </div>

        {/* ===================================================
            CINEMATIC ULTRA-SOFT GRADIENT (ZERO HARD EDGES)
        ==================================================== */}

        <div
          ref={overlayRef}
          className="
            pointer-events-none
            absolute
            inset-x-0
            -bottom-[25vh]
            h-[150vh]
            z-10

            will-change-[transform,opacity]
          "
          style={{
            transform: "translate3d(0, 14vh, 0)",
            opacity: 0,
            background: `
              linear-gradient(
                to top,
                rgba(0, 0, 0, 0.82) 0%,
                rgba(0, 0, 0, 0.70) 22%,
                rgba(0, 0, 0, 0.52) 45%,
                rgba(0, 0, 0, 0.30) 68%,
                rgba(0, 0, 0, 0.12) 84%,
                rgba(0, 0, 0, 0.02) 95%,
                transparent 100%
              )
            `,
          }}
        />

        {/* ===================================================
            TEXT
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

            will-change-[transform,opacity]
          "
          style={{
            transform: "translate3d(0, 20vh, 0)",
            opacity: 0,
          }}
        >
          <div
            className="
              w-full
              max-w-9xl

              px-6
              text-center

              md:px-12
            "
          >
            <p
              className="
                mb-8
                text-sm
                font-medium
                tracking-[-0.01em]
                text-white/90
                md:text-xl
              "
            >
              One Decision Leads On
            </p>

            <h1
              className="
                mx-auto
                max-w-7xl

                text-[clamp(3rem,6vw,8rem)]

                font-semibold

                leading-[0.94]
                tracking-[-0.045em]

                text-white
              "
            >
              A career is not a choice. It is a series of choices.
            </h1>

            <p
              className="
mx-auto
mt-12
max-w-2xl
leading-7
tracking-[-0.01em]
text-white/75
font-semibold
md:text-xl
md:leading-8
              "
            >
              Subjects, streams, courses, colleges and specialisations all shape
              where a student can go next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
