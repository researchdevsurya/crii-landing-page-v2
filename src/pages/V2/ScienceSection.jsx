import React from "react";
import { motion } from "framer-motion";

import defaultProductImage from "../../assets/Feature/feature4.png";

const ScienceSection = ({
  eyebrow = "Audio performance",
  title = "The sound of science.",
  description = `Powered by the Apple-designed H2 chip, AirPods Pro 3 feature a
  completely redesigned acoustic architecture that brings breathtaking,
  all-around-you audio to everything you listen to — from your pump-up
  playlist to your weekly FaceTime call with family.`,

  image = defaultProductImage,
  video = null,

  bgColor = "bg-[#ffffff]",
  textColor = "text-[#1d1d1f]",
  eyebrowColor = "text-[#1d1d1f]",
  descriptionColor = "text-[#6e6e73]",

  blendMode = "mix-blend-multiply",
  imageClassName = "",
  className = "",
}) => {
  return (
    <section
      className={`
        relative
        w-full
        h-screen
        h-[100dvh]
        min-h-[100dvh]
        flex
        flex-col
        justify-start
        lg:justify-center
        items-center
        overflow-hidden
        px-4
        sm:px-6
        md:px-8
        pt-24
        pb-6
        xs:pt-8
        xs:pb-8
        sm:py-10
        md:py-14
        lg:py-20
        ${bgColor}
        ${className}
      `}
    >
      {/* =================================================
          TEXT CONTENT
      ================================================= */}
      <div
        className="
          relative
          z-20
          flex
          w-full
          max-w-4xl
          lg:max-w-full
          flex-col
          items-center
          px-2
          sm:px-6
          md:px-10
          text-center
          shrink-0
        "
      >
        {/* Eyebrow */}
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`

              mb-1
              sm:mb-1.5
              md:mb-2
              text-xs
              sm:text-sm
              md:text-[15px]
              font-semibold
              tracking-wide
              text-[#1E1E1E]
              ${eyebrowColor}
            `}
          >
            {eyebrow}
          </motion.span>
        )}

        {/* Title */}
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className={`
              mx-auto
              max-w-3xl
              text-3xl
              sm:text-3xl
              md:text-4xl
              lg:text-[44px]
              xl:text-[50px]
              font-semibold
              leading-[1.14]
              tracking-[-0.03em]
              text-[#1E1E1E]
              mb-1.5
              sm:mb-2
              md:mb-2.5
              ${textColor}
            `}
          >
            {title}
          </motion.h2>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className={`
              mt-0.5
              sm:mt-1
              max-w-xl
              sm:max-w-2xl
              md:max-w-2xl
              lg:max-w-3xl
              text-base
              sm:text-sm
              md:text-base
              lg:text-[17px]
              font-normal
              leading-relaxed
              tracking-[-0.01em]
              ${descriptionColor}
            `}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* =================================================
          PRODUCT SHOWCASE (BIGGER ON MOBILE & TABLET)
      ================================================= */}
      <div
        className="
          relative
          z-10
          flex
          flex-1
          w-full
          items-center
          justify-center
          my-auto
          py-1
          px-0
          sm:px-0
          md:px-0
          lg:px-12
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="
            relative
            flex
            h-full
            max-h-[56vh]
            xs:max-h-[60vh]
            sm:max-h-none
            sm:h-[500px]
            md:h-[500px]
            lg:h-[520px]
            xl:h-[580px]
            2xl:h-[640px]
            w-full
            max-w-5xl
            md:max-w-6xl
            xl:max-w-7xl
            2xl:max-w-[1500px]
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            sm:overflow-visible
            sm:rounded-none
          "
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className={`
                h-full
                w-full
                sm:w-auto
                max-w-full
                object-cover
                sm:object-contain
                select-none
                scale-[1.12]
                xs:scale-[1.15]
                sm:scale-[1.12]
                md:scale-[1.08]
                lg:scale-100
                origin-center
                rounded-2xl
                sm:rounded-none
                ${imageClassName}
              `}
            />
          ) : image ? (
            <img
              src={image}
              alt={typeof title === "string" ? title : "Product Showcase"}
              draggable="false"
              loading="lazy"
              className={`
                h-full
                w-full
                sm:w-auto
                max-w-full
                object-cover
                sm:object-contain
                select-none
                scale-[1]
                xs:scale-[1.15]
                sm:scale-[1]
                md:scale-[1.08]
                lg:scale-100
                origin-center
                rounded-2xl
                sm:rounded-none
                ${imageClassName}
              `}
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default ScienceSection;
