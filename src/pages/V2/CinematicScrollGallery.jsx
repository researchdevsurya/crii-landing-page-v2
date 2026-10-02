
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";

/*
  Replace these imports with your own images.

  Example:
  import img1 from "../assets/01.jpg";
  import img2 from "../assets/02.jpg";
*/

import img1 from "../../assets/d1.png";
import img2 from "../../assets/d1.png";
import img3 from "../../assets/d1.png";
import img4 from "../../assets/d1.png";
import img5 from "../../assets/d1.png";
import img6 from "../../assets/d1.png";
import img7 from "../../assets/d1.png";
import img8 from "../../assets/d1.png";
import img9 from "../../assets/d1.png";
import img10 from "../../assets/d1.png";
import img11 from "../../assets/d1.png";
import img12 from "../../assets/d1.png";

const slides = [
    {
        type: "image",
        image: img1,
        number: "01",
        category: "DISCOVER",
        title: "Every learner has a direction.",
        description:
            "The journey begins by understanding interests, strengths and possibilities.",
    },

    {
        type: "image",
        image: img2,
        number: "02",
        category: "EXPLORE",
        title: "Look beyond what you already know.",
        description:
            "Explore pathways, opportunities and careers that may not be visible at first.",
    },

    {
        type: "collage",
        number: "03",
        category: "POSSIBILITIES",
        title: "More possibilities. More perspectives.",
        description:
            "A wider view helps students understand the many directions available to them.",
        images: [img3, img4, img5],
    },

    {
        type: "image",
        image: img6,
        number: "04",
        category: "UNDERSTAND",
        title: "Know yourself better.",
        description:
            "Meaningful choices begin with a better understanding of who you are.",
    },

    {
        type: "collage",
        number: "05",
        category: "PATHWAYS",
        title: "Different paths can lead somewhere meaningful.",
        description:
            "There is no single definition of success.",
        images: [img7, img8, img9],
    },

    {
        type: "image",
        image: img10,
        number: "06",
        category: "DECIDE",
        title: "Turn information into confidence.",
        description:
            "Good information can make important decisions feel less overwhelming.",
    },

    {
        type: "image",
        image: img11,
        number: "07",
        category: "PREPARE",
        title: "Build towards the future.",
        description:
            "Preparation connects today's learning with tomorrow's opportunities.",
    },

    {
        type: "image",
        image: img12,
        number: "08",
        category: "READY",
        title: "Ready for what comes next.",
        description:
            "A clearer direction gives every learner a stronger starting point.",
    },
];

function ImageSlide({ slide, index, progress }) {
    const imageY = useTransform(
        progress,
        [0, 0.5, 1],
        [100, 0, -100]
    );

    const imageScale = useTransform(
        progress,
        [0, 0.35, 0.75, 1],
        [0.82, 1, 1, 0.92]
    );

    const imageRotate = useTransform(
        progress,
        [0, 0.45, 1],
        [2, 0, -1.5]
    );

    const opacity = useTransform(
        progress,
        [0, 0.18, 0.75, 1],
        [0, 1, 1, 0]
    );

    const blur = useTransform(
        progress,
        [0, 0.25, 0.8, 1],
        [8, 0, 0, 5]
    );

    const textY = useTransform(
        progress,
        [0, 0.35, 0.75, 1],
        [60, 0, 0, -50]
    );

    const textOpacity = useTransform(
        progress,
        [0, 0.2, 0.75, 1],
        [0, 1, 1, 0]
    );

    return (
        <div className="absolute inset-0 flex items-center justify-center px-5 md:px-10">

            {/* IMAGE */}
            <motion.div
                style={{
                    y: imageY,
                    scale: imageScale,
                    rotate: imageRotate,
                    opacity,
                    filter: useTransform(blur, (v) => `blur(${v}px)`),
                }}
                className="
          absolute
          z-10
          w-[88vw]
          max-w-[1050px]
          h-[55vh]
          md:h-[68vh]
          overflow-hidden
          rounded-[18px]
          md:rounded-[28px]
          shadow-2xl
        "
            >
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="
            w-full
            h-full
            object-cover
          "
                    draggable="false"
                />

                {/* subtle overlay */}
                <div className="absolute inset-0 bg-black/[0.04]" />
            </motion.div>

            {/* TEXT */}
            <motion.div
                style={{
                    y: textY,
                    opacity: textOpacity,
                }}
                className="
          absolute
          z-20
          left-6
          md:left-[7vw]
          bottom-[8vh]
          md:bottom-[10vh]
          max-w-[430px]
        "
            >
                <div className="mb-3 flex items-center gap-3">

                    <span className="text-[10px] md:text-xs tracking-[0.25em] font-medium text-white/70">
                        {slide.category}
                    </span>

                    <span className="h-px w-8 bg-white/40" />

                    <span className="text-[10px] md:text-xs text-white/60">
                        {slide.number}
                    </span>

                </div>

                <h2 className="
          text-3xl
          md:text-5xl
          lg:text-6xl
          font-medium
          tracking-[-0.04em]
          leading-[0.95]
          text-white
        ">
                    {slide.title}
                </h2>

                <p className="
          mt-5
          max-w-[360px]
          text-sm
          md:text-base
          leading-relaxed
          text-white/65
        ">
                    {slide.description}
                </p>
            </motion.div>
        </div>
    );
}


