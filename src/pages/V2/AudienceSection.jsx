import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import audi1 from "../../assets/audi1.png";
import audi2 from "../../assets/audi2.png";
import audi3 from "../../assets/audi3.png";
import audi4 from "../../assets/audi4.png";

const cards = [
  {
    title: "Principals",
    subtitle: "Build the system.",
    image: audi1,
  },
  {
    title: "Counsellors",
    subtitle: "Guide with clarity.",
    image: audi2,
  },
  {
    title: "Students",
    subtitle: "Explore possibilities.",
    image: audi3,
  },
  {
    title: "Parents",
    subtitle: "Support decisions.",
    image: audi4,
  },
];

export default function AudienceSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. One Programme
  const programmeOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0.15, 1, 1],
  );
  const programmeY = useTransform(scrollYProgress, [0, 0.2, 1], [25, 0, 0]);

  // 2. Different People
  const peopleOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.3, 1],
    [0, 1, 1],
  );
  const peopleY = useTransform(scrollYProgress, [0.08, 0.3, 1], [20, 0, 0]);

  // 3. Cards Entrance
  const cardScale = useTransform(scrollYProgress, [0.2, 0.65, 1], [0.9, 1, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.5, 1], [0.1, 1, 1]);

  // Left pair (Principal, Counsellor)
  const leftCardX = useTransform(scrollYProgress, [0.2, 0.65, 1], [-80, 0, 0]);
  const leftCardY = useTransform(scrollYProgress, [0.2, 0.65, 1], [-25, 0, 0]);

  // Right pair (Student, Parent)
  const rightCardX = useTransform(scrollYProgress, [0.2, 0.65, 1], [80, 0, 0]);
  const rightCardY = useTransform(scrollYProgress, [0.2, 0.65, 1], [25, 0, 0]);

  // 4. Connected Decisions
  const decisionOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.85, 1],
    [0, 1, 1],
  );
  const decisionY = useTransform(scrollYProgress, [0.55, 0.85, 1], [25, 0, 0]);

  const rotations = [-4, -1.5, 1.5, 4];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#f3f7ff] via-[#fafbff] to-[#f2f0ff] text-[#111]"
      style={{ minHeight: "180vh" }}
    >
      <div className="sticky top-0 flex h-screen h-[100dvh] w-full flex-col justify-between items-center overflow-hidden px-0 pt-14 pb-5 sm:px-8 sm:py-6 lg:px-14 lg:py-8">
        {/* =================================================
            TOP HEADER: ONE PROGRAMME + DIFFERENT PEOPLE
        ================================================= */}
        <div className="flex flex-col items-center justify-center text-center w-full pt-1 sm:pt-2 shrink-0">
          {/* ONE PROGRAMME */}
          <motion.div
            style={{
              opacity: programmeOpacity,
              y: programmeY,
            }}
            className="relative z-30 w-full text-center will-change-transform"
          >
            <h2
              className="
                text-[clamp(2.75rem,8.2vw,4.5rem)]
                font-semibold
                leading-[0.92]
                tracking-[-0.035em]
                text-[#1E1E1E]
                mt-12 md:mt-32

                max-[450px]:text-[40px]

              "
            >
              One Programme.
            </h2>
          </motion.div>

          {/* DIFFERENT PEOPLE */}
          <motion.div
            style={{
              opacity: peopleOpacity,
              y: peopleY,
            }}
            className="relative z-30 pt-4 md:pt-5 w-full text-center will-change-transform"
          >
            <h3
              className="
                text-base
                xs:text-lg
                sm:text-xl
                md:text-2xl
                font-medium
                tracking-[-0.02em]
                text-black/60
              "
            >
              Different People.
            </h3>
          </motion.div>
        </div>

        {/* =================================================
            AUDIENCE CARDS (PERFECTLY BALANCED & PROPORTIONED)
        ================================================= */}
        <div
          className="
            relative
            z-10
            grid
            w-full
            max-w-[380px]
            xs:max-w-[415px]
            grid-cols-2
            items-center
            justify-items-center
            gap-0
            sm:my-auto
            sm:flex
            sm:max-w-[940px]
            md:max-w-[1100px]
            lg:max-w-[1300px]
            sm:justify-center
            sm:items-center
          "
        >
          {cards.map((card, index) => {
            const isLeft = index < 2;
            const x = isLeft ? leftCardX : rightCardX;
            const y = isLeft ? leftCardY : rightCardY;

            return (
              <motion.div
                key={card.title}
                style={{
                  opacity: cardOpacity,
                  scale: cardScale,
                  x,
                  y,
                  rotate: rotations[index],
                }}
                className={`
                  audience-card
                  group
                  relative
                  flex
                  aspect-[2/3]
                  w-[118%]
                  max-w-[300px]
                  xs:max-w-[250px]
                  shrink-0
                  cursor-pointer
                  items-center
                  justify-center
                  p-0
                  transform-gpu
                  will-change-transform

                  /* MOBILE OVERLAP (2x2 Grid with clean overlap) */
                  ${index === 0 ? "z-[1] -mr-6 xs:-mr-7" : ""}
                  ${index === 1 ? "z-[2] -ml-6 xs:-ml-7" : ""}
                  ${index === 2 ? "z-[3] -mr-6 xs:-mr-7 -mt-4 xs:-mt-16" : ""}
                  ${index === 3 ? "z-[4] -ml-6 xs:-ml-7 -mt-4 xs:-mt-16" : ""}

                  /* TABLET & DESKTOP SIZING (4 in a row, centered) */
                  max-[365px]:w-[150px]
                  max-[465px]:w-[190px]
                  sm:w-[24%]
                  sm:max-w-[210px]
                  md:max-w-[250px]
                  lg:max-w-[300px]
                  xl:max-w-[340px]
                  sm:max-h-[46vh]
                  md:max-h-[50vh]
                  lg:max-h-[54vh]
                  sm:mt-0
                  sm:mr-0
                  sm:ml-0

                  ${index === 0 ? "sm:-mr-[3%] lg:-mr-[4%] sm:z-[1]" : ""}
                  ${index === 1 ? "sm:-mr-[3%] lg:-mr-[4%] sm:z-[2]" : ""}
                  ${index === 2 ? "sm:-ml-[3%] lg:-ml-[4%] sm:z-[3]" : ""}
                  ${index === 3 ? "sm:-ml-[3%] lg:-ml-[4%] sm:z-[4]" : ""}
                `}
              >
                {/* PERSON IMAGE */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="
                    audience-image
                    h-full
                    w-full
                    select-none
                    object-cover
                    object-center
                    drop-shadow-[0_14px_28px_rgba(0,0,0,0.12)]
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-[1.04]
                  "
                  draggable="false"
                  loading="lazy"
                />

                {/* SOFT HOVER GLOW */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[8%]
                    -z-10
                    rounded-full
                    bg-white/0
                    opacity-0
                    blur-2xl
                    transition-all
                    duration-500
                    group-hover:bg-white/60
                    group-hover:opacity-100
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM: CONNECTED DECISIONS
        ================================================= */}
        <motion.div
          style={{
            opacity: decisionOpacity,
            y: decisionY,
          }}
          className="
            relative
            z-30
            w-full
            text-center
            pb-10
            pt-10
            md:pb-32
            shrink-0
            will-change-transform

          "
        >
          <h2
            className="
              text-[clamp(2.75rem,8.2vw,3.8rem)]
              font-semibold
              leading-[0.92]
              tracking-[-0.035em]
              text-[#1E1E1E]
                max-[450px]:text-[40px]

            "
          >
            Connected Decisions.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
