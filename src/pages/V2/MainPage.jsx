import React, { useEffect, useState } from "react";

import bg4 from "../../assets/New/bg4.png";
import bg7 from "../../assets/New/bg7.png";
import bg2 from "../../assets/New/bg2.png";
import sci1 from "../../assets/Feature/sci1.png";
import sci2 from "../../assets/Feature/sci2.png";
import sci4 from "../../assets/Feature/sci4.png";
import sci5 from "../../assets/Feature/sci5.png";
import sci6 from "../../assets/Feature/sci6.png";
import sci7 from "../../assets/Feature/sci7.png";
import bgVideo from "../../assets/New/testvedio.mp4";
// import videoBg from "../../assets/New/testv2.mp4";
import videoBg from "../../assets/New/doctorvedio.mp4";
import careervedio from "../../assets/New/careervedio.mp4";
import min5 from "../../assets/New/min5.mp4";
import heroVideo from "../../assets/New/herovedio.mp4";
import criiLogo from "../../assets/crii_logo.png";
import { Link } from "react-router-dom";
import FeatureSection from "./FeatureSection";
import SchoolBenefitsSection from "./SchoolBenefitsSection";
import ProvidedFeatures from "./ProvidedFeatures";
import DeviceShowcase from "./DeviceShowcase";
import PhotoWallScroll from "./PhotoWallScroll";
import CinematicScrollGallery from "./CinematicScrollGallery";

import cake from "../../assets/New/cake.png";
import cutting from "../../assets/New/cutting.png";
import formfilling from "../../assets/New/formfilling.mp4";
import appreview from "../../assets/New/appreview.mp4";
import ScienceSection from "./ScienceSection";
import AudienceSection from "./AudienceSection";
import AppleScrollSection from "./AppleScrollSection";
import NeedFor from "./NeedFor";
import VideoWithText from "./VedioWithTest";
import Filler7 from "./Fillers/Filler7";
import Filler8 from "./Fillers/Filler8";
import VedioFiller1 from "./Fillers/VedioFiller1";
import Filler9 from "./Fillers/Filler9";
import Filler10 from "./Fillers/Filler10";
import VedioFiller2 from "./Fillers/VedioFiller2";
import Filler6 from "./Fillers/FIller6";
import StudentPathwaysHero from "./StudentPathwaysHero";
import ZeroCostSection from "./ZeroCostSection";

/* =========================================================
   DIRECT FILLER SECTION (NO ANIMATIONS / NO PINNING)
========================================================= */
const FillerSection = ({
  bgImage,
  children,
  overlay,
  bgClassName = "bg-neutral-900",
}) => {
  return (
    <section
      className={`
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        text-white
        py-20
        ${bgClassName}
      `}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {overlay}

      <div className="relative z-20 max-w-5xl px-6 text-center text-white">
        {children}
      </div>
    </section>
  );
};

