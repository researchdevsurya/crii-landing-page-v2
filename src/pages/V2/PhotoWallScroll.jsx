import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

// Image imports from existing project assets
import d1 from "../../assets/d1.png";
import d2 from "../../assets/d2.png";
import d3 from "../../assets/d3.png";
import d4 from "../../assets/d4.png";
import d5 from "../../assets/d5.png";
import d6 from "../../assets/d6.png";
import d7 from "../../assets/d7.png";

import f1 from "../../assets/Feature/feature1.png";
import f2 from "../../assets/Feature/feature2.png";
import f3 from "../../assets/Feature/feature3.png";
import f4 from "../../assets/Feature/feature4.png";
import f5 from "../../assets/Feature/feature5.png";
import f6 from "../../assets/Feature/feature6.png";
import f7 from "../../assets/Feature/feature7.png";
import f8 from "../../assets/Feature/feature8.png";

import heroImg from "../../assets/heroimg.png";
import laptopImg from "../../assets/laptop.png";
import tabletImg from "../../assets/tablet.png";
import mobileImg from "../../assets/mobile.png";
import problemImg from "../../assets/problem-student-books.png";
import nocostImg from "../../assets/New/nocost.jpg";

// Card item definition
const row1Cards = [
  {
    id: "r1-1",
    src: d1,
    tag: "Innovation Hub",
    title: "AI & Deep Learning Labs",
    width: "w-[260px] md:w-[320px] lg:w-[380px]",
    parallaxY: [-15, 18],
    rotate: -0.8,
  },
  {
    id: "r1-2",
    src: f1,
    tag: "Robotics",
    title: "Autonomous Systems",
    width: "w-[220px] md:w-[270px] lg:w-[310px]",
    parallaxY: [12, -15],
    rotate: 0.6,
  },
  {
    id: "r1-3",
    src: d3,
    tag: "Research",
    title: "Advanced Quantum Computing",
    width: "w-[300px] md:w-[370px] lg:w-[440px]",
    parallaxY: [-18, 14],
    rotate: -0.5,
  },
  {
    id: "r1-4",
    src: f2,
    tag: "Excellence",
    title: "Hands-on Practical Labs",
    width: "w-[240px] md:w-[290px] lg:w-[340px]",
    parallaxY: [16, -18],
    rotate: 0.9,
  },
  {
    id: "r1-5",
    src: d5,
    tag: "Campus Life",
    title: "Collaborative Think Tanks",
    width: "w-[280px] md:w-[340px] lg:w-[400px]",
    parallaxY: [-12, 16],
    rotate: -0.6,
  },
];

const row2Cards = [
  {
    id: "r2-1",
    src: heroImg,
    tag: "Flagship",
    title: "Career Ready India Initiative",
    width: "w-[310px] md:w-[380px] lg:w-[450px]",
    parallaxY: [16, -18],
    rotate: 0.6,
  },
  {
    id: "r2-2",
    src: f5,
    tag: "Design Studio",
    title: "Human Centered Systems",
    width: "w-[230px] md:w-[280px] lg:w-[330px]",
    parallaxY: [-14, 15],
    rotate: -0.8,
  },
  {
    id: "r2-3",
    src: nocostImg,
    tag: "Spotlight",
    title: "Inclusive Tech Education",
    width: "w-[330px] md:w-[420px] lg:w-[490px]",
    isSpotlight: true,
    parallaxY: [10, -12],
    rotate: 0,
  },
  {
    id: "r2-4",
    src: d2,
    tag: "Analytics",
    title: "Big Data & Cloud Infra",
    width: "w-[250px] md:w-[310px] lg:w-[360px]",
    parallaxY: [-18, 16],
    rotate: 0.7,
  },
  {
    id: "r2-5",
    src: laptopImg,
    tag: "Interactive",
    title: "Virtual Reality Sandboxes",
    width: "w-[300px] md:w-[370px] lg:w-[430px]",
    parallaxY: [14, -16],
    rotate: -0.6,
  },
];

