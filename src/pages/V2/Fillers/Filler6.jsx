import React, { useCallback, useEffect, useRef } from "react";
import bg99 from "../../../assets/New/bg99.png";
import bg99Mobile from "../../../assets/New/bg99-mobile.webp";

export default function Filler6() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const ease = (value) => value * value * (3 - 2 * value);

  /* ---------------------------------------------------------
     RENDER FRAME — direct DOM writes, zero React re-renders
  --------------------------------------------------------- */

  const renderFrame = useCallback((progress) => {
    const range = (start, end) => clamp((progress - start) / (end - start));

    // Text animation
    const textIn = ease(range(0.02, 0.2));
    const textInY = (1 - textIn) * 35;
    const textOut = ease(range(0.7, 0.95));
    const textOutY = textOut * -35;
    const textY = textInY + textOutY;
    const textOpacity = textIn * (1 - textOut);

    if (textRef.current) {
      textRef.current.style.transform = `translate3d(0, ${textY}px, 0)`;
      textRef.current.style.opacity = String(textOpacity);
    }

    // Dynamic background gradient
    if (bgRef.current) {
      bgRef.current.style.background = `
        radial-gradient(
          circle at ${25 + progress * 45}% ${25 + progress * 20}%,
          rgba(219, 234, 254, 0.75) 0%,
          rgba(219, 234, 254, 0.35) 22%,
          transparent 48%
        ),
        radial-gradient(
          circle at ${80 - progress * 35}% ${70 - progress * 30}%,
          rgba(224, 231, 255, 0.7) 0%,
          rgba(224, 231, 255, 0.3) 25%,
          transparent 52%
        ),
        linear-gradient(
          ${120 + progress * 70}deg,
          #ffffff 0%,
          #f8fbff 35%,
          #f5f7ff 65%,
          #ffffff 100%
        )
      `;
    }
  }, []);

  /* ---------------------------------------------------------
     SCROLL LISTENER — passive, RAF-throttled
  --------------------------------------------------------- */

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

      const current = -rect.top;
      const value = Math.min(1, Math.max(0, current / scrollDistance));
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
        "
      >
        {/* ===================================================
            BACKGROUND IMAGE
        ==================================================== */}

        <div className="absolute inset-0 z-0">
          <picture>
            {/* Mobile */}
            <source media="(max-width: 767px)" srcSet={bg99Mobile} />

            {/* Desktop + Tablet */}
            <img
              src={bg99}
              alt=""
              draggable="false"
              className="h-full w-full select-none object-cover object-center"
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
              from-white/70
              via-white/50
              to-white/70
              md:hidden
            "
          />
        </div>

        {/* ===================================================
            CENTER CONTENT
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
            {/* EYEBROW */}

            <p
              className="
                mb-8
                text-sm
                font-medium
                tracking-wide
                text-[#4b5563]
                md:text-xl
              "
            >
              Build over Time
            </p>

            {/* MAIN HEADING */}

            <h1
              className="
                mx-auto
                max-w-[1500px]
                px-4
                sm:px-6
                lg:px-8
                text-[clamp(3rem,8vw,8rem)]
                font-semibold
                leading-[0.92]
                tracking-[-0.025em]
                text-[#1E1E1E]
              "
            >
              Career Readiness is not a session.
              <br />
              <span>It is a process.</span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-10
                max-w-2xl
                px-4
                text-base
                font-normal
                leading-7
                tracking-[-0.01em]
                text-gray-700
                md:mt-12
                md:text-xl
                md:leading-8
              "
            >
              Understanding, exploration, guidance and planning should develop
              as the student moves through school.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
