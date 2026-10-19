import { ArrowRight, ShieldCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NoFeeSection = ({ applyUrl = "/apply" }) => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-50 border-t border-b border-slate-100">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/60 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-50/30 rounded-full blur-3xl" />
      </div>

      <div
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center"
        data-aos="fade-up"
      >
        {/* Heading */}
        <h2
          className="  text-[24px]
        sm:text-[42px]
        md:text-[45px]
        lg:text-[48px]
        xl:text-[50px]
        font-medium
        tracking-[-0.045em]
        leading-[1.04]
        text-slate-800"
        >
          There is{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent font-semibold">
            no fee
          </span>{" "}
          to apply
        </h2>

        {/* Main Description */}
        <p
          className="  text-base pt-5 pb-7
          sm:text-lg
          md:text-xl
          text-slate-500"
        >
          Schools will be onboarded following a review of their application, and
          selected schools will receive the complete programme at no cost.
          Schools that are not selected will not be charged or enrolled.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={applyUrl}
            className="group inline-flex items-center gap-3 bg-blue-600 text-white font-medium px-8 py-3 rounded-2xl sadow-[0_8px_30px_-8px_rgba(37,99,235,0.35)] hover:shadow-[0_16px_40px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 hover:bg-blue-700 active:scale-[0.97] text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            Apply Now for Free
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mt-6 font-medium">
          Limited spots available per state cohort · Applications open for 2026
        </p>
      </div>
    </section>
  );
};

export default NoFeeSection;
