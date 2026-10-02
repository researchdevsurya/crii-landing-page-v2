import React, { useEffect, useRef, useState, useCallback } from "react";

/* =========================================================
   IMAGES & ASSETS
========================================================= */
import imgtest from "../../assets/Feature/feature1.png";
import providedFeature1 from "../../assets/Feature/providedFeatures1.png";
import providedFeature2 from "../../assets/Feature/providedFeature2.png";
import providedFeature3 from "../../assets/Feature/providedFeature3.png";
import providedFeature4 from "../../assets/Feature/providedFeature4.png";
import providedFeature5 from "../../assets/Feature/providedFeature5.png";
import providedFeature6 from "../../assets/Feature/providedFeature6.png";
import providedFeature7 from "../../assets/Feature/providedFeature7.png";
import impVedio from "../../assets/imp_vedio.mp4";

/* =========================================================
   GENERIC FEATURE CARD WRAPPER COMPONENT
========================================================= */
export const FeatureCardWrapper = ({
  isActive,
  children,
  onClick,
  cardRef,
  className = "",
}) => {
  return (
    <article
      ref={cardRef}
      onClick={onClick}
      className={`
        shrink-0
        w-[88vw]
        max-w-[420px]
        sm:max-w-none
        sm:w-[680px]
        md:w-[840px]
        md:max-w-[85vw]
        lg:w-[980px]
        xl:w-[1080px]
        aspect-[4/5.8]
        sm:aspect-[16/11]
        md:aspect-[16/10]
        lg:aspect-[16/9.5]
        rounded-[2rem]
        sm:rounded-[2.5rem]
        md:rounded-[3rem]
        lg:rounded-[3rem]
        overflow-hidden
        relative
        shadow-none
        border-0
        cursor-pointer
        transition-all
        duration-500
        ${
          isActive
            ? "opacity-100 scale-100"
            : "opacity-60 hover:opacity-85 scale-[0.98]"
        }
        ${className}
      `}
    >
      {children}
    </article>
  );
};