const row3Cards = [
  {
    id: "r3-1",
    src: tabletImg,
    tag: "Smart Classrooms",
    title: "Digital Interactive Learning",
    width: "w-[250px] md:w-[300px] lg:w-[350px]",
    parallaxY: [-15, 16],
    rotate: -0.6,
  },
  {
    id: "r3-2",
    src: f8,
    tag: "Prototyping",
    title: "IoT & Hardware Testing",
    width: "w-[290px] md:w-[360px] lg:w-[420px]",
    parallaxY: [14, -16],
    rotate: 0.7,
  },
  {
    id: "r3-3",
    src: d6,
    tag: "Alumni Network",
    title: "Global Career Trajectories",
    width: "w-[230px] md:w-[280px] lg:w-[330px]",
    parallaxY: [-16, 14],
    rotate: -0.8,
  },
  {
    id: "r3-4",
    src: problemImg,
    tag: "Case Studies",
    title: "Real-world Problem Solving",
    width: "w-[310px] md:w-[390px] lg:w-[460px]",
    parallaxY: [15, -14],
    rotate: 0.5,
  },
  {
    id: "r3-5",
    src: mobileImg,
    tag: "Mobile Ecosystem",
    title: "App Architecture & Scale",
    width: "w-[240px] md:w-[290px] lg:w-[340px]",
    parallaxY: [-12, 18],
    rotate: -0.7,
  },
];

