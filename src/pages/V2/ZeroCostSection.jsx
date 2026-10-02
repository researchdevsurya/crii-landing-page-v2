import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ZeroCostSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
      className="relative w-full bg-white font-sans text-neutral-900 min-h-[290vh] sm:min-h-[360vh]"
      style={{
        fontFamily:
          '"Plus Jakarta Sans", "Google Sans Flex", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="sticky top-0 flex h-screen h-[100dvh] w-full flex-col justify-center items-center overflow-hidden bg-white px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-4 md:px-8">
        {/* =========================
            MAIN STAGE (FULLY CENTERED & BALANCED)
        ========================== */}
        <div className="relative z-30 mx-auto my-auto flex w-full max-w-[1800px] flex-col items-center justify-center">
          {/* =========================
              CENTERED HEADING (ANIMATED)
          ========================== */}
          <div className="mx-auto max-w-[1800px] text-center mb-4 xs:mb-6 sm:mb-8">
            <h1
              className="
                m-0
                font-extrabold
                tracking-[-0.045em]
                text-6xl
                sm:text-7xl
                lg:text-8xl
                text-center
                flex
                flex-col
                items-center
              "
            >
              {[
                {
                  text: "Everything a school needs.",
                  gradient:
                    "from-[#0048FF] via-[#4338CA] via-[#7C3AED] via-[#0052FF] via-[#7C3AED] to-[#EA580C]",
                },
                {
                  text: "Without adding another cost.",
                  gradient:
                    "from-[#6D28D9] via-[#C026D3] via-[#7C3AED] via-[#E11D48] to-[#F59E0B]",
                },
              ].map((line, idx) => (
                <motion.span
                  key={line.text}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    inline-block
                    pb-1
                    sm:pb-2.5
                    px-2
                    leading-[1.12]
                    bg-gradient-to-r
                    ${line.gradient}
                    bg-clip-text
                    text-transparent
                    will-change-transform
                  `}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>
          </div>

          <br />
          <br />
          {/* =========================
              CENTERED NO LIST (ORGANIC OVERLAP ON SCROLL)
          ========================== */}
          <div
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[490px]
              xs:max-w-[540px]
              sm:max-w-[880px]
              lg:max-w-[1120px]
              xl:max-w-[1260px]
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
      </div>
    </section>
  );
}

/* ==========================================================================
   INDIVIDUAL NO ROW - Scroll Reveal & 50% Overlap
   ========================================================================== */

function NoItemRow({ item, index, scrollYProgress }) {
  // Staggered scroll ranges: index 0 is visible immediately; subsequent rows slide in smoothly on scroll
  const start = index === 0 ? 0 : 0.08 + (index - 1) * 0.26;
  const revealEnd = index === 0 ? 0.05 : start + 0.16;

  // Once revealed, opacity remains 1 all the way to end
  const opacity = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.05, 1] : [start, revealEnd, 1],
    index === 0 ? [1, 1, 1] : [0, 1, 1],
  );

  // Smooth slide-up on entry
  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.05] : [start, revealEnd],
    index === 0 ? [0, 0] : [45, 0],
  );

  // Subtle scale-up for premium feel
  const scale = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.05] : [start, revealEnd],
    index === 0 ? [1, 1] : [0.95, 1],
  );

  // Waved entrance draw
  const waveScale = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.05] : [start, revealEnd],
    index === 0 ? [1, 1] : [0.35, 1],
  );

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
        grid-cols-[125px_1fr]
        items-center
        min-h-[105px]
        xs:grid-cols-[145px_1fr]
        xs:min-h-[118px]
        sm:grid-cols-[220px_1fr]
        sm:min-h-[135px]
        md:grid-cols-[300px_1fr]
        md:min-h-[150px]
        lg:grid-cols-[390px_1fr]
        lg:min-h-[170px]
        xl:grid-cols-[450px_1fr]
        xl:min-h-[185px]
        ${index > 0 ? "-mt-[30px] xs:-mt-[36px] sm:-mt-[50px] md:-mt-[62px] lg:-mt-[74px] xl:-mt-[82px]" : ""}
      `}
    >
      {/* Background wave with white mask for index > 0 to cleanly cover the bottom of the previous row */}
      <motion.div
        style={{
          scaleX: waveScale,
          transformOrigin: "left center",
        }}
        className="pointer-events-none absolute inset-x-[-12%] -top-2 -bottom-4 overflow-hidden"
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

          {/* Solid white backdrop so this row cleanly masks the bottom of the preceding NO */}
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
        className="
          relative
          z-10
          flex
          items-center
          justify-end
          pr-3
          xs:pr-4
          sm:pr-6
          md:pr-8
          lg:pr-10
        "
      >
        <span
          className={`
            inline-block
            bg-gradient-to-b
            ${item.noGradient}
            bg-clip-text
            text-transparent
            font-black
            leading-[0.84]
            tracking-[-0.045em]
            text-[4.8rem]
            xs:text-[5.6rem]
            sm:text-[7.4rem]
            md:text-[9.4rem]
            lg:text-[11.4rem]
            xl:text-[12.6rem]
            px-2
            py-1
            select-none
          `}
        >
          No
        </span>
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
          leading-[1.14]
          tracking-[-0.035em]
          text-[1.42rem]
          xs:text-[1.62rem]
          sm:text-[2.2rem]
          md:text-[2.75rem]
          lg:text-[3.2rem]
          xl:text-[3.7rem]
          pb-1
          pt-1
          pr-2
        `}
      >
        {item.text}
      </div>
    </motion.div>
  );
}