/* =========================================================
   REUSABLE OVERLAY TEXT COMPONENT
   (Allows positioning anywhere: top, bottom, center, left, right,
    percentage positioning with top/bottom/left/right,
    width/maxWidth controls,
    spacing utilities: pt, pb, mt, mb, pl, pr, px, py, mx, my,
    center-left, center-right, and align props)
   Title is BOLD + Description is SAME FONT SIZE
========================================================= */
export const CardOverlayText = ({
  title,
  description,
  position = "top-center", // "top-center" | "top-center-left" | "top-center-right" | "top-left" | "top-right" | "bottom-center" | "bottom-center-left" | "bottom-center-right" | "bottom-left" | "bottom-right" | "center" | "center-left" | "center-right"
  align = "", // "left" | "center" | "right" | ""
  top, // e.g. "12%", "15%", "50px"
  bottom, // e.g. "15%", "20px"
  left, // e.g. "8%", "10%"
  right, // e.g. "8%", "10%"
  width, // e.g. "450px", "45%", "w-[380px]", "w-1/2", "max-w-md"
  maxWidth, // e.g. "450px", "45%", "max-w-lg", "max-w-[420px]"
  pt, // e.g. "pt-8", "8", "pt-12"
  pb, // e.g. "pb-8", "8", "pb-12"
  pl, // e.g. "pl-6", "6"
  pr, // e.g. "pr-6", "6"
  px, // e.g. "px-8", "8"
  py, // e.g. "py-6", "6"
  mt, // e.g. "mt-4", "4"
  mb, // e.g. "mb-4", "4"
  ml, // e.g. "ml-4", "4"
  mr, // e.g. "mr-4", "4"
  mx, // e.g. "mx-auto", "4"
  my, // e.g. "my-4", "4"
  style = {},
  className = "",
  titleClassName = "font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#1d1d1f]",
  descClassName = "font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#1d1d1f]/80",
}) => {
  const alignClass =
    align === "left" || align === "semileft" || align === "semi-left"
      ? "text-left"
      : align === "right" ||
          align === "semiright" ||
          align === "semi-right" ||
          align === "semirigth"
        ? "text-right"
        : align === "center"
          ? "text-center"
          : "";

  const formatSpacing = (prop, prefix) => {
    if (!prop) return "";
    if (
      typeof prop === "string" &&
      (prop.startsWith(prefix) || prop.includes("-") || prop.includes("["))
    )
      return prop;
    return `${prefix}-${prop}`;
  };

  const spacingClasses = [
    formatSpacing(pt, "pt"),
    formatSpacing(pb, "pb"),
    formatSpacing(pl, "pl"),
    formatSpacing(pr, "pr"),
    formatSpacing(px, "px"),
    formatSpacing(py, "py"),
    formatSpacing(mt, "mt"),
    formatSpacing(mb, "mb"),
    formatSpacing(ml, "ml"),
    formatSpacing(mr, "mr"),
    formatSpacing(mx, "mx"),
    formatSpacing(my, "my"),
  ]
    .filter(Boolean)
    .join(" ");

  // Position mapping (5 Vertical Tiers × 5 Horizontal Tiers)
  const positionClasses = {
    // ================= 1. TOP TIER (0 - 6%) =================
    "top-left":
      "top-0 left-0 pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 md:px-10 text-left max-w-2xl sm:max-w-3xl",
    "top-semileft":
      "top-0 left-[4%] sm:left-[8%] pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "top-semi-left":
      "top-0 left-[4%] sm:left-[8%] pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "top-center":
      "top-0 inset-x-0 pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 md:px-10 text-center max-w-4xl mx-auto",
    "top-center-left":
      "top-0 inset-x-0 pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 md:px-10 text-left max-w-4xl mx-auto",
    "top-center-right":
      "top-0 inset-x-0 pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 md:px-10 text-right max-w-4xl mx-auto",
    "top-semiright":
      "top-0 right-[4%] sm:right-[8%] pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "top-semi-right":
      "top-0 right-[4%] sm:right-[8%] pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "top-semirigth":
      "top-0 right-[4%] sm:right-[8%] pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "top-right":
      "top-0 right-0 pt-3.5 sm:pt-6 md:pt-8 px-5 sm:px-8 md:px-10 text-right max-w-2xl sm:max-w-3xl ml-auto",

    // ================= 2. SEMI-TOP TIER (18% - 24%) =================
    semitop:
      "top-[10%] sm:top-[20%] inset-x-0 px-5 sm:px-8 md:px-10 text-center max-w-4xl mx-auto",
    "semi-top":
      "top-[10%] sm:top-[20%] inset-x-0 px-5 sm:px-8 md:px-10 text-center max-w-4xl mx-auto",
    "semitop-left":
      "top-[10%] sm:top-[20%] left-0 px-5 sm:px-8 md:px-10 text-left max-w-2xl sm:max-w-3xl",
    "semi-top-left":
      "top-[10%] sm:top-[20%] left-0 px-5 sm:px-8 md:px-10 text-left max-w-2xl sm:max-w-3xl",
    "semitop-semileft":
      "top-[10%] sm:top-[20%] left-[4%] sm:left-[8%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "semi-top-semileft":
      "top-[10%] sm:top-[20%] left-[4%] sm:left-[8%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "semitop-center":
      "top-[10%] sm:top-[20%] inset-x-0 px-5 sm:px-8 md:px-10 text-center max-w-4xl mx-auto",
    "semi-top-center":
      "top-[10%] sm:top-[20%] inset-x-0 px-5 sm:px-8 md:px-10 text-center max-w-4xl mx-auto",
    "semitop-center-left":
      "top-[10%] sm:top-[20%] inset-x-0 px-5 sm:px-8 md:px-10 text-left max-w-4xl mx-auto",
    "semitop-center-right":
      "top-[10%] sm:top-[20%] inset-x-0 px-5 sm:px-8 md:px-10 text-right max-w-4xl mx-auto",
    "semitop-semiright":
      "top-[10%] sm:top-[20%] right-[4%] sm:right-[8%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semi-top-semiright":
      "top-[10%] sm:top-[20%] right-[4%] sm:right-[8%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semitop-semirigth":
      "top-[10%] sm:top-[20%] right-[4%] sm:right-[8%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semitop-right":
      "top-[10%] sm:top-[20%] right-0 px-5 sm:px-8 md:px-10 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semi-top-right":
      "top-[10%] sm:top-[20%] right-0 px-5 sm:px-8 md:px-10 text-right max-w-2xl sm:max-w-3xl ml-auto",

    // ================= 3. CENTER TIER (50% Middle) =================
    center:
      "top-1/2 -translate-y-1/2 inset-x-0 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "center-center":
      "top-1/2 -translate-y-1/2 inset-x-0 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "center-left":
      "top-1/2 -translate-y-1/2 left-0 px-5 sm:px-12 text-left max-w-2xl sm:max-w-3xl",
    "center-semileft":
      "top-1/2 -translate-y-1/2 left-[6%] sm:left-[10%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "center-semi-left":
      "top-1/2 -translate-y-1/2 left-[6%] sm:left-[10%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "center-center-left":
      "top-1/2 -translate-y-1/2 inset-x-0 px-5 sm:px-12 text-left max-w-4xl mx-auto",
    "center-center-right":
      "top-1/2 -translate-y-1/2 inset-x-0 px-5 sm:px-12 text-right max-w-4xl mx-auto",
    "center-semiright":
      "top-1/2 -translate-y-1/2 right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "center-semi-right":
      "top-1/2 -translate-y-1/2 right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "center-semirigth":
      "top-1/2 -translate-y-1/2 right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "center-right":
      "top-1/2 -translate-y-1/2 right-0 px-5 sm:px-12 text-right max-w-2xl sm:max-w-3xl ml-auto",

    // ================= 4. SEMI-BOTTOM TIER (18% - 24% from bottom) =================
    semibottom:
      "bottom-[18%] sm:bottom-[22%] inset-x-0 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "semi-bottom":
      "bottom-[18%] sm:bottom-[22%] inset-x-0 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "semibottom-left":
      "bottom-[18%] sm:bottom-[22%] left-0 px-5 sm:px-12 text-left max-w-2xl sm:max-w-3xl",
    "semi-bottom-left":
      "bottom-[18%] sm:bottom-[22%] left-0 px-5 sm:px-12 text-left max-w-2xl sm:max-w-3xl",
    "semibottom-semileft":
      "bottom-[18%] sm:bottom-[22%] left-[6%] sm:left-[10%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "semi-bottom-semileft":
      "bottom-[18%] sm:bottom-[22%] left-[6%] sm:left-[10%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "semibottom-center":
      "bottom-[18%] sm:bottom-[22%] inset-x-0 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "semi-bottom-center":
      "bottom-[18%] sm:bottom-[22%] inset-x-0 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "semibottom-center-left":
      "bottom-[18%] sm:bottom-[22%] inset-x-0 px-5 sm:px-12 text-left max-w-4xl mx-auto",
    "semibottom-center-right":
      "bottom-[18%] sm:bottom-[22%] inset-x-0 px-5 sm:px-12 text-right max-w-4xl mx-auto",
    "semibottom-semiright":
      "bottom-[18%] sm:bottom-[22%] right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semi-bottom-semiright":
      "bottom-[18%] sm:bottom-[22%] right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semibottom-semirigth":
      "bottom-[18%] sm:bottom-[22%] right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semibottom-right":
      "bottom-[18%] sm:bottom-[22%] right-0 px-5 sm:px-12 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semi-bottom-right":
      "bottom-[18%] sm:bottom-[22%] right-0 px-5 sm:px-12 text-right max-w-2xl sm:max-w-3xl ml-auto",

    // ================= 5. BOTTOM TIER (0 - 6% from bottom) =================
    "bottom-left":
      "bottom-0 left-0 pb-5 sm:pb-8 md:pb-10 px-5 sm:px-12 text-left max-w-2xl sm:max-w-3xl",
    "bottom-semileft":
      "bottom-0 left-[6%] sm:left-[10%] pb-5 sm:pb-8 md:pb-10 px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "bottom-semi-left":
      "bottom-0 left-[6%] sm:left-[10%] pb-5 sm:pb-8 md:pb-10 px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "bottom-center":
      "bottom-0 inset-x-0 pb-5 sm:pb-8 md:pb-10 px-5 sm:px-12 text-center max-w-4xl mx-auto",
    "bottom-center-left":
      "bottom-0 inset-x-0 pb-5 sm:pb-8 md:pb-10 px-5 sm:px-12 text-left max-w-4xl mx-auto",
    "bottom-center-right":
      "bottom-0 inset-x-0 pb-5 sm:pb-8 md:pb-10 px-5 sm:px-12 text-right max-w-4xl mx-auto",
    "bottom-semiright":
      "bottom-0 right-[6%] sm:right-[10%] pb-5 sm:pb-8 md:pb-10 px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "bottom-semi-right":
      "bottom-0 right-[6%] sm:right-[10%] pb-5 sm:pb-8 md:pb-10 px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "bottom-semirigth":
      "bottom-0 right-[6%] sm:right-[10%] pb-5 sm:pb-8 md:pb-10 px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "bottom-right":
      "bottom-0 right-0 pb-5 sm:pb-8 md:pb-10 px-5 sm:px-12 text-right max-w-2xl sm:max-w-3xl ml-auto",

    // ================= HORIZONTAL ONLY SHORTHANDS =================
    left: "top-1/2 -translate-y-1/2 left-0 px-5 sm:px-12 text-left max-w-2xl sm:max-w-3xl",
    semileft:
      "top-1/2 -translate-y-1/2 left-[6%] sm:left-[10%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    "semi-left":
      "top-1/2 -translate-y-1/2 left-[6%] sm:left-[10%] px-5 sm:px-8 text-left max-w-2xl sm:max-w-3xl",
    semiright:
      "top-1/2 -translate-y-1/2 right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    "semi-right":
      "top-1/2 -translate-y-1/2 right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    semirigth:
      "top-1/2 -translate-y-1/2 right-[6%] sm:right-[10%] px-5 sm:px-8 text-right max-w-2xl sm:max-w-3xl ml-auto",
    right:
      "top-1/2 -translate-y-1/2 right-0 px-5 sm:px-12 text-right max-w-2xl sm:max-w-3xl ml-auto",
  };

  const hasExplicitPercentage =
    top !== undefined ||
    bottom !== undefined ||
    left !== undefined ||
    right !== undefined;

  const widthStyle =
    width && !width.startsWith("w-") && !width.startsWith("max-w-")
      ? { width }
      : {};
  const maxWidthStyle =
    maxWidth && !maxWidth.startsWith("max-w-") ? { maxWidth } : {};

  const widthClass =
    width && (width.startsWith("w-") || width.startsWith("max-w-"))
      ? width
      : "";
  const maxWidthClass =
    maxWidth && maxWidth.startsWith("max-w-") ? maxWidth : "";

  const computedStyle = {
    ...(top !== undefined && { top }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    ...widthStyle,
    ...maxWidthStyle,
    ...style,
  };

  const isTop =
    position.startsWith("top") ||
    position.startsWith("semi-top") ||
    position.startsWith("semitop") ||
    top !== undefined;
  const isBottom =
    position.startsWith("bottom") ||
    position.startsWith("semi-bottom") ||
    position.startsWith("semibottom") ||
    bottom !== undefined;

  const positionClass = hasExplicitPercentage
    ? "px-5 sm:px-12 max-w-3xl"
    : positionClasses[position] || positionClasses["top-center"];

  return (
    <>
      {/* Background Soft Gradient for Legibility */}
      {isTop && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 sm:h-48 md:h-52 bg-gradient-to-b from-white/90 via-white/50 to-transparent" />
      )}
      {isBottom && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 sm:h-48 md:h-52 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
      )}

      {/* Overlay Text Content — HIGH Z-INDEX (z-30) to always stay on top */}
      <div
        style={computedStyle}
        className={`
          absolute
          z-30
          ${positionClass}
          ${alignClass}
          ${spacingClasses}
          ${widthClass}
          ${maxWidthClass}
          ${className}
        `}
      >
        <h3 className="leading-snug tracking-tight">
          <span className={titleClassName}>{title} </span>
          {description && <span className={descClassName}>{description}</span>}
        </h3>
      </div>
    </>
  );
};