function ParallaxPhotoCard({
  src,
  tag,
  title,
  width,
  parallaxY,
  rotate,
  isSpotlight,
  smoothProgress,
  heightClass = "h-[25vh] md:h-[27vh] lg:h-[29vh]",
}) {
  const cardY = useTransform(smoothProgress, [0, 1], parallaxY || [0, 0]);
  const cardRotate = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [rotate * 1.5, rotate, rotate * 0.5],
  );

  return (
    <motion.div
      style={{
        y: cardY,
        rotate: cardRotate,
      }}
      className={`
        relative
        ${width}
        ${heightClass}
        shrink-0
        rounded-2xl
        md:rounded-3xl
        overflow-hidden
        bg-neutral-100
        border
        border-neutral-200/80
        shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)]
        hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.18)]
        transition-shadow
        duration-500
        group
        cursor-pointer
        select-none
      `}
    >
      {/* Background Image */}
      <img
        src={src}
        alt={title}
        loading="lazy"
        draggable="false"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-108
        "
      />

      {/* Gentle ambient gradient for crisp readability */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/75
          via-black/20
          to-transparent
          opacity-70
          group-hover:opacity-90
          transition-opacity
          duration-300
        "
      />

      {/* Top Tag Pill */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span
          className="
            inline-flex
            items-center
            px-2.5
            py-1
            rounded-full
            text-[10px]
            md:text-[11px]
            font-medium
            tracking-wider
            uppercase
            bg-white/90
            text-neutral-900
            backdrop-blur-md
            shadow-sm
          "
        >
          {tag}
        </span>
      </div>

      {/* Bottom Title & Details */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 z-10 flex flex-col justify-end">
        <p className="text-white font-semibold text-sm md:text-base leading-snug drop-shadow-sm group-hover:translate-y-[-2px] transition-transform duration-300">
          {title}
        </p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15 text-[11px] text-white/70">
          <span>Explore detail</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhotoWallScroll() {
  const sectionRef = useRef(null);

  // Bind scroll progress directly to this pin section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Butter-smooth spring interpolation for mouse scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.35,
    restDelta: 0.0001,
  });

  // ----------------------------------------------------
  // 3 ROWS - GENTLE & LIGHT LEFT-SCROLLING
  // Light subtle drift that keeps cards nicely framed
  // without running off to the end
  // ----------------------------------------------------

  // Row 1: Gentle leftward glide
  const row1X = useTransform(smoothProgress, [0, 1], ["0%", "-16%"]);

  // Row 2: Subtle center glide
  const row2X = useTransform(smoothProgress, [0, 1], ["-2%", "-12%"]);

  // Row 3: Light lower glide
  const row3X = useTransform(smoothProgress, [0, 1], ["1%", "-18%"]);

  // Subtle parallax vertical breath
  const row1GlobalY = useTransform(smoothProgress, [0, 1], [0, -16]);
  const row2GlobalY = useTransform(smoothProgress, [0, 1], [0, 10]);
  const row3GlobalY = useTransform(smoothProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[190vh]
        bg-white
        text-neutral-900
      "
    >
      {/* ====================================================
          STICKY FULL-SCREEN VIEWPORT
      ==================================================== */}
      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
          bg-white
          flex
          flex-col
          justify-between
        "
      >
        {/* Subtle Luxury Ambient Background Texture */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]
            [background-size:24px_24px]
            opacity-60
          "
        />

        {/* Soft edge fade masks on left and right for seamless entrance/exit */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            w-16
            md:w-32
            z-30
            bg-gradient-to-r
            from-white
            via-white/70
            to-transparent
          "
        />
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            w-16
            md:w-32
            z-30
            bg-gradient-to-l
            from-white
            via-white/70
            to-transparent
          "
        />

        {/* ==================================================
            TOP NAVIGATION & EDITORIAL BAR
        ================================================== */}

        {/* ==================================================
            CENTER: 3 ASYNCHRONOUS HORIZONTAL PARALLAX ROWS
        ================================================== */}
        <div
          className="
            relative
            w-full
            flex-1
            flex
            flex-col
            justify-center
            gap-3
            md:gap-4
            lg:gap-5
            py-2
            overflow-hidden
            z-20
          "
        >
          {/* ------------------------------------------------
              ROW 1 - Asynchronously scrolling LEFT
          ------------------------------------------------ */}
          <motion.div
            style={{
              x: row1X,
              y: row1GlobalY,
            }}
            className="
              flex
              items-center
              gap-3.5
              md:gap-5
              w-max
              will-change-transform
            "
          >
            {row1Cards.map((item) => (
              <ParallaxPhotoCard
                key={item.id}
                src={item.src}
                tag={item.tag}
                title={item.title}
                width={item.width}
                parallaxY={item.parallaxY}
                rotate={item.rotate}
                smoothProgress={smoothProgress}
                heightClass="h-[23vh] md:h-[25vh] lg:h-[26vh]"
              />
            ))}
          </motion.div>

          {/* ------------------------------------------------
              ROW 2 - Asynchronously scrolling LEFT (Spotlight Row)
          ------------------------------------------------ */}
          <motion.div
            style={{
              x: row2X,
              y: row2GlobalY,
            }}
            className="
              flex
              items-center
              gap-3.5
              md:gap-5
              w-max
              will-change-transform
            "
          >
            {row2Cards.map((item) => (
              <ParallaxPhotoCard
                key={item.id}
                src={item.src}
                tag={item.tag}
                title={item.title}
                width={item.width}
                parallaxY={item.parallaxY}
                rotate={item.rotate}
                isSpotlight={item.isSpotlight}
                smoothProgress={smoothProgress}
                heightClass="h-[27vh] md:h-[30vh] lg:h-[32vh]"
              />
            ))}
          </motion.div>

          {/* ------------------------------------------------
              ROW 3 - Asynchronously scrolling LEFT
          ------------------------------------------------ */}
          <motion.div
            style={{
              x: row3X,
              y: row3GlobalY,
            }}
            className="
              flex
              items-center
              gap-3.5
              md:gap-5
              w-max
              will-change-transform
            "
          >
            {row3Cards.map((item) => (
              <ParallaxPhotoCard
                key={item.id}
                src={item.src}
                tag={item.tag}
                title={item.title}
                width={item.width}
                parallaxY={item.parallaxY}
                rotate={item.rotate}
                smoothProgress={smoothProgress}
                heightClass="h-[22vh] md:h-[24vh] lg:h-[25vh]"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
