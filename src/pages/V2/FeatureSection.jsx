import React, { useEffect, useRef, useState } from "react";

/* =========================================================
   IMAGES
========================================================= */

import feature1 from "../../assets/Feature/feature1.png";
import feature2 from "../../assets/Feature/feature2.png";
import feature3 from "../../assets/Feature/feature3.png";
import feature4 from "../../assets/Feature/feature4.png";
import feature5 from "../../assets/Feature/feature5.png";
import feature6 from "../../assets/Feature/feature6.png";
import feature7 from "../../assets/Feature/feature7.png";
import feature8 from "../../assets/Feature/feature8.png";
import feature9 from "../../assets/Feature/feature9.png";
import feature10 from "../../assets/Feature/feature10.png";
import phoneFrame from "../../assets/Feature/image_placeholder_phone.png";

/* =========================================================
   CAREER READY PROCESS
========================================================= */

const processFeatures = [
  {
    number: "01",
    eyebrow: "So Much to Explore",
    headline: <>Easier to decide.</>,
    title: "Explore before you decide",
    descriptions: [
      "For every education decision.",
      "Search careers, courses, colleges and education pathways from one connected platform. Go beyond basic listings to understand fees, entrance requirements, career outcomes, placements and other factors that matter, helping students move from endless options to a more informed shortlist.",
    ],
    images: [feature1, feature1],
  },

  // {
  //   number: "02",
  //   title: "Field Specialisation Assessment",
  //   description:
  //     "A structured assessment of aptitude, interest, skills and personality to help every student understand their strengths and discover suitable career directions.",
  //   image: feature2,
  // },

  // Self Career Discovery — helps students explore careers, specialisations,
  // and connected education pathways before deciding what to pursue.
  {
    number: "09",
    title: "Curiosity has somewhere to go",
    description:
      "Students can independently explore careers, specialisations and the education pathways connected to them. Follow areas that spark interest, understand what different career directions actually involve, and keep exploring until possibilities begin to turn into clearer choices worth investigating further.",
    image: feature5,
  },

  // University Reviews — brings together news, opinions, discussions, and
  // public conversations to help students understand universities beyond brochures.
  {
    number: "10",
    title: "See the university beyond the brochure",
    description:
      "Students can explore universities through a wider range of perspectives, bringing together news, comments and public conversations from sources such as Reddit, Quora, X/Twitter, The Times of India, Hindustan Times, The Hindu and more. See what people are saying, understand different experiences, and build a broader picture before shortlisting a university.",
    image: feature6,
  },

  // ROI Calculator — helps students and families compare education costs
  // with potential career outcomes and understand the financial side of a degree.
  {
    number: "11",
    title: "Know what the degree costs. Understand what it could return.",
    description:
      "Students and families can look at the financial side of an education decision by comparing the cost of studying with potential career outcomes. Explore the relationship between fees, education choices and possible returns, giving you another useful lens for deciding whether a course and college fit your plans.",
    image: feature7,
  },

  // Virtual Internships — gives students a practical way to experience the
  // type of work, problems, and environments associated with different careers.
  {
    number: "12",
    title: "Experience the career before choosing the career",
    description:
      "Students can get closer to the reality of different professions through virtual internships. Explore the kinds of tasks, problems and working environments found across different careers, and get a sense of what the work may actually feel like before making an education decision around it.",
    image: feature8,
  },

  // Entrance Exams — helps students discover which entrance examinations
  // are relevant to specific courses, colleges, and career pathways.
  {
    number: "13",
    title: "Know which exams can take you where you want to go",
    description:
      "Students can explore entrance examinations connected to different courses, colleges and career pathways. Understand what each exam is for, where it is accepted and which education options it can open up, so preparation starts with clarity instead of last-minute discovery.",
    image: feature9,
  },

  // Rankings — gives students ranking information as one part of a broader
  // college comparison instead of treating a ranking as the final decision.
  {
    number: "14",
    title: "Rankings are useful when you understand what they mean",
    description:
      "Students can explore college rankings alongside the wider information needed to evaluate an institution. Use rankings as one useful input while comparing colleges, courses and education options, rather than letting a single number become the final answer.",
    image: feature10,
  },
];

/* =========================================================
   FEATURE ACCESSORS
========================================================= */

const getFeatureImages = (feature) => {
  if (Array.isArray(feature.images) && feature.images.length > 0) {
    return feature.images;
  }

  if (Array.isArray(feature.image)) {
    return feature.image;
  }

  return feature.image ? [feature.image] : [];
};