/* =========================================================
   INDIVIDUAL SEPARATE FEATURE COMPONENTS (1 to 7)
========================================================= */

// FEATURE 01: Careers. Courses. Colleges. (Video / Image)
export const FeatureCard1 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "top-center",
  align = "left",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Careers. Courses. Colleges. Entrance exams. And more.",
  description = "Everything students need to make informed education decisions.",
  video = impVedio,
  image = providedFeature1,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-bottom"
        />
      ) : (
        <img
          src={image || imgtest}
          alt={title}
          className="h-full w-full object-cover object-bottom"
        />
      )}
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);

// FEATURE 02: Know more about every student.
export const FeatureCard2 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "semitop-semiright",
  align = "center",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth = "520px",
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Know more about every student.",
  description = "Aptitude. Interests. Skills. Personality. Unlimited assessments with complete career reports.",
  image = providedFeature2,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);
// FEATURE 03: Go beyond the career. Find the right specialisation.
export const FeatureCard3 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "top-semiright",
  align = "right",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth = "570px",
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Go beyond the career. Find the right specialisation.",
  description = "346 assessments help students explore their fit within a chosen field.",
  image = providedFeature3,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);

// FEATURE 04: Career guidance grows stronger when schools build it in-house.
export const FeatureCard4 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "top-semiright",
  align = "right",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth = "580px",
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Career guidance grows stronger when schools build it in-house.",
  description = "A structured practitioner programme for counsellors and educators, with learning, practice and evaluation.",
  image = providedFeature4,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);

