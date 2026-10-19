import React, { useRef } from "react";
import { motion } from "framer-motion";

import mobilePng from "../../assets/mobilepng.png";

const smoothEase = [0.16, 1, 0.3, 1];

const DeviceShowcaseForMobile = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-40
        w-full
        min-h-[102vh]
        min-h-[102svh]
        flex
        flex-col
        justify-between
        items-center
        overflow-hidden
        bg-white
        px-5
        py-12
        xs:py-10
      "
    >
      {/* =====================================================
          SOFT AMBIENT BACKGROUND GLOWS
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="
            absolute
            left-[-20%]
            top-[20%]
            h-[360px]
            w-[360px]
            rounded-full
            bg-blue-100/50
            blur-[100px]
          "
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.2, ease: smoothEase }}
          className="
            absolute
            right-[-20%]
            top-[50%]
            h-[340px]
            w-[340px]
            rounded-full
            bg-indigo-100/50
            blur-[100px]
          "
        />
      </div>

      {/* =====================================================
          HEADER SECTION (TOP)
      ===================================================== */}
      <div className="relative z-10 w-full max-w-[480px] text-center pt-2 xs:pt-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="inline-flex items-center gap-2 mt-12 px-3.5 py-1 rounded-full   border-slate-200/80 mb-3 "
        >
          <span className="text-[11px] font-bold uppercase  text-slate-700">
            Multi-Device Access
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.08, ease: smoothEase }}
          className="
            mx-auto
            text-[38px]
            xs:text-[44px]
            sm:text-[50px]
            font-extrabold
            leading-[1.04]
            tracking-[-0.04em]
            text-[#111827]
          "
        >
          Available on
          <br />
          every device.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: smoothEase }}
          className="mt-2 text-xs xs:text-sm font-medium text-slate-500 max-w-[320px] mx-auto leading-relaxed"
        >
          Seamless, real-time learning experience optimized for laptop, tablet,
          and smartphone.
        </motion.p>
      </div>

      {/* =====================================================
          HERO DEVICE VISUAL (CENTER - EXPANDED)
      ===================================================== */}
      <div className="relative z-10 my-auto w-full max-w-[540px] flex flex-col items-center justify-center pt-2 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
          className="
            relative
            flex
            w-[110%]
            xs:w-[105%]
            sm:w-full
            items-center
            justify-center
            transform-gpu
          "
        >
          <img
            src={mobilePng}
            alt="Available on every device - Laptop, Tablet, Mobile"
            draggable="false"
            className="
              block
              h-auto
              w-full
              select-none
              object-contain
              drop-shadow-[0_24px_48px_rgba(0,0,0,0.15)]
            "
          />
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM STATS & FOOTER (BOTTOM)
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0.28, ease: smoothEase }}
        className="relative z-10 w-full max-w-[440px] flex flex-col items-center text-center pb-2"
      >
        {/* Quick Highlights Bar */}

        <p className="text-[13px] font-medium text-slate-500 tracking-[-0.01em]">
          One platform. Every learner. Everywhere.
        </p>
      </motion.div>
    </section>
  );
};

export default DeviceShowcaseForMobile;
