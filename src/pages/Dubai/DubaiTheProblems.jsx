import React, { useState, useEffect, useRef } from 'react';
import problemStudentImg from "../../assets/problem-student-books.png";
import betterQuestionImg from "../../assets/better-question.png";

/* ─── Animated counter hook ─── */
function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const start = 0;
                    const startTime = performance.now();
                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(start + (end - start) * eased));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return [count, ref];
}

function TheProblems() {
    const [stat1, stat1Ref] = useCountUp(10000, 2200);

    return (
        <>
            {/* ════════════════ STATS BAR ════════════════ */}
            {/* ═══════════════════════════════════════════════════════════════
    STATS BAR
═══════════════════════════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/4 top-0 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl" />
                    <div className="absolute right-1/4 top-0 w-72 h-72 bg-amber-50/50 rounded-full blur-3xl" />
                </div>

                <div
                    ref={stat1Ref}
                    className="relative max-w-7xl mx-auto px-5 md:px-8 py-5 md:py-7"
                >
                    <div
                        data-aos="fade-up"
                        className="
        relative
        grid grid-cols-2 md:grid-cols-4
        rounded-[24px]
        border border-slate-100
        bg-white/90
        backdrop-blur-xl
        shadow-[0_15px_50px_rgba(15,23,42,0.06)]
        overflow-hidden
      "
                    >
                        {[
                            {
                                value: "91.75%",
                                sub: "Graduate Mismatch Rate",
                            },
                            {
                                value: `${stat1.toLocaleString()}+`,
                                sub: "Schools Targeted",
                            },
                            {
                                value: "346",
                                sub: "Specialisation Assessments",
                            },
                            {
                                value: "₹0",
                                sub: "Cost to Schools",
                            },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className={`
            relative flex flex-col items-center justify-center
            text-center
            py-6 md:py-7
            px-3 md:px-6
            group
            ${i !== 3 ? "md:border-r border-slate-100" : ""}
            ${i === 2 ? "border-t md:border-t-0 border-slate-100" : ""}
            ${i === 3 ? "border-t md:border-t-0 border-slate-100" : ""}
          `}
                            >
                                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent md:hidden" />

                                <span
                                    className="
              text-[28px] sm:text-3xl md:text-[34px]
              leading-none
              font-medium
              tracking-[-0.04em]
              text-slate-700
              transition-transform duration-300
              group-hover:-translate-y-0.5
            "
                                >
                                    {s.value}
                                </span>

                                <span
                                    className="
              mt-2
              text-[9px] sm:text-[10px] md:text-xs
              font-medium
              text-slate-400
            "
                                >
                                    {s.sub}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════════════
    THE PROBLEM
═══════════════════════════════════════════════════════════════ */}
            <section
                className="
    relative
    overflow-hidden
    bg-[#fbfcfe]
    py-20 md:py-28 lg:py-32
  "
            >
                {/* ───────────── Background atmosphere ───────────── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    <div
                        className="
        absolute
        -left-40 top-20
        w-[420px] h-[420px]
        rounded-full
        bg-blue-100/40
        blur-[100px]
      "
                    />

                    <div
                        className="
        absolute
        -right-40 bottom-0
        w-[420px] h-[420px]
        rounded-full
        bg-amber-100/30
        blur-[100px]
      "
                    />

                    {/* subtle grid */}
                    <div
                        className="
        absolute inset-0 opacity-[0.22]
        [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)]
        [background-size:60px_60px]
      "
                    />
                </div>


                {/* ───────────── Decorative student visual ───────────── */}
                <div
                    data-aos="fade-right"
                    data-aos-delay="150"
                    className="
      absolute
      left-[-35px]
      xl:left-[2%]
      bottom-0
      hidden lg:block
      w-[300px]
      xl:w-[500px]
      pointer-events-none
      select-none
      z-[1]
    "
                >
                    <div className="relative">

                        {/* soft glow behind student */}
                        <div
                            className="
          absolute
          left-10 bottom-8
          w-72 h-72
          rounded-full
          bg-blue-100/60
          blur-3xl
        "
                        />

                        <img
                            src={problemStudentImg}
                            alt="Students with books"
                            className="
          relative
          w-full
          h-auto
          object-contain
          drop-sha-[0_20px_35px_rgba(15,23,42,0.10)]
        "
                        />

                    </div>
                </div>

                {/* ───────────── Right decorative visual ───────────── */}
                <div
                    data-aos="fade-left"
                    data-aos-delay="200"
                    data-aos-offset="100"
                    className="
      absolute
      right-[-35px]
      xl:right-[2%]
      bottom-10
      hidden lg:block
      w-[250px]
      xl:w-[400px]
      pointer-events-none
      select-none
      z-[1]
    "
                >
                    <div className="relative">
                        {/* soft glow behind the right image */}
                        <div
                            className="
          absolute
          right-10 bottom-8
          w-72 h-72
          rounded-full
          bg-amber-100/50
          blur-3xl
        "
                        />
                        <img
                            src={betterQuestionImg}
                            alt="Better Questions"
                            className="
          relative
          w-full
          h-auto
          object-contain
          drop-shadow-[0_20px_35px_rgba(15,23,42,0.10)]
          hover:-translate-y-4
          transition-transform
          duration-700
          ease-out
        "
                        />
                    </div>
                </div>

                {/* ───────────── Left question cards ─────────────
        <div className="absolute left-[4%] xl:left-[7%] top-[18%] hidden xl:block z-[3]">

          <div
            data-aos="fade-right"
            data-aos-delay="350"
            className="
        relative
        w-[190px]
        rounded-2xl
        border border-white
        bg-white/80
        backdrop-blur-xl
        px-5 py-4
        sha-[0_15px_45px_rgba(15,23,42,0.07)]
      "
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-bold">
              Question 01
            </span>

            <p className="mt-2 text-sm font-semibold leading-5 text-slate-700">
              Is this the right field for me?
            </p>

            <div className="absolute -right-2 bottom-5 w-4 h-4 bg-white rotate-45 border-r border-t border-white" />
          </div>

        </div> */}





                {/* ───────────── Main content ───────────── */}
                <div className="relative z-[2] max-w-6xl mx-auto px-3 md:px-8 text-center">

                    {/* Label */}
                    <div
                        data-aos="fade-up"
                        className="flex justify-center mb-3 md:mb-8"
                    >
                        <span
                            className="
          inline-flex items-center
          px-5 py-2
          text-[10px] md:text-[15px]
          font-medium
          uppercase
         
          text-blue-600
        "
                        >
                            The Problem
                        </span>
                    </div>


                    {/* Main heading */}
                    <h2
                        className="
        max-w-5xl
        mx-auto
        text-[24px]
        sm:text-[42px]
        md:text-[45px]
        lg:text-[48px]
        xl:text-[50px]
        font-medium
        tracking-[-0.045em]
        leading-[1.04]
        text-slate-800
      "
                    >
                        <span
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="block"
                        >
                            <span className="text-blue-600">
                                91.75%
                            </span>{" "}
                            of graduates do not work
                        </span>

                        <span
                            data-aos="fade-up"
                            data-aos-delay="220"
                            className="block mt-2"
                        >
                            in jobs that match their studies
                        </span>
                    </h2>


                    {/* Divider */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="flex items-center justify-center gap-4 my-2 md:my-9 md:my-11"
                    >
                        <div className="h-px w-14 md:w-20 bg-slate-200" />

                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-5 h-5 rounded-full bg-amber-200/50 blur-md" />
                            <div className="relative w-2 h-2 rounded-full bg-amber-400" />
                        </div>

                        <div className="h-px w-14 md:w-20 bg-slate-200" />
                    </div>


                    {/* Supporting copy */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="max-w-3xl mx-auto"
                    >
                        <p
                            className="
          text-base
          sm:text-lg
          md:text-xl
          lg:text-[21px]
          leading-[1.75]
          text-slate-500
        "
                        >
                            Not for lack of seats or degrees — but because many students
                            choose a field{" "}
                            <span className="font-semibold text-slate-800">
                                without knowing what that field actually requires
                            </span>
                            , where it leads, or what it delivers.
                        </p>
                    </div>


                    {/* ───────────── Question pills ───────────── */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="500"
                        className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-2.5
        mt-10
      "
                    >
                        {[
                            // "What does it require?",
                            // "Where does it lead?",
                            // "What will it deliver?",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="
            rounded-full
            border border-slate-200
            bg-white/80
            px-4 py-2
            text-xs
            md:text-sm
            font-medium
            text-slate-500
            sha-sm
          "
                            >
                                {item}
                            </div>
                        ))}
                    </div>


                    {/* Bottom statement */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="600"
                        className="mt-14 md:mt-16 flex items-center justify-center gap-4"
                    >
                        <div className="hidden sm:block h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-slate-200" />

                        <span
                            className="
          rounded-full
          border border-slate-100
          bg-white/70
          px-5 md:px-7
          py-2.5
          text-[9px] md:text-[10px]
          font-semibold
          uppercase
      
          text-slate-500
          sha-sm
        "
                        >
                            Informed choices create brighter futures
                        </span>

                        <div className="hidden sm:block h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-slate-200" />
                    </div>

                </div>






                {/* ───────────── Decorative dotted paths ───────────── */}
                <svg
                    className="
      absolute
      inset-0
      w-full
      h-full
      pointer-events-none
      hidden xl:block
      opacity-40
    "
                    viewBox="0 0 1440 800"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M180 210 C330 210 350 340 470 390"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="5 7"
                    />

                    <path
                        d="M1260 250 C1130 250 1100 350 1000 400"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="5 7"
                    />

                    <path
                        d="M1270 470 C1150 470 1110 450 1020 450"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="5 7"
                    />
                </svg>


                {/* Bottom subtle glow */}
                <div
                    className="
      absolute
      bottom-[-180px]
      left-1/2
      -translate-x-1/2
      w-[600px]
      h-[300px]
      rounded-full
      bg-blue-50/40
      blur-[90px]
      pointer-events-none
    "
                />

            </section>
        </>
    )
}

export default TheProblems