// FEATURE 05: Better decisions begin with better guidance.
export const FeatureCard5 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "top-semiright",
  align = "right",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth = "600px",

  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Better decisions begin with better guidance.",
  description = "Career counselling for students across career psychology, academic choices, applications and admissions.",
  image = providedFeature5,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);

// FEATURE 06: Career education. Ready for the classroom.
export const FeatureCard6 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "top-semiright",
  align = "right",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth = "550px",
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Career education. Ready for the classroom.",
  description = "Structured, grade-wise content designed to run on the school’s existing smart boards.",
  image = providedFeature6,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);

// FEATURE 07: Read. Explore. Decide with more confidence.
export const FeatureCard7 = ({
  isActive = true,
  onClick,
  cardRef,
  position = "top-center",
  align = "left",
  top,
  bottom,
  left,
  right,
  width,
  maxWidth,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  style,
  className = "",
  titleClassName,
  descClassName,
  title = "Read. Explore. Decide with more confidence.",
  description = "11 career readiness books and e-books designed around the decisions students make through school.",
  image = providedFeature7,
}) => (
  <FeatureCardWrapper isActive={isActive} onClick={onClick} cardRef={cardRef}>
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover object-bottom"
      />
    </div>
    <CardOverlayText
      title={title}
      description={description}
      position={position}
      align={align}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      maxWidth={maxWidth}
      pt={pt}
      pb={pb}
      pl={pl}
      pr={pr}
      px={px}
      py={py}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      mx={mx}
      my={my}
      style={style}
      className={className}
      titleClassName={titleClassName}
      descClassName={descClassName}
    />
  </FeatureCardWrapper>
);

