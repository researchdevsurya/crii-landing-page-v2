import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const capabilities = [
  {
    n: "01",
    title: "Assessment infrastructure",
    short: "Assess • Understand • Plan",
    desc: "Every student gets a structured self-assessment, mapped to real education and career paths, before any college conversation begins.",
    image:
      "https://crii-live.s3.ap-south-1.amazonaws.com/cri/top1.png",
    color: "blue",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0112 4.5h-1.5"
        />
      </svg>
    ),
  },

  {
    n: "02",
    title: "One connected platform",
    short: "One Platform • Infinite Possibilities",
    desc: "Unlimited student assessments and learning resources, live under a single school login — nothing to re-issue every term.",
    image:
      "https://crii-live.s3.ap-south-1.amazonaws.com/cri/top2.png",
    color: "orange",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 6h1.5A2.25 2.25 0 006.75 15.75M4.5 15.75A2.25 2.25 0 012.25 13.5v-3A2.25 2.25 0 014.5 8.25h12a2.25 2.25 0 012.25 2.25v3A2.25 2.25 0 0116.5 15.75H8.25A2.25 2.25 0 016 18"
        />
      </svg>
    ),
  },

  {
    n: "03",
    title: "Trained counsellors",
    short: "Trained • Trusted • Always There",
    desc: "Your counselling staff complete formal training and get ongoing professional support, not a one-time workshop.",
    image:
      "https://crii-live.s3.ap-south-1.amazonaws.com/cri/top3.png",
    color: "green",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },

  {
    n: "04",
    title: "Application guidance",
    short: "Self-Discovery → Submission",
    desc: "Dedicated support carries students from self-discovery through to submitted college applications.",
    image:
      "https://crii-live.s3.ap-south-1.amazonaws.com/cri/top4.png",
    color: "purple",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-5 w-5 sm:h-6 sm:w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25"
        />
      </svg>
    ),
  },
];

const themes = {
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    soft: "bg-blue-50",
    border: "border-blue-100",
    glow: "bg-blue-300",
    hoverBorder: "group-hover:border-blue-300",
    hoverShadow: "hover:shadow-blue-500/20",
  },

  orange: {
    text: "text-orange-600",
    bg: "bg-orange-500",
    soft: "bg-orange-50",
    border: "border-orange-100",
    glow: "bg-orange-300",
    hoverBorder: "group-hover:border-orange-300",
    hoverShadow: "hover:shadow-orange-500/20",
  },

  green: {
    text: "text-emerald-600",
    bg: "bg-emerald-500",
    soft: "bg-emerald-50",
    border: "border-emerald-100",
    glow: "bg-emerald-300",
    hoverBorder: "group-hover:border-emerald-300",
    hoverShadow: "hover:shadow-emerald-500/20",
  },

  purple: {
    text: "text-violet-600",
    bg: "bg-violet-600",
    soft: "bg-violet-50",
    border: "border-violet-100",
    glow: "bg-violet-300",
    hoverBorder: "group-hover:border-violet-300",
    hoverShadow: "hover:shadow-violet-500/20",
  },
};

function ParallaxImage({ src, alt }) {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    if (!wrapper || !image) return;

    let rafId;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom > -100 && rect.top < viewportHeight + 100) {
        const center = rect.top + rect.height / 2;
        const distance = center - viewportHeight / 2;
        const movement = Math.max(-15, Math.min(15, -distance * 0.05));
        image.style.transform = `translate3d(0, ${movement}px, 0) scale(1.05)`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="
          absolute inset-0 h-full w-full
          object-cover transition-transform duration-700 ease-out
          will-change-transform group-hover:scale-110
        "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/5 to-transparent mix-blend-multiply" />
    </div>
  );
}

export default function ProgrammeIntro() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* =========================================================
          BACKGROUND EFFECTS
      ========================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft glowing orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-50/60 blur-[100px]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-9xl mx-auto px-6 md:px-12">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div data-aos="fade-up" className="max-w-3xl mx-auto text-center mb-20">


          <h2 className="   mx-auto
        text-[24px]
        sm:text-[42px]
        md:text-[45px]
        lg:text-[48px]
        xl:text-[50px]
        font-medium
        tracking-[-0.045em]
        leading-[1.04]
        text-slate-800 mb-6">
            A stronger support system <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 via-blue-700 to-blue-800">
              for every student
            </span>
          </h2>

          <p className="  text-base
          sm:text-lg
          md:text-xl
          lg:text-[21px]
          leading-[1.75]
          text-slate-500">
            Career Ready India equips schools with everything they need to make every student career ready — a capability that stays in the building.
          </p>
        </div>

        {/* =========================================================
            CARDS GRID
        ========================================================= */}
        <div className="flex flex-wrap justify-center gap-6 xl:gap-4 mt-10">
          {capabilities.map((cap, index) => {
            const t = themes[cap.color];

            return (
              <article
                key={cap.n}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className={`
                  w-[350px] shrink-0
                  group relative flex flex-col rounded-3xl bg-white
                  border border-slate-200/70 
                  transition-all duration-500 ease-out
                   hover:shadow-2xl ${t.hoverShadow} ${t.hoverBorder}
                  overflow-hidden
                `}
              >
                {/* Image Header Area */}
                <div className="relative h-60 w-full p-4 pb-0">
                  <div className={`absolute inset-0 ${t.glow} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />

                  <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-inner bg-white">
                    <ParallaxImage src={cap.image} alt={cap.title} />




                  </div>


                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col px-8 pt-6   pb-8">
                  <h3 className="text-lg md:text-xl font-medium md:font-semibold md:text-slate-700 md:leading-snug md:mb-3 md:tracking-tight group-hover:text-slate-700 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {cap.desc}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className={`h-1 w-10 rounded-full ${t.bg} opacity-50 transition-all duration-500 group-hover:w-20 group-hover:opacity-100`} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <div data-aos="fade-in" data-aos-delay="600" className="mt-20 flex items-center justify-center gap-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-slate-300" />
          <p className="text-[12px] font-semibold text-blue-500">
            Better Schools <span className="mx-2 text-blue-500">✦</span> Brighter Futures
          </p>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      </div>
    </section>
  );
}