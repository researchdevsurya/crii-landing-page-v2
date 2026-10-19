import React from "react";
import {
  BookOpen,
  BrainCircuit,
  Target,
  GraduationCap,
  Users,
  FileText,
  Library,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import d1Img from "../../assets/d1.png";
import d2Img from "../../assets/d2.png";
import d3Img from "../../assets/d3.png";
import d4Img from "../../assets/d4.png";
import d5Img from "../../assets/d5.png";
import d6Img from "../../assets/d6.png";
import d7Img from "../../assets/d7.png";

/* ─────────────────────────────────────────────────────────────
   DELIVERABLES DATA
   ───────────────────────────────────────────────────────────── */
export const DELIVERABLES = [
  {
    id: "platform",
    number: "01",
    label: "THE EDUCATION DECISION PLATFORM",
    icon: BookOpen,
    heading: "Give students the information behind",
    highlightText: "every decision",
    description:
      "The Education Decision platform helps students understand the academic and professional outcomes connected to their choices.",
    lead: "Students can explore:",
    bullets: [
      "Careers and specialisations",
      "Courses and qualifications",
      "Colleges and universities",
      "Entrance examinations",
      "Fees and education loans",
      "Salaries and placements",
      "Work culture",
      "Career progression",
      "Opportunities and threats",
      "Rankings, hostels and college reputation",
    ],
    closing:
      "Students can move beyond general career names and understand what each path requires, where it leads and what it may deliver.",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    accentBorder: "#bfdbfe",
    gradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    image: d1Img,
  },
  {
    id: "psychometric",
    number: "02",
    label: "PSYCHOMETRIC ASSESSMENTS",
    icon: BrainCircuit,
    heading: "Help students",
    highlightText: "understand themselves",
    description:
      "Participating schools receive unlimited psychometric assessments and student results.",
    lead: "The assessments help students and counsellors examine the factors that influence career fit, including:",
    bullets: [
      "Aptitude",
      "Skills",
      "Interests",
      "Personality",
      "Strengths",
      "Preferences",
      "Career suitability",
    ],
    closing:
      "There is no per-student assessment limit for participating schools.",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    accentBorder: "#ddd6fe",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
    image: d2Img,
  },
  {
    id: "specialisation",
    number: "03",
    label: "SPECIALISATION ASSESSMENTS",
    icon: Target,
    heading: "Help students make more",
    highlightText: "precise choices",
    description:
      "A broad career field can contain several very different specialisations. Students need to understand which option within a field is most suitable for them.",
    lead: "Schools receive access to 346 specialisation assessments that help students:",
    bullets: [
      "Explore different specialisations",
      "Compare closely related fields",
      "Confirm their suitability for a chosen option",
      "Identify stronger alternatives",
      "Make better-informed academic decisions",
    ],
    closing: "",
    accent: "#e11d48",
    accentLight: "#fff1f2",
    accentBorder: "#fecdd3",
    gradient: "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
    image: d3Img,
  },
  {
    id: "training",
    number: "04",
    label: "COUNSELLOR TRAINING",
    icon: GraduationCap,
    heading: "Build",
    highlightText: "lasting capability",
    headingAfter: "within your school",
    description:
      "The Career Counsellor Practitioner Programme trains nominated school staff in current career counselling methods, tools and techniques.",
    lead: "The programme includes Foundation and Master-level training designed to help school counsellors:",
    bullets: [
      "Understand career psychology",
      "Interpret student assessments",
      "Research education and career options",
      "Guide subject and stream decisions",
      "Support course and college selection",
      "Structure career counselling conversations",
    ],
    closing:
      "The objective is to build permanent capability within the school.",
    accent: "#059669",
    accentLight: "#ecfdf5",
    accentBorder: "#a7f3d0",
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    image: d4Img,
  },
  {
    id: "counselling",
    number: "05",
    label: "CAREER COUNSELLING",
    icon: Users,
    heading: "Give students access to",
    highlightText: "professional guidance",
    description:
      "Participating schools receive professional career counselling support.",
    lead: "Counsellors help students bring together their assessment results, interests, academic profile, aspirations and practical limitations to make informed decisions about:",
    bullets: [
      "Subjects and streams",
      "Career fields",
      "Courses",
      "Colleges",
      "Entrance examinations",
      "Alternative academic pathways",
    ],
    closing: "",
    accent: "#d97706",
    accentLight: "#fffbeb",
    accentBorder: "#fde68a",
    gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
    image: d5Img,
  },
  {
    id: "application",
    number: "06",
    label: "APPLICATION SUPPORT",
    icon: FileText,
    heading: "Help students",
    highlightText: "act on their decisions",
    description:
      "Career decisions must eventually translate into applications, examinations and admissions.",
    lead: "Application support helps students manage:",
    bullets: [
      "Entrance examination requirements",
      "Course and college shortlisting",
      "Application timelines",
      "Documentation",
      "Form submissions",
      "Deadline tracking",
      "Admission decisions",
    ],
    closing:
      "The programme helps ensure that students do not miss an examination, deadline or opportunity because of confusion during the application process.",
    accent: "#0891b2",
    accentLight: "#ecfeff",
    accentBorder: "#a5f3fc",
    gradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
    image: d6Img,
  },
  {
    id: "resources",
    number: "07",
    label: "RESOURCES & COMMUNITY",
    icon: Library,
    heading: "Reimagine",
    highlightText: "career readiness",
    headingAfter: "with these resources",
    description:
      "Participating schools receive structured books, e-books, research, toolkits and training resources to support career readiness throughout the academic year.",
    lead: "",
    bullets: [],
    closing:
      "These resources help schools make career education continuous, structured and accessible. Schools also become part of a national community of career counsellors across India, creating opportunities to learn, exchange ideas and strengthen counselling practices.",
    accent: "#4f46e5",
    accentLight: "#eef2ff",
    accentBorder: "#c7d2fe",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    image: d7Img,
  },
];

/* ─────────────────────────────────────────────────────────────
   SINGLE DELIVERABLE SECTION
   ───────────────────────────────────────────────────────────── */
function DeliverableItem({ item, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* ═══════════════ TEXT CONTENT ═══════════════ */}
          <div
            className={`flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-16 pt-16 pb-8 lg:py-28 ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* ── Badge ── */}
            <div
              data-aos="fade-up"
              className="inline-flex items-center gap-3 mb-8 self-start"
            >
              {/* <span
                className="flex items-center justify-center w-9 h-9 rounded-full text-white text-[12px] font-bold shadow-md"
                style={{ background: item.gradient }}
              >
                {item.number}
              </span> */}
              <span
                className="text-base font-bold  -[0.18em]"
                style={{ color: item.accent }}
              >
                {item.label}
              </span>
            </div>

            {/* ── Heading ── */}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-semibold text-slate-900 leading-[1.12] tracking-tight mb-6"
            >
              {item.heading}{" "}
              <span className="relative " style={{ color: item.accent }}>
                {item.highlightText}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C40 3 80 1 120 5C160 9 180 4 198 7"
                    stroke={item.accent}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeOpacity="0.35"
                  />
                </svg>
              </span>
              {item.headingAfter ? ` ${item.headingAfter}` : ""}
            </h2>

            {/* ── Description ── */}
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-[16px] md:text-[17px] text-slate-500 leading-[1.75] mb-8 max-w-lg"
            >
              {item.description}
            </p>

            {/* ── Lead + Bullets ── */}
            {item.bullets.length > 0 && (
              <div className="mb-8">
                {item.lead && (
                  <p
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="text-[15px] font-medium text-slate-800 mb-5"
                  >
                    {item.lead}
                  </p>
                )}

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8">
                  {item.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      data-aos="fade-up"
                      data-aos-delay={300 + i * 50}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                        style={{ backgroundColor: `${item.accent}15` }}
                      >
                        <CheckCircle2
                          size={14}
                          strokeWidth={3}
                          style={{ color: item.accent }}
                        />
                      </span>
                      <span className="text-[14px] text-slate-600">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Callout Box ── */}
            {item.closing && (
              <div
                data-aos="fade-up"
                data-aos-delay="500"
                className="flex items-start gap-4 px-5 py-4 rounded-2xl max-w-lg"
                style={{
                  backgroundColor: item.accentLight,
                  border: `1px solid ${item.accentBorder}`,
                }}
              >
                <Lightbulb
                  className="w-5 h-5 mt-0.5 shrink-0"
                  strokeWidth={2.5}
                  style={{ color: item.accent }}
                />
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {item.closing}
                </p>
              </div>
            )}
          </div>

          {/* ═══════════════ IMAGE ═══════════════ */}
          <div
            className={`relative flex items-center justify-center overflow-hidden group ${
              isReversed ? "lg:order-1" : "lg:order-2"
            }`}
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            data-aos-delay="150"
          >
            <img
              src={item.image}
              alt={item.label}
              loading="lazy"
              className="relative w-full h-full object-cover lg:object-contain max-h-[550px] px-6 pb-12 pt-0 lg:p-6 transition-transform duration-1000 group-hover:scale-105"
              style={{
                maskImage:
                  "radial-gradient(ellipse 75% 70% at center, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 70% at center, black 50%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="mx-auto max-w-6xl px-12">
        <div className="h-px bg-slate-100" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DELIVERABLES WRAPPER
   ───────────────────────────────────────────────────────────── */
export default function Deliverables() {
  return (
    <div className="bg-white">
      {DELIVERABLES.map((item, index) => (
        <DeliverableItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