function CollageSlide({ slide, progress }) {

    const opacity = useTransform(
        progress,
        [0, 0.18, 0.78, 1],
        [0, 1, 1, 0]
    );

    const containerScale = useTransform(
        progress,
        [0, 0.4, 0.8, 1],
        [0.88, 1, 1, 0.93]
    );

    const image1X = useTransform(
        progress,
        [0, 0.5, 1],
        [-100, 0, 50]
    );

    const image1Y = useTransform(
        progress,
        [0, 0.5, 1],
        [70, 0, -60]
    );

    const image2X = useTransform(
        progress,
        [0, 0.5, 1],
        [100, 0, -70]
    );

    const image2Y = useTransform(
        progress,
        [0, 0.5, 1],
        [-70, 0, 80]
    );

    const image3X = useTransform(
        progress,
        [0, 0.5, 1],
        [70, 0, -50]
    );

    const image3Y = useTransform(
        progress,
        [0, 0.5, 1],
        [100, 0, -70]
    );

    const textY = useTransform(
        progress,
        [0, 0.4, 0.8, 1],
        [70, 0, 0, -50]
    );

    return (
        <div className="absolute inset-0">

            {/* COLLAGE */}
            <motion.div
                style={{
                    scale: containerScale,
                    opacity,
                }}
                className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
            >

                {/* IMAGE 1 */}
                <motion.div
                    style={{
                        x: image1X,
                        y: image1Y,
                    }}
                    className="
            absolute
            w-[42vw]
            max-w-[430px]
            h-[47vh]
            md:h-[58vh]
            left-[8%]
            md:left-[14%]
            top-[18%]
            overflow-hidden
            rounded-[14px]
            md:rounded-[20px]
            shadow-2xl
            z-10
          "
                >
                    <img
                        src={slide.images[0]}
                        className="w-full h-full object-cover"
                        alt=""
                        draggable="false"
                    />
                </motion.div>

                {/* IMAGE 2 */}
                <motion.div
                    style={{
                        x: image2X,
                        y: image2Y,
                    }}
                    className="
            absolute
            w-[38vw]
            max-w-[390px]
            h-[38vh]
            md:h-[48vh]
            right-[8%]
            md:right-[15%]
            top-[12%]
            overflow-hidden
            rounded-[14px]
            md:rounded-[20px]
            shadow-2xl
            z-20
          "
                >
                    <img
                        src={slide.images[1]}
                        className="w-full h-full object-cover"
                        alt=""
                        draggable="false"
                    />
                </motion.div>

                {/* IMAGE 3 */}
                <motion.div
                    style={{
                        x: image3X,
                        y: image3Y,
                    }}
                    className="
            absolute
            w-[35vw]
            max-w-[350px]
            h-[32vh]
            md:h-[40vh]
            right-[25%]
            md:right-[27%]
            bottom-[8%]
            overflow-hidden
            rounded-[14px]
            md:rounded-[20px]
            shadow-2xl
            z-30
          "
                >
                    <img
                        src={slide.images[2]}
                        className="w-full h-full object-cover"
                        alt=""
                        draggable="false"
                    />
                </motion.div>

            </motion.div>

            {/* TEXT */}
            <motion.div
                style={{
                    y: textY,
                    opacity,
                }}
                className="
          absolute
          z-40
          left-6
          md:left-[7vw]
          bottom-[8vh]
          max-w-[430px]
        "
            >
                <div className="mb-3 flex items-center gap-3">

                    <span className="text-[10px] md:text-xs tracking-[0.25em] text-white/70">
                        {slide.category}
                    </span>

                    <span className="h-px w-8 bg-white/40" />

                    <span className="text-[10px] md:text-xs text-white/60">
                        {slide.number}
                    </span>

                </div>

                <h2 className="
          text-3xl
          md:text-5xl
          lg:text-6xl
          font-medium
          tracking-[-0.04em]
          leading-[0.95]
          text-white
        ">
                    {slide.title}
                </h2>

                <p className="
          mt-5
          max-w-[360px]
          text-sm
          md:text-base
          leading-relaxed
          text-white/65
        ">
                    {slide.description}
                </p>
            </motion.div>

        </div>
    );
}