const MainPage = () => {
  return (
    <main
      className="
                w-full
                bg-black
                h-full
            "
    >
      {/* =====================================================
          SECTION 1 - APPLE VISION STYLE HERO
      ===================================================== */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-[#f5f5f7] flex flex-col justify-between"
      >
        {/* Hero Background Video */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <video
            className="h-full w-full object-cover select-none"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Bottom gradient overlay for clear text legibility on mobile & desktop */}
          <div className="absolute inset-x-0 bottom-0 h-96 sm:h-80 md:h-64 bg-gradient-to-t from-[#f5f5f7] via-[#f5f5f7]/45 via-50% to-transparent pointer-events-none" />
        </div>

        {/* Spacer */}
        <div className="relative z-20 w-full" />

        {/* Bottom Area: Logo & Slogan (Left), Home & Apply (Right) */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-10 xl:px-32 pb-16 sm:pb-14 md:pb-14 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 text-center lg:text-left">
          {/* Bottom Left: Logo + Brand Name & Slogan */}
          <div className="flex flex-col items-center lg:items-start max-w-2xl xl:max-w-4xl">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-800 font-sans fade-in">
                Career Ready India
              </h1>
            </div>
            <p className="mt-2 text-sm sm:text-base md:text-xl xl:text-[1.55rem] text-slate-800 font-medium tracking-tight max-w-xl lg:max-w-none fade-in fade-in-delay-1">
              Complete career and college readiness for every student. Free for
              schools.
            </p>
          </div>

          {/* Bottom Right: Home & Apply Action Buttons */}
          <div className="flex items-center justify-center gap-3.5 shrink-0 fade-in fade-in-delay-2">
            <Link
              to="/"
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-[#1d1d1f] bg-transparent hover:bg-black/5 text-[#1d1d1f] text-sm sm:text-base font-normal tracking-tight transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/apply"
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-sm sm:text-base font-medium tracking-tight transition-all duration-200"
            >
              Apply
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 2 — NEED FOR
      ===================================================== */}

      {/* <NeedFor /> */}
      <StudentPathwaysHero />

      {/* =====================================================
               School benefit & Provided Features highlights
      ===================================================== */}
      <div id="highlights" className="w-full h-full bg-white">
        <ProvidedFeatures />
      </div>
      {/* =====================================================
          SECTION 6 — DISCOVER YOUR POTENTIAL
      ===================================================== */}
      <div id="" className="w-full h-full bg-white">
        <VideoWithText bgVideo={bgVideo} />
      </div>
      {/* =====================================================
                FULL SCREEN EDUCATION FILLER 2 zero cost
      ===================================================== */}

      <ZeroCostSection />
      {/* =====================================================
          SECTION 5 — PREPARE TODAY. LEAD TOMORROW.
      ===================================================== */}
      <VedioFiller1 />
      {/* <Filler10 /> */}
      <div id="platform">
        <FeatureSection />
      </div>
      {/* =====================================================
                FULL SCREEN EDUCATION FILLER 1
      ===================================================== */}

      <div className="">
        <Filler9 />
      </div>

      <div id="features" className="bg-white grid grid-cols-1  gap-y-10">
        <ScienceSection
          eyebrow="Psychometric Assessments"
          title="Less guesswork. More understanding"
          description="Career decisions begin with understanding the student. Our assessment combines 30 batteries across aptitude, skills and personality, along with 20 interest areas, and delivers both a concise single-page summary and a detailed 80-page report."
          image={sci1}
        />
        <ScienceSection
          eyebrow="Specialisation Assessments"
          title="Find Your Specialisation."
          description="Once a broad career field is identified, 346 specialisation assessments help students examine their fit across specific disciplines and pathways within it. They add a deeper layer of validation, helping students move from choosing a field to understanding which specialisation may suit them better."
          image={sci2}
        />
        <ScienceSection
          eyebrow="Career Counsellor Practitioner Programme"
          title="Build Counselling Capability"
          description="The CCPP develops in-school career counselling capability through structured Foundation and Master programmes. Each two-month course combines recorded lectures, live sessions, reading material, case-based learning and evaluations, helping educators build practical knowledge they can apply while guiding students through career and education decisions."
          image={sci4}
        />

        <ScienceSection
          eyebrow="Career counselling for the school"
          title="Guidance at Every Step."
          description="Students receive structured counselling across the decisions that shape their education journey, from Career Psychology and Academic Counselling to Application and Admission Counselling. Each stage addresses a different decision, helping students move from understanding themselves to choosing subjects, courses, colleges and ultimately navigating admissions."
          image={sci5}
        />

        <ScienceSection
          eyebrow="Smart class career education content"
          title="Careers Enter the Classroom"
          description="Ready-to-teach career education for Grades 8–12, delivered through the Padh.ai app on the school's existing smart boards. Students explore careers, pathways and future possibilities through structured classroom learning, with dedicated stream-specific content for PCM, PCB, Commerce, and Arts & Humanities in Grades 11 and 12."
          image={sci6}
        />

        <ScienceSection
          eyebrow="Career Readiness Books & e-Books"
          title="Read. Explore. Decide"
          description="A set of 11 career readiness books and e-books, designed grade-wise and stream-wise to support students through different stages of school. They bring career exploration, education choices, future pathways and decision-making into a format students can revisit, reflect on and use throughout their journey."
          image={sci7}
        />
      </div>

      {/* =====================================================
          SECTION 4 — WHY CAREER READY INDIA
      ===================================================== */}
      <Filler6 />
      {/* =====================================================
                Audience Section
      ===================================================== */}
      <div className="w-full bg-[#fafbff]">
        <AudienceSection />
      </div>
      <AppleScrollSection />

      <DeviceShowcase />

      {/* <PhotoWallScroll /> */}
      {/* <CinematicScrollGallery/> */}

      {/* =====================================================
                NEXT SECTION
            ===================================================== */}

      {/* =====================================================
        cake SECTION WHY CAREER CHOICE MATTERS SECTION
        ===================================================== */}
      {/* <Filler7 /> */}
      {/* <VedioFiller2 /> */}
      <Filler8 />
      {/* =====================================================
    KNOW YOURSELF SECTION
===================================================== */}
    </main>
  );
};

export default MainPage;
