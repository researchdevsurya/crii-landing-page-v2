import React, { useEffect, useRef, useState } from "react";
import filler10Bg from "../../../assets/New/bg4.png";

export default function Filler10() {
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
     IMAGE MOVEMENT
  ========================================================= */

  const imageProgress = ease(range(0, 1));

  const imageScale = 1.06 - imageProgress * 0.03;

  const imageY = imageProgress * -3;

  /* =========================================================
     CINEMATIC OVERLAY
  ========================================================= */

  const overlayEnter = ease(range(0, 0.18));
  const overlayExit = ease(range(0.72, 0.98));

  const overlayOpacity = overlayEnter * (1 - overlayExit);

  /* =========================================================
     TEXT ENTER
  ========================================================= */

  const textEnter = ease(range(0.02, 0.2));

  const textEnterY = (1 - textEnter) * 35;

  /* =========================================================
     TEXT EXIT
  ========================================================= */

  const textExit = ease(range(0.7, 0.95));

  const textExitY = textExit * -35;

  const textY = textEnterY + textExitY;

  const textOpacity = textEnter * (1 - textExit);

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
          <img
            src={filler10Bg}
            alt=""
            draggable="false"
            className="
              h-full
              w-full
              select-none
              object-cover
              object-center
            "
            style={{
              transform: `
                translate3d(0, ${imageY}vh, 0)
                scale(${imageScale})
              `,
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* ===================================================
            CINEMATIC GRADIENT
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
          "
          style={{
            opacity: overlayOpacity,

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
            transform: `
              translate3d(0, ${textY}px, 0)
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
                MAIN HEADING
            ================================================== */}

            <h1
              className="
                mx-auto
                max-w-9xl
                px-4
                sm:px-6
                lg:px-8
                text-[clamp(3rem,7vw,7rem)]
                font-semibold
                leading-[0.92]
                tracking-[-0.035em]
                text-white
              "
            >
              Build for every student.
              <br />
              Available for every participating school at no cost.
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
              Designed to give every student access to meaningful career
              guidance, with participating schools able to bring the full
              experience to their students at no cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