export default function CinematicScrollGallery() {

    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        mass: 0.4,
    });

    return (
        <section
            ref={containerRef}
            className="
        relative
        h-[800vh]
        bg-[#0b0b0b]
      "
        >

            {/* STICKY VIEWPORT */}
            <div className="
        sticky
        top-0
        h-screen
        w-full
        overflow-hidden
      ">

                {/* Background */}
                <div className="absolute inset-0 bg-[#0b0b0b]" />

                {/* subtle background glow */}
                <motion.div
                    style={{
                        opacity: useTransform(
                            smoothProgress,
                            [0, 0.5, 1],
                            [0.25, 0.5, 0.2]
                        ),
                    }}
                    className="
            absolute
            w-[60vw]
            h-[60vw]
            rounded-full
            bg-white/[0.035]
            blur-[120px]
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
          "
                />

                {/* Slides */}
                {slides.map((slide, index) => {

                    const start = index / slides.length;
                    const end = (index + 1) / slides.length;

                    const slideProgress = useTransform(
                        smoothProgress,
                        [start, start + (end - start) * 0.18, end - (end - start) * 0.18, end],
                        [0, 0.35, 0.75, 1]
                    );

                    const slideOpacity = useTransform(
                        smoothProgress,
                        [
                            start,
                            start + (end - start) * 0.12,
                            end - (end - start) * 0.12,
                            end,
                        ],
                        [0, 1, 1, 0]
                    );

                    return (
                        <motion.div
                            key={index}
                            style={{
                                opacity: slideOpacity,
                                zIndex: index,
                            }}
                            className="absolute inset-0"
                        >

                            {slide.type === "image" ? (
                                <ImageSlide
                                    slide={slide}
                                    index={index}
                                    progress={slideProgress}
                                />
                            ) : (
                                <CollageSlide
                                    slide={slide}
                                    progress={slideProgress}
                                />
                            )}

                        </motion.div>
                    );
                })}

                {/* TOP LABEL */}
                <div className="
          absolute
          z-[100]
          top-6
          md:top-8
          left-6
          md:left-10
          text-[10px]
          md:text-xs
          tracking-[0.25em]
          text-white/50
        ">
                    CAREER READY INDIA
                </div>

                {/* PROGRESS */}
                <div className="
          absolute
          z-[100]
          right-5
          md:right-10
          top-1/2
          -translate-y-1/2
          flex
          flex-col
          items-center
          gap-3
        ">

                    {slides.map((slide, index) => {

                        const start = index / slides.length;
                        const end = (index + 1) / slides.length;

                        const active = useTransform(
                            smoothProgress,
                            [start, start + 0.001, end - 0.001, end],
                            [0.25, 1, 1, 0.25]
                        );

                        const height = useTransform(
                            smoothProgress,
                            [start, start + 0.001, end - 0.001, end],
                            [10, 24, 24, 10]
                        );

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    opacity: active,
                                    height,
                                }}
                                className="
                  w-[2px]
                  bg-white
                  rounded-full
                "
                            />
                        );
                    })}

                </div>

                {/* COUNTER */}
                <div className="
          absolute
          z-[100]
          bottom-6
          md:bottom-8
          right-6
          md:right-10
          text-xs
          tracking-[0.15em]
          text-white/50
        ">
                    <motion.span>
                        {slides.length.toString().padStart(2, "0")}
                    </motion.span>

                    <span className="mx-2">/</span>

                    <span>
                        {slides.length.toString().padStart(2, "0")}
                    </span>
                </div>

                {/* SCROLL INDICATOR */}
                <motion.div
                    style={{
                        opacity: useTransform(
                            smoothProgress,
                            [0, 0.05],
                            [1, 0]
                        ),
                    }}
                    className="
            absolute
            z-[100]
            bottom-6
            md:bottom-8
            left-1/2
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-2
          "
                >
                    <span className="
            text-[9px]
            tracking-[0.3em]
            text-white/40
          ">
                        SCROLL
                    </span>

                    <div className="
            w-px
            h-8
            bg-gradient-to-b
            from-white/60
            to-transparent
          " />
                </motion.div>

            </div>
        </section>
    );
}