const getFeatureDescriptions = (feature) => {
  if (Array.isArray(feature.descriptions) && feature.descriptions.length > 0) {
    return feature.descriptions;
  }

  if (Array.isArray(feature.description)) {
    return feature.description;
  }

  return feature.description ? [feature.description] : [];
};

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}

        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const CareerReadyFeatures = () => {
  const sectionRef = useRef(null);

  const [activeFeature, setActiveFeature] = useState(0);

  const [activeSubIndex, setActiveSubIndex] = useState(0);

  /* =====================================================
     CENTER ACTIVATED SCROLL
  ===================================================== */

  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;

        const section = sectionRef.current;

        if (!section) return;

        const items = Array.from(section.querySelectorAll("[data-feature]"));

        if (!items.length) return;

        const viewportCenter = window.innerHeight * 0.5;

        let closestItem = null;
        let minDistance = Infinity;

        items.forEach((el) => {
          const rect = el.getBoundingClientRect();

          const itemCenter = rect.top + rect.height / 2;

          const distance = Math.abs(itemCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestItem = el;
          }
        });

        if (closestItem) {
          const fIndex = Number(closestItem.dataset.feature);

          const sIndex = Number(closestItem.dataset.sub || 0);

          setActiveFeature(fIndex);

          setActiveSubIndex(sIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const currentFeature = processFeatures[activeFeature] || processFeatures[0];
  const currentFeatureImages = getFeatureImages(currentFeature);
  const currentActiveImg =
    currentFeatureImages[activeSubIndex] || currentFeatureImages[0] || feature1;

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        bg-white
        text-neutral-900
      "
    >
      {/* =================================================
          PROCESS SECTION
      ================================================= */}

      <section className="bg-white">
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            lg:px-10
          "
        >
          {/* =================================================
              DESKTOP PROCESS
          ================================================= */}

          <div
            className="
              hidden
              lg:grid
              lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
              lg:gap-20
            "
          >
            {/* =================================================
                LEFT STICKY IMAGE
            ================================================= */}

            <div>
              <div
                className="
                  sticky
                  top-0
                  flex
                  h-screen
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    relative
                    w-full
                    max-w-[340px]
                    sm:max-w-[380px]
                    lg:max-w-[400px]
                    mx-auto
                  "
                >
                  {/* PHONE CONTAINER */}
                  <div
                    className="
                      relative
                      aspect-[941/1672]
                      w-full
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {/* 1 REAL IMAGE BEHIND - CONSTRAINED WITH PADDING ON ALL SIDES */}
                    <div className="absolute top-[4%] bottom-[5%] left-[8.5%] right-[8.5%] px-1.5 sm:px-2.5 lg:px-4 rounded-[32px] sm:rounded-[44px] lg:rounded-[48px] overflow-hidden bg-white z-0 flex items-center justify-center">
                      <img
                        key={`desktop-active-${activeFeature}-${activeSubIndex}`}
                        src={currentActiveImg}
                        alt={currentFeature?.title || "Feature Screenshot"}
                        className="h-full w-full object-contain object-center transition-all duration-500 ease-out rounded-[20px] sm:rounded-[28px]"
                      />
                    </div>

                    {/* 1 PHONE OVERLAY IMAGE AT TOP */}
                    <img
                      src={phoneFrame}
                      alt="Phone Mockup Frame"
                      className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.16)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                DESKTOP RIGHT TEXT
            ================================================= */}

            <div
              className="
                pt-[30vh]
                pb-[35vh]
              "
            >
              {processFeatures.map((feature, fIndex) => {
                const descriptions = getFeatureDescriptions(feature);

                return (
                  <article key={feature.number || fIndex}>
                    {descriptions.map((desc, dIndex) => {
                      const isActive =
                        activeFeature === fIndex && activeSubIndex === dIndex;

                      return (
                        <div
                          key={dIndex}
                          data-feature={fIndex}
                          data-sub={dIndex}
                          className="
                                min-h-[48vh]
                                flex
                                items-center
                                py-12
                              "
                        >
                          <div
                            className="
                                  w-full
                                  max-w-2xl
                                "
                          >
                            {feature.headline && dIndex === 0 ? (
                              <div
                                className={`
                                  max-w-xl
                                  transition-all
                                  duration-700
                                  ease-out
                                  ${
                                    isActive
                                      ? "translate-y-0 opacity-100"
                                      : "translate-y-[4px] opacity-35"
                                  }
                                `}
                              >
                                {feature.eyebrow && (
                                  <p className="mb-3 text-base sm:text-lg md:text-3xl font-semibold tracking-tight text-neutral-900">
                                    {feature.eyebrow}
                                  </p>
                                )}
                                <h3 className="mb-6 text-4xl sm:text-5xl md:text-8xl font-bold leading-[1.02] tracking-[-0.035em] text-[#5856D6]">
                                  {feature.headline}
                                </h3>
                                <p className="max-w-xl text-xl sm:text-2xl lg:text-[28px] leading-[1.4] tracking-[-0.02em] font-normal text-neutral-500">
                                  {desc}
                                </p>
                              </div>
                            ) : (
                              <p
                                className={`
                                      max-w-xl
                                      text-xl
                                      sm:text-2xl
                                      lg:text-[20px]
                                      leading-[1.4]
                                      tracking-[-0.02em]

                                      transition-all
                                      duration-700
                                      ease-out

                                      ${
                                        isActive
                                          ? "translate-y-0 opacity-100"
                                          : "translate-y-[4px] opacity-35"
                                      }
                                    `}
                              >
                                {dIndex === 0 && (
                                  <span className="font-semibold text-neutral-900">
                                    {feature.title}.{" "}
                                  </span>
                                )}
                                <span className="font-normal text-neutral-500">
                                  {desc}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </article>
                );
              })}
            </div>
          </div>

          {/* =================================================
              MOBILE PROCESS

              TEXT = NORMAL SCROLL
              IMAGE = STICKY BOTTOM
          ================================================= */}

          <div
            className="
              block
              lg:hidden
              relative
            "
          >
            {/* =================================================
                MOBILE SCROLLING TEXT
            ================================================= */}

            <div
              className="
                pt-8
                pb-[45vh]
                px-3
              "
            >
              {processFeatures.map((feature, fIndex) => {
                const descriptions = getFeatureDescriptions(feature);

                return (
                  <article
                    key={feature.number || fIndex}
                    className="
                        border-b
                        border-neutral-100/70
                        last:border-0
                      "
                  >
                    {descriptions.map((desc, dIndex) => {
                      const isActive =
                        activeFeature === fIndex && activeSubIndex === dIndex;

                      return (
                        <div
                          key={dIndex}
                          data-feature={fIndex}
                          data-sub={dIndex}
                          className="
                                min-h-[40vh]
                                flex
                                flex-col
                                justify-center
                                py-10
                              "
                        >
                          <div className="w-full">
                            {feature.headline && dIndex === 0 ? (
                              <div
                                className={`
                                  transition-all
                                  duration-500
                                  ease-out
                                  ${
                                    isActive
                                      ? "translate-y-0 opacity-100"
                                      : "translate-y-[4px] opacity-35"
                                  }
                                `}
                              >
                                {feature.eyebrow && (
                                  <p className="mb-2 text-xs sm:text-sm font-semibold tracking-tight text-neutral-900">
                                    {feature.eyebrow}
                                  </p>
                                )}
                                <h3 className="mb-4 text-3xl sm:text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-[#5856D6]">
                                  {feature.headline}
                                </h3>
                                <p className="text-lg sm:text-xl leading-[1.5] tracking-[-0.015em] font-normal text-neutral-500">
                                  {desc}
                                </p>
                              </div>
                            ) : (
                              <p
                                className={`
                                      text-lg
                                      sm:text-xl
                                      leading-[1.5]
                                      tracking-[-0.015em]

                                      transition-all
                                      duration-500
                                      ease-out

                                      ${
                                        isActive
                                          ? "translate-y-0 opacity-100"
                                          : "translate-y-[4px] opacity-35"
                                      }
                                    `}
                              >
                                {dIndex === 0 && (
                                  <span className="font-semibold text-neutral-900">
                                    {feature.title}.{" "}
                                  </span>
                                )}
                                <span className="font-normal text-neutral-500">
                                  {desc}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </article>
                );
              })}
            </div>

            {/* =================================================
                MOBILE STICKY BOTTOM IMAGE
            ================================================= */}

            <div
              className="
                sticky
                bottom-0
                z-20

                pointer-events-none

                bg-white

                pt-3
                pb-3
                sm:pb-5
              "
            >
              {/* Soft opacity gradient fade overlay above the phone so text dissolves seamlessly into the white background */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -top-16
                  sm:-top-20
                  inset-x-0
                  h-16
                  sm:h-20
                  bg-gradient-to-t
                  from-white
                  via-white/85
                  to-transparent
                  pointer-events-none
                "
              />
              <div
                className="
                  relative
                  h-[44vh]
                  max-h-[420px]
                  aspect-[941/1672]
                  mx-auto
                  px-2
                  flex
                  items-center
                  justify-center
                "
              >
                {/* 1 REAL IMAGE BEHIND - CONSTRAINED WITH PADDING ON ALL SIDES */}
                <div className="absolute top-[4%] bottom-[5%] left-[8.5%] right-[8.5%] p-2 sm:p-3 rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white z-0 flex items-center justify-center">
                  <img
                    key={`mobile-active-${activeFeature}-${activeSubIndex}`}
                    src={currentActiveImg}
                    alt={currentFeature?.title || "Feature Screenshot"}
                    className="h-full w-full object-contain object-center transition-all duration-500 ease-out rounded-[16px] sm:rounded-[22px]"
                  />
                </div>

                {/* 1 PHONE OVERLAY IMAGE AT TOP */}
                <img
                  src={phoneFrame}
                  alt="Phone Mockup Frame"
                  className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CareerReadyFeatures;

export { default as SchoolBenefitsSection } from "./SchoolBenefitsSection";