/* =========================================================
   ALL FEATURE COMPONENTS LIST
========================================================= */
const featureCardComponents = [
  FeatureCard1,
  FeatureCard2,
  FeatureCard3,
  FeatureCard4,
  FeatureCard5,
  FeatureCard6,
  FeatureCard7,
];

/* =========================================================
   MAIN COMPONENT: TRANSFORM-BASED CAROUSEL
========================================================= */
const ProvidedFeatures = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const lastWidth = useRef(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // Play only when section is in viewport and user hasn't manually paused
  const isPlaying = isInView && !isUserPaused;

  // Observe when section enters/leaves viewport so it doesn't play prematurely
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Update track translateX position based on active card with rAF to prevent layout thrashing
  const updatePosition = useCallback(() => {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => {
      const container = containerRef.current;
      const activeCard = cardRefs.current[activeIndex];
      if (!container || !activeCard) return;

      const containerWidth = container.clientWidth;
      const cardWidth = activeCard.offsetWidth;
      const cardLeft = activeCard.offsetLeft;

      // Center active card inside container
      const offset = cardLeft - (containerWidth - cardWidth) / 2;
      setTranslateX(-offset);
    });
  }, [activeIndex]);

  useEffect(() => {
    updatePosition();

    // ResizeObserver on the container ensures accurate layout tracking on device rotations and viewport updates
    let ro = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      ro = new ResizeObserver(() => {
        updatePosition();
      });
      ro.observe(containerRef.current);
    }

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidth.current) > 2) {
        lastWidth.current = currentWidth;
        updatePosition();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", updatePosition, {
      passive: true,
    });

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updatePosition);
    };
  }, [updatePosition]);

  // Autoplay functionality: only runs when section is visible in viewport
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureCardComponents.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % featureCardComponents.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? featureCardComponents.length - 1 : prev - 1,
    );
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
  };

  // Mouse Drag Handlers for desktop
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - e.clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const togglePlay = () => {
    setIsUserPaused((prev) => !prev);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center bg-white py-8 sm:py-12 md:py-16 overflow-hidden select-none"
    >
      {/* HEADER */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-6 sm:mb-8 md:mb-10">
        <center>
          <h2
            className="
            mx-auto max-w-7xl
            text-[clamp(2.75rem,4vw,5rem)]
            font-semibold
            leading-[0.94]
            pt-5
            tracking-[-0.045em]
            text-[#1E1E1E]"
          >
            Highlights
          </h2>
        </center>
      </div>

      {/* TRANSFORM CAROUSEL CONTAINER WITH ABSOLUTE CONTROL BAR OVER THE CARDS */}
      <div className="relative w-full">
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-4"
        >
          <div
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
            }}
            className="
              flex
              gap-6
              sm:gap-8
              md:gap-10
              px-6
              sm:px-12
              lg:px-24
              w-max
              transition-transform
              duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]
              will-change-transform
            "
          >
            {featureCardComponents.map((FeatureComponent, idx) => (
              <FeatureComponent
                key={idx}
                cardRef={(el) => (cardRefs.current[idx] = el)}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* FLOATING CONTROL BAR (PAGINATION CAPSULE + PLAY/PAUSE TOGGLE) — BELOW IMAGE ON MOBILE, OVER CARD ON DESKTOP */}
        <div
          className="relative mt-4 sm:mt-0 sm:absolute sm:bottom-10 md:bottom-12 sm:left-1/2 sm:-translate-x-1/2 z-30 flex items-center justify-center gap-3 sm:gap-3.5 pointer-events-auto w-full sm:w-auto"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* DOTS PAGINATION CAPSULE */}
          <div className="bg-[#ececf0]/95 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-3.5 rounded-full flex items-center gap-2.5 sm:gap-3 shadow-lg shadow-black/10 border border-black/5">
            {featureCardComponents.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`
                  transition-all
                  duration-300
                  ease-out
                  cursor-pointer
                  ${
                    activeIndex === idx
                      ? "w-6 sm:w-7 h-1.5 rounded-full bg-[#636366]"
                      : "w-1.5 h-1.5 rounded-full bg-[#8e8e93] hover:bg-[#636366]"
                  }
                `}
              />
            ))}
          </div>

          {/* PLAY / PAUSE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              bg-[#ececf0]/95
              backdrop-blur-md
              hover:bg-[#e4e4e9]
              flex
              items-center
              justify-center
              text-[#1d1d1f]
              shadow-lg
              shadow-black/10
              border
              border-black/5
              transition-all
              duration-200
              cursor-pointer
            "
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 fill-current ml-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProvidedFeatures;
