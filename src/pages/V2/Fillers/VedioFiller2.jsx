import React, { useEffect, useRef, useState } from "react";
import videoBg from "../../../assets/New/doctorvedio.mp4";

export default function VedioFiller2() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollDistance = sectionHeight - viewportHeight;

      if (scrollDistance <= 0) {
        setProgress(0);
        ticking = false;
        return;
      }

      const currentScroll = -rect.top;

      const value = Math.min(1, Math.max(0, currentScroll / scrollDistance));

      setProgress(value);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  /* =========================================================
     HELPERS
  ========================================================= */

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const range = (start, end) => clamp((progress - start) / (end - start));

  const ease = (value) => value * value * (3 - 2 * value);

  /* =========================================================
     FLUID CONTINUOUS MOTION (FLOWLESS SINGLE-SCROLL)
  ========================================================= */

  const textRise = ease(range(0.04, 0.44));
  const textExit = ease(range(0.56, 0.94));

  // Continuous vertical glide: +20vh (bottom) -> 0vh (center) -> -20vh (top)
  const textY = (1 - textRise) * 20 - textExit * 20;
  const textOpacity = textRise * (1 - textExit);

  /*
    Overlay rises smoothly behind the text with zero hard lines
  */
  const overlayRise = ease(range(0.02, 0.44));
  const overlayExit = ease(range(0.58, 0.96));

  const overlayY = (1 - overlayRise) * 14 - overlayExit * 10;
  const overlayOpacity = overlayRise * (1 - overlayExit) * 0.74;

  /*
    Video subtle parallax
  */
  const videoY = progress * 8;
  const videoScale = 1.035 - progress * 0.025;

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
            VIDEO BACKGROUND
        ==================================================== */}

        <div
          className="
            absolute
            -top-[6vh]
            left-0
            z-0
            h-[120vh]
            w-full
            overflow-hidden
            will-change-transform
          "
        >
          <video
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
            aria-hidden="true"
            className="
              h-full
              w-full
              object-cover
              object-center
            "
            style={{
              transform: `
                translate3d(0, -${videoY}vh, 0)
                scale(${videoScale})
              `,
              transformOrigin: "center center",
            }}
          >
            <source src={videoBg} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* ===================================================
            CINEMATIC ULTRA-SOFT GRADIENT (ZERO HARD EDGES)
        ==================================================== */}

        <div
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
            transform: `
              translate3d(
                0,
                ${overlayY}vh,
                0
              )
            `,
            opacity: overlayOpacity,
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
            TEXT OVERLAY
        ==================================================== */}

        <div
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
            transform: `
              translate3d(0, ${textY}vh, 0)
            `,
            opacity: textOpacity,
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
                HEADING
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
              Next Section
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
