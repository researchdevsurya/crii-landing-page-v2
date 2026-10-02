import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import laptop from "../../assets/laptop.png";
import mobile from "../../assets/mobile.png";
import tablet from "../../assets/tablet.png";
import devicesImg from "../../assets/New/devices.png";
import DeviceShowcaseForMobile from "./DeviceShowcaseForMobile";

const DeviceShowcase = () => {
  const sectionRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // =====================================================
  // LAPTOP
  // =====================================================

  const laptopScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1.04, 0.92, 0.85],
  );

  const laptopY = useTransform(scrollYProgress, [0, 0.45, 1], [30, 0, 0]);

  // =====================================================
  // MOBILE (RIGHT SIDE)
  // =====================================================

  const mobileX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.65, 1],
    [500, 350, 180, 0, 0],
  );

  const mobileY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [60, 30, 0, 0],
  );

  // Mobile slanted 5deg to the right
  const mobileRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [16, 12, 8, 6, 5],
  );

  const mobileScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.8, 1],
    [0.75, 0.82, 0.92, 1, 1],
  );

  const mobileOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5, 1],
    [0, 0.3, 0.7, 1, 1],
  );

  // =====================================================
  // TABLET (LEFT SIDE)
  // =====================================================

  const tabletX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.65, 1],
    [-450, -300, -140, -40, -40],
  );

  const tabletY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [50, 25, 0, 0],
  );

  // Tablet slanted -5deg to the left to match mobile
  const tabletRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-16, -12, -8, -6, -5],
  );

  const tabletScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.8, 1],
    [0.76, 0.85, 0.92, 0.96, 0.96],
  );

  const tabletOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5, 1],
    [0, 0.3, 0.7, 1, 1],
  );

  // =====================================================
  // FINAL TEXT
  // =====================================================

  const finalTextOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.84, 1],
    [0, 0.8, 1],
  );

  const finalTextY = useTransform(scrollYProgress, [0.72, 0.84, 1], [35, 0, 0]);

  return (
    <>
      {/* =================================================
                MOBILE: ANIMATED SHOWCASE
            ================================================= */}
      <div className="md:hidden">
        <DeviceShowcaseForMobile />
      </div>

      {/* =================================================
                DESKTOP: FULL ANIMATED SCROLL EXPERIENCE
            ================================================= */}
      <section
        ref={sectionRef}
        className="relative z-40 hidden bg-white md:block h-[300vh]"
      >
        {/* =================================================
                    STICKY VIEWPORT
                ================================================= */}

        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* =================================================
                        CLEAN BACKGROUND
                    ================================================= */}

          <div className="pointer-events-none absolute inset-0">
            <div
              className="
                                absolute
                                left-1/2
                                top-1/2
                                h-[500px]
                                w-[500px]
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-blue-100/20
                                blur-[140px]
                            "
            />
          </div>

          {/* =================================================
                        TOP HEADING
                    ================================================= */}

          <div
            className="
                            absolute
                            top-[3%]
                            sm:top-[4%]
                            inset-x-0
                            z-40
                            mx-auto
                            max-w-4xl
                            px-6
                            text-center
                        "
          >
            <p
              className="
                                mb-1.5
                                text-xs
                                sm:text-sm
                                md:text-base
                                font-medium
                                uppercase
                                tracking-[0.18em]
                                text-neutral-500
                            "
            >
              Multi-Device Access
            </p>
            <h2
              className="
                text-[clamp(2.5rem,5.2vw,5rem)]
                font-semibold
                leading-[0.94]
                tracking-[-0.035em]
                text-[#1E1E1E]
              "
            >
              Available on every device.
            </h2>
          </div>

          {/* =================================================
                        DEVICE AREA
                    ================================================= */}

          <div
            className="
                            absolute
                            inset-x-0
                            top-[16%]
                            bottom-[8%]
                            mx-auto
                            w-full
                            max-w-[1500px]
                        "
          >
            {/* =================================================
                            LAPTOP - CENTER
                        ================================================= */}

            <motion.div
              style={{
                scale: laptopScale,
                y: laptopY,
              }}
              className="
                                absolute
                                left-1/2
                                top-[54%]
                                z-20
                                w-[88vw]
                                max-w-[1020px]
                                -translate-x-1/2
                                -translate-y-1/2
                                will-change-transform
                            "
            >
              <img
                src={laptop}
                alt="Career Ready India laptop"
                className="
                                    block
                                    h-auto
                                    w-full
                                    object-contain
                                "
                draggable="false"
              />
            </motion.div>

            {/* =================================================
                            TABLET - LEFT
                        ================================================= */}

            <motion.div
              style={{
                x: tabletX,
                y: tabletY,
                rotate: tabletRotate,
                scale: tabletScale,
                opacity: tabletOpacity,
              }}
              className="
                                absolute
                                left-[2%]
                                lg:left-[4%]
                                xl:left-[6%]
                                top-[54%]
                                -translate-y-1/2
                                z-30
                                w-[240px]
                                lg:w-[300px]
                                xl:w-[350px]
                                will-change-transform
                            "
            >
              <img
                src={tablet}
                alt="Career Ready India tablet"
                className="
                                    h-auto
                                    w-full
                                    object-contain
                                "
                draggable="false"
              />
            </motion.div>

            {/* =================================================
                            MOBILE - RIGHT
                        ================================================= */}

            <motion.div
              style={{
                x: mobileX,
                y: mobileY,
                rotate: mobileRotate,
                scale: mobileScale,
                opacity: mobileOpacity,
              }}
              className="
                                absolute
                                right-[2%]
                                lg:right-[4%]
                                xl:right-[6%]
                                top-[54%]
                                -translate-y-1/2
                                z-30
                                w-[180px]
                                lg:w-[225px]
                                xl:w-[260px]
                                will-change-transform
                            "
            >
              <img
                src={mobile}
                alt="Career Ready India mobile"
                className="
                                    h-auto
                                    w-full
                                    object-contain
                                "
                draggable="false"
              />
            </motion.div>
          </div>

          {/* =================================================
                        FINAL TEXT
                    ================================================= */}

          <motion.div
            style={{
              opacity: finalTextOpacity,
              y: finalTextY,
            }}
            className="
                            pointer-events-none
                            absolute
                            bottom-[2%]
                            left-1/2
                            z-[60]
                            w-full
                            -translate-x-1/2
                            px-6
                            text-center
                        "
          >
            <p
              className="
                                text-sm
                                font-medium
                                tracking-wide
                                text-slate-500
                                md:text-base
                            "
            >
              One platform. Every learner. Everywhere.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DeviceShowcase;

