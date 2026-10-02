/**
 * Career Ready India Initiative – Official Homepage
 * Light theme, hero background image, deliverables as individual sections
 */
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  BrainCircuit,
  Target,
  GraduationCap,
  Users,
  FileText,
  Library,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowUpRight,
  Play,
  Star,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import heroImg from "../../assets/dubai-hero-bg.jpg";
import DubaiProgrammeIntro from "./DubaiProgrammeIntro";
import DubaiTrustedByLeaders from "./DubaiTrustedByLeaders";
import DubaiNoFeeSection from "./DubaiNoFeeSection";
import SEO from "../../components/SEO";
import DubaiTheProblems from "./DubaiTheProblems";
import DubaiDeliverables from "./DubaiDeliverables";



export default function DubaiHomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const src = searchParams.get("src") || "";

  let applyUrl = "/apply";
  const urlParams = new URLSearchParams();
  if (id) urlParams.append("id", id);
  if (src) urlParams.append("src", src);
  const paramStr = urlParams.toString();
  if (paramStr) {
    applyUrl = `/apply?${paramStr}`;
  }

  // Stats moved to TheProblems.jsx
  return (
    <main>
      <SEO
        title="Career Ready India Initiative | School Career Counselling & Guidance"
        description="Empower your school with Career Ready India. Get free psychometric tests, counsellor training, & comprehensive career guidance programs for students in India."
        keywords="Career Ready India, Career guidance for schools in India, Career counselling programs for students, Employability programs for schools, School career readiness initiatives"
      />

      {/* ════════════════ HERO ════════════════ */}
      <section
        data-aos="fadeInUp"
        data-aos-delay="150"
        className="relative min-h-[100dvh] w-full flex items-center overflow-hidden bg-cover bg-no-repeat bg-[55%_center] md:bg-center"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        {/* Layered gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.92] via-white/1 to-white/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none" />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 pt-32 sm:pt-36 md:pt-44 lg:pt-40 pb-20 sm:pb-16">
          <div className="w-full lg:w-[65%] xl:w-[65%]">
            {/* Badge */}


            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-medium text-slate-800 tracking-tight leading-[1.08]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="relative inline-block text-blue-600">
                Helping
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-400/40"
                  viewBox="0 0 100 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 8.5C20 2.5 60 -1.5 99 8.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Student make smarter decision about their future
            </h1>

            {/* Subtext */}
            <div
              className="mt-8 md:mt-10 space-y-4 max-w-2xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-700 font-medium">
                Career Ready India brings assessments, counsellor training and
                guidance to{" "}
                <strong className="text-slate-900 font-bold">10,000+</strong>{" "}
                schools at no cost — because every student deserves informed
                career decisions.
              </p>
            </div>

            {/* CTA Row */}
            <div
              className="mt-10 md:mt-12  flex-wrap items-center gap-5"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link
                to={applyUrl}
                className="group relative inline-flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold md:px-8 px-4 py-4 rounded-xl shadow-[0_8px_30px_-8px_rgba(37,99,235,0.4)] hover:shadow-[0_16px_40px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 hover:bg-blue-700 active:scale-[0.97] text-sm md:text-base overflow-hidden"
              >
                {/* Sweep effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-3">
                  Apply to Career Ready India
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <div className="flex items-center mt-5 gap-2 text-xs text-slate-500 font-medium">
                <Shield size={14} className="text-emerald-500" />
                <span>No application fee · Zero cost for selected schools</span>
              </div>
            </div>

            {/* NEP 2020 alignment pill */}
            {/* <div
              className="mt-8 inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100 rounded-lg px-4 py-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Sparkles size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-blue-700 tracking-wide">
                Aligned with NEP 2020 Career Education Goals
              </span>
            </div> */}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      <DubaiTheProblems />

      {/* ════════════════ PROGRAMME INTRO ════════════════ */}
      <DubaiProgrammeIntro />

      {/* ════════════════ NO FEE SECTION ════════════════ */}
      <DubaiNoFeeSection applyUrl={applyUrl} />

      {/* ════════════════ DELIVERABLES HEADER ════════════════ */}
      <section className="pt-24 md:pt-32 pb-4 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <p
            data-aos="fade-up"
            className="text-[11px] md:text-xs tracking-[0.3em] font-bold uppercase text-slate-400 mb-6"
          >
            What Your School Receives
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            7 Integrated Deliverables from{" "}
            <span className="relative inline-block text-blue-600">
              Career Ready India
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-400/30"
                viewBox="0 0 100 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 8.5C20 2.5 60 -1.5 99 8.5"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Each deliverable is designed to work together — building a complete
            career readiness ecosystem within your school.
          </p>
        </div>
      </section>

      {/* ════════════════ INDIVIDUAL DELIVERABLE SECTIONS ════════════════ */}
      <DubaiDeliverables />
      {/* ════════════════ FINAL CTA ════════════════ */}
      <section className="relative py-28 md:py-36 bg-white overflow-hidden">

        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

        {/* Decorative elements */}
        {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" /> */}
        {/* <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" /> */}

        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div
            className="relative rounded-[2rem] md:rounded-[2.5rem] bg-white  border-slate-200/80 px-8 md:px-14 py-8 md:py-10 text-center overflow-hidden "
            data-aos="fade-up"
          >
            {/* Top accent line */}


            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2.5 font-semibold  text-[12px] text-blue-500 uppercase tracking-widest px-5 py-2.5 rounded-full mb-8"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                Applications open for 2026
              </div>

              <h2
                className="text-xl sm:text-2xl md:text-2xl font-medium leading-[1.1] tracking-tight text-slate-700 mb-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Ready to make your school career ready?
              </h2>

              <p
                className="text-base md:text-md leading-relaxed text-slate-500 max-w-lg mb-10"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Apply today. There is no fee. Selected schools receive the
                complete programme at no cost.
              </p>

              <div
                className="flex flex-col items-center gap-4 w-full"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <Link
                  to={applyUrl}
                  className="group inline-flex items-center gap-3 bg-blue-600 text-white font-medium px-10 py-4.5 rounded-xl text-base transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] overflow-hidden relative"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-3">
                    Apply to Career Ready India
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>

                <p className="text-xs text-slate-400 mt-2 tracking-wide">
                  No cost for selected schools · Zero fee to apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Scoped keyframe animation ═══ */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
