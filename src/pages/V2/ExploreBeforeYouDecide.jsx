import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExploreBeforeYouDecide() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const items = [
    {
      id: "01",
      text: (
        <>
          per-student
          <br />
          assessment fee.
        </>
      ),
      textGradient: "from-[#0047ff] to-[#155dff]",
      noGradient: "from-[#b4dcff] via-[#79b6ff] to-[#4a91ff]",
      waveColor1: "#79b6ff",
      waveColor2: "#4a91ff",
      waveColor3: "#a669fa",
    },
    {
      id: "02",
      text: (
        <>
          counselling fee
          <br />
          for the school.
        </>
      ),
      textGradient: "from-[#6731db] to-[#9c4be6]",
      noGradient: "from-[#c997ff] via-[#a669fa] to-[#8346e8]",
      waveColor1: "#c997ff",
      waveColor2: "#a669fa",
      waveColor3: "#ff8298",
    },
    {
      id: "03",
      text: (
        <>
          platform
          <br />
          subscription.
        </>
      ),
      textGradient: "from-[#ff5067] to-[#ff775c]",
      noGradient: "from-[#ff9db7] via-[#ff8298] to-[#ff796b]",
      waveColor1: "#ff9db7",
      waveColor2: "#ff8298",
      waveColor3: "#ffba4c",
    },
    {
      id: "04",
      text: (
        <>
          hidden
          <br />
          charges.
        </>
      ),
      textGradient: "from-[#db7600] to-[#f79500]",
      noGradient: "from-[#ffd18a] via-[#ffba4c] to-[#ffa000]",
      waveColor1: "#ffd18a",
      waveColor2: "#ffba4c",
      waveColor3: "#ffa000",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white font-sans text-neutral-900"
      style={{
        minHeight: "360vh",
        fontFamily:
          '"Plus Jakarta Sans", "Google Sans Flex", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="sticky top-0 flex h-screen min-h-[620px] w-full flex-col justify-center items-center overflow-hidden bg-white">
        {/* =========================
            SOFT BACKGROUND WAVES
        ========================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -left-[20%]
              bottom-[3%]
              h-[260px]
              w-[95%]
              rounded-[50%]
              blur-[42px]
            "
            style={{
              background:
                "linear-gradient(90deg, rgba(186,222,255,0.72) 0%, rgba(225,237,255,0.42) 45%, rgba(255,255,255,0) 100%)",
              transform: "rotate(-3deg)",
            }}
          />

          <div
            className="
              absolute
              left-[0%]
              bottom-[0%]
              h-[230px]
              w-[110%]
              rounded-[50%]
              blur-[42px]
            "
            style={{
              background:
                "linear-gradient(90deg, rgba(246,222,255,0.58) 0%, rgba(255,224,242,0.55) 47%, rgba(255,255,255,0) 100%)",
              transform: "rotate(2deg)",
            }}
          />

          <div
            className="
              absolute
              left-[15%]
              -bottom-[6%]
              h-[220px]
              w-[110%]
              rounded-[50%]
              blur-[38px]
            "
            style={{
              background:
                "linear-gradient(90deg, rgba(255,234,206,0.55) 0%, rgba(255,239,188,0.66) 55%, rgba(255,255,255,0) 100%)",
              transform: "rotate(-1deg)",
            }}
          />
        </div>

        {/* =========================
            MAIN STAGE (FULLY CENTERED)
        ========================== */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-4 py-3 sm:px-6 md:px-8">
          {/* =========================
              CENTERED HEADING
          ========================== */}
          <div className="mx-auto max-w-[1100px] text-center mb-3 sm:mb-5">
            <h1
              className="
                m-0
                font-extrabold
                tracking-[-0.05em]
                text-[clamp(2.4rem,5.6vw,5.5rem)]
                text-center
                flex
                flex-col
                items-center
              "
            >
              <span
                className="
                  inline-block
                  pb-3
                  pt-1
                  px-2
                  leading-[1.08]
                  bg-gradient-to-r
                  from-[#0048FF]
                  via-[#4338CA]
                  to-[#7C3AED]
                  bg-clip-text
                  text-transparent
                "
              >
                Everything
              </span>

              <span
                className="
                  inline-block
                  pb-3
                  pt-1
                  px-2
                  leading-[1.08]
                  bg-gradient-to-r
                  from-[#0052FF]
                  via-[#7C3AED]
                  to-[#EA580C]
                  bg-clip-text
                  text-transparent
                "
              >
                a school needs.
              </span>

              <span
                className="
                  inline-block
                  pb-3
                  pt-1
                  px-2
                  leading-[1.08]
                  bg-gradient-to-r
                  from-[#6D28D9]
                  via-[#C026D3]
                  to-[#EA580C]
                  bg-clip-text
                  text-transparent
                "
              >
                Without adding
              </span>

              <span
                className="
                  inline-block
                  pb-3
                  pt-1
                  px-2
                  leading-[1.08]
                  bg-gradient-to-r
                  from-[#7C3AED]
                  via-[#E11D48]
                  to-[#F59E0B]
                  bg-clip-text
                  text-transparent
                "
              >
                another cost.
              </span>
            </h1>
          </div>

          {/* =========================
              CENTERED NO LIST (50% OVERLAP ON SCROLL)
          ========================== */}
          <div
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[760px]
              sm:max-w-[900px]
              lg:max-w-[1020px]
              flex-col
              items-center
            "
          >
            {items.map((item, index) => (
              <NoItemRow
                key={item.id}
                item={item}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM PROGRESS BAR */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-px bg-neutral-200">
          <motion.div
            style={{ scaleX: progress, transformOrigin: "left center" }}
            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500"
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   INDIVIDUAL NO ROW - Scroll Reveal & 50% Overlap
   ========================================================================== */

function NoItemRow({ item, index, scrollYProgress }) {
  // Staggered scroll ranges: all 4 rows (including first NO) come in after scroll
  const step = 0.2;
  const start = 0.04 + index * step;
  const revealEnd = start + 0.14;

  // Once revealed, opacity remains 1 all the way to end (never hides!)
  const opacity = useTransform(
    scrollYProgress,
    [start, revealEnd, 1],
    [0, 1, 1],
  );

  // Smooth slide-up on entry
  const y = useTransform(scrollYProgress, [start, revealEnd], [70, 0]);

  // Subtle scale-up for premium feel
  const scale = useTransform(scrollYProgress, [start, revealEnd], [0.93, 1]);

  // Waved entrance draw
  const waveScale = useTransform(scrollYProgress, [start, revealEnd], [0.3, 1]);

  // Organic wave curves that dip across the row
  const wavePaths = [
    "M0,35 Q300,10 600,28 T1200,20 L1200,160 L0,160 Z",
    "M0,25 Q320,40 620,18 T1200,30 L1200,160 L0,160 Z",
    "M0,30 Q280,12 580,32 T1200,22 L1200,160 L0,160 Z",
    "M0,22 Q310,38 610,18 T1200,28 L1200,160 L0,160 Z",
  ];

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        zIndex: (index + 1) * 10,
      }}
      className={`
        group
        relative
        w-full
        grid
        grid-cols-[130px_1fr]
        items-center
        min-h-[100px]
        sm:grid-cols-[190px_1fr]
        sm:min-h-[120px]
        md:grid-cols-[270px_1fr]
        md:min-h-[140px]
        lg:grid-cols-[360px_1fr]
        lg:min-h-[155px]
        ${index > 0 ? "-mt-[48px] sm:-mt-[58px] md:-mt-[68px] lg:-mt-[76px]" : ""}
      `}
    >
      {/* Background wave with white mask for index > 0 to cleanly cover the bottom 50% of the previous row */}
      <motion.div
        style={{
          scaleX: waveScale,
          transformOrigin: "left center",
        }}
        className="pointer-events-none absolute inset-x-[-12%] -top-3 -bottom-5 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`zg-wave-${item.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor={item.waveColor1}
                stopOpacity="0.32"
              />
              <stop
                offset="40%"
                stopColor={item.waveColor2}
                stopOpacity="0.18"
              />
              <stop
                offset="75%"
                stopColor={item.waveColor3}
                stopOpacity="0.08"
              />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Solid white backdrop so this row cleanly masks the bottom 50% of the preceding NO */}
          {index > 0 && (
            <path d={wavePaths[index % wavePaths.length]} fill="#ffffff" />
          )}

          {/* Soft color wave tint */}
          <path
            d={wavePaths[index % wavePaths.length]}
            fill={`url(#zg-wave-${item.id})`}
          />
        </svg>
      </motion.div>

      {/* BIG NO - Aligns to center divider */}
      <div
        className={`
          relative
          z-10
          flex
          justify-end
          pr-3
          sm:pr-5
          md:pr-7
          lg:pr-8
          bg-gradient-to-b
          ${item.noGradient}
          bg-clip-text
          text-transparent
          font-black
          leading-[0.70]
          tracking-[-0.095em]
          text-[6.2rem]
          sm:text-[8.5rem]
          md:text-[10.5rem]
          lg:text-[12.2rem]
          pb-2
          pt-1
        `}
      >
        No
      </div>

      {/* DESCRIPTION - Aligns to center divider */}
      <div
        className={`
          relative
          z-10
          bg-gradient-to-r
          ${item.textGradient}
          bg-clip-text
          text-transparent
          font-extrabold
          leading-[1.04]
          tracking-[-0.04em]
          text-[1.35rem]
          sm:text-[1.85rem]
          md:text-[2.4rem]
          lg:text-[2.75rem]
          pb-2
          pt-1
        `}
      >
        {item.text}
      </div>
    </motion.div>
  );
}
