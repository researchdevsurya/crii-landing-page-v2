import React, { useRef } from "react";
import { motion } from "framer-motion";

import devicesMobile from "../../assets/devices_mobile.png";

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
        min-h-[100vh]
        min-h-[100svh]
        flex
        flex-col
        justify-center
        items-center
        overflow-hidden
        bg-white
        px-4
        py-8
        xs:px-6
      "
    >
      {/* =====================================================
          SOFT BACKGROUND GLOW
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.65, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="
            absolute
            left-[-10%]
            top-[40%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-white
            blur-[110px]
            sm:h-[420px]
            sm:w-[420px]
          "
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.2, ease: smoothEase }}
          className="
            absolute
            right-[-15%]
            top-[42%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-indigo-100/60
            blur-[110px]
            sm:h-[400px]
            sm:w-[400px]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          my-auto
          flex
          w-full
          max-w-[520px]
          flex-col
          items-center
          justify-center
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}
        <div className="mb-3 w-full text-center xs:mb-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="
              mb-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-slate-500
              xs:text-[11px]
              sm:text-xs
            "
          >
            Multi-Device Access
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: smoothEase }}
            className="
              mx-auto
              max-w-[430px]
              text-[36px]
              font-semibold
              leading-[1.02]
              tracking-[-0.05em]
              text-[#171717]
              xs:text-[40px]
              sm:text-[48px]
            "
          >
            Available on
            <br />
            every device.
          </motion.h2>
        </div>

        {/* ===================================================
            DEVICE AREA (Laptop + Phone Composite Image)
        =================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
          className="
            relative
            my-2
            flex
            w-[108%]
            max-w-[480px]
            items-center
            justify-center
            transform-gpu
            xs:w-[104%]
            sm:w-full
          "
        >
          <img
            src={devicesMobile}
            alt="Available on every device - Laptop and Mobile"
            draggable="false"
            className="
              block
              h-auto
              w-full
              select-none
              object-contain
              drop-sha-sha-[0_20px_40px_rgba(0,0,0,0.12)]
            "
          />
        </motion.div>

        {/* ===================================================
            BOTTOM CONTENT
        =================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.28, ease: smoothEase }}
          className="
            mt-3
            flex
            w-full
            flex-col
            items-center
            text-center
            xs:mt-4
          "
        >
          <p
            className="
              max-w-[300px]
              text-[13px]
              leading-relaxed
              tracking-[-0.01em]
              text-slate-500
              xs:text-sm
            "
          >
            One platform. Every learner.
            <br />
            Everywhere.
          </p>

          {/* Minimal scroll indicator */}
        </motion.div>
      </div>
    </section>
  );
};

export default DeviceShowcaseForMobile;
