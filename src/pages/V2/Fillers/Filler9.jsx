import React, { useCallback, useEffect, useRef } from "react";
import filler9Bg from "../../../assets/New/bg7.png";
import filler9MobileBg from "../../../assets/New/bg7-mobile.webp";

export default function Filler9() {
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

  const ease = (value) => value * value * (3 - 2 * value);

  /* =========================================================
     RENDER FRAME — direct DOM writes, zero React re-renders
  ========================================================= */

  const renderFrame = useCallback((progress) => {
    const range = (start, end) => clamp((progress - start) / (end - start));

    // Image movement
    const imageProgress = ease(range(0, 1));
    const imageScale = 1.06 - imageProgress * 0.03;
    const imageY = imageProgress * -3;

    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(0, ${imageY}vh, 0) scale(${imageScale})`;
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
          STICKY VIEWPORT
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
            BACKGROUND IMAGE
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
          <picture>
            {/* Mobile */}
            <source media="(max-width: 767px)" srcSet={filler9MobileBg} />

            {/* Desktop + Tablet */}
            <img
              ref={imageRef}
              src={filler9Bg}
              alt=""
              draggable="false"
              className="
                h-full
                w-full
                select-none
                object-cover
                object-center
                will-change-transform
              "
              style={{
                transform: "translate3d(0, 0, 0) scale(1.06)",
                transformOrigin: "center center",
              }}
            />
          </picture>

          {/* Mobile Contrast Overlay for Text Visibility */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              bg-gradient-to-b
              from-black/60
              via-black/40
              to-black/65
              md:hidden
            "
          />
        </div>

        {/* ===================================================
            CINEMATIC GRADIENT
        ==================================================== */}

        <div
          ref={overlayRef}
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
          "
          style={{
            opacity: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.12) 0%,
                rgba(0,0,0,0.25) 25%,
                rgba(0,0,0,0.42) 50%,
                rgba(0,0,0,0.30) 75%,
                rgba(0,0,0,0.18) 100%
              )
            `,
          }}
        />

        {/* ===================================================
            SUBTLE CONTRAST LAYER
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[11]
          "
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.06) 0%,
                rgba(0,0,0,0.02) 50%,
                rgba(0,0,0,0.08) 100%
              )
            `,
          }}
        />

        {/* ===================================================
            CONTENT
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
              className="
                mb-8
                text-sm
                font-medium
                text-white/95
                md:text-xl
              "
            >
              All in One
            </p>

            {/* =================================================
                MAIN HEADING
            ================================================== */}

            <h1
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
            >
              Everything your school needs to make students career ready.
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
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
            >
              Everything schools need to make students career ready. Clear
              guidance, meaningful resources, and practical support so every
              student can move forward with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
