import React from "react";
import { motion } from "framer-motion";

import nocostImg from "../../assets/New/nocost.jpg";
export { default as ProvidedFeatures } from "./ProvidedFeatures";

/* =========================================================
   SCHOOL BENEFITS DATA
========================================================= */
const schoolBenefits = [
  {
    number: "01",
    title: "Separate Dashboards",
    description:
      "Separate dashboards for the student, principal and school counsellor with comprehensive analytics and progress tracking.",
  },
  {
    number: "02",
    title: "School-Branded Guidance",
    description:
      "Career guidance under the school's own name with seamless website integration possibility.",
  },
  {
    number: "03",
    title: "Counsellor Enablement",
    description:
      "Enable career counsellors from existing staff or train and certify existing counsellors with modern practices.",
  },
  {
    number: "04",
    title: "NEP Norms Compliance",
    description:
      "Fully meets and exceeds NEP career guidance and experiential exploration norms.",
  },
  {
    number: "05",
    title: "Four-Stage Counselling",
    description:
      "Structured four-stage counselling and unlimited psychometric assessments for every student.",
  },
  {
    number: "06",
    title: "Parent Visibility",
    description:
      "A dedicated parent dashboard for every student to collaborate on future decisions.",
  },
];

/* =========================================================
   MAIN COMPONENT: SCHOOL BENEFITS & NO COST SECTION
========================================================= */
const SchoolBenefitsSection = () => {
  return (
    <>
      {/* ===================================================
          1. FUNDED MESSAGE SECTION
      ==================================================== */}
      <section className="relative min-h-[90vh] w-full overflow-hidden bg-white text-neutral-900 py-20 flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <img
            src={nocostImg}
            alt="School Guidance"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 sm:text-sm"
          >
            Zero Cost for Schools
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl md:text-7xl"
          >
            A complete programme.
            <br />
            Fully funded.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-neutral-700 sm:text-xl"
          >
            Assessments, counselling, resources, curriculum and platforms
            provided at no cost to participating schools.
          </motion.p>
        </div>
      </section>

      {/* ===================================================
          2. SCHOOL BENEFITS GRID
      ==================================================== */}
      <section className="relative w-full bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {schoolBenefits.map((benefit, idx) => (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col justify-between rounded-3xl bg-[#f8f9fa] p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div>
                  <span className="text-sm font-semibold tracking-wider text-neutral-400">
                    {benefit.number}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Large Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mt-32 text-center"
          >
            <div className="mx-auto mb-8 h-px w-16 bg-neutral-300" />
            <h2 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-neutral-950 sm:text-7xl lg:text-8xl mx-auto">
              Career readiness
              <br />
              starts before
              <br />
              the career
            </h2>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SchoolBenefitsSection;
export { SchoolBenefitsSection as FundedBenefitsSection };
