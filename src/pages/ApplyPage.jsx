import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import {
  ArrowRight,
  ShieldCheck,
  User,
  School,
  ClipboardList,
  Settings,
  CalendarCheck,
  CheckSquare,
} from "lucide-react";

/* ── Indian states / UTs ── */
const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/* ── reusable form primitives ── */
function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-1.5 ml-1"
    >
      {children}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
  );
}

function Input({ id, type = "text", placeholder, required, error, ...rest }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 shad-sm ${
          error
            ? "border-rose-300 focus:ring-rose-200"
            : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
        }`}
        {...rest}
      />
      {error && (
        <p className="text-rose-500 text-xs mt-1.5 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
}

function Select({ id, children, required, ...rest }) {
  return (
    <select
      id={id}
      name={id}
      required={required}
      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:border-blue-400 focus:ring-blue-100 transition-all duration-200 shad-sm appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5 6 7.5 9 4.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
      }}
      {...rest}
    >
      {children}
    </select>
  );
}

function Textarea({ id, placeholder, required, rows = 4, error, ...rest }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 shad-sm resize-y ${
          error
            ? "border-rose-300 focus:ring-rose-200"
            : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
        }`}
        {...rest}
      />
      {error && (
        <p className="text-rose-500 text-xs mt-1.5 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
}

function RadioGroup({ name, options, required }) {
  return (
    <div className="space-y-3 mt-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-start gap-3 cursor-pointer text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors"
        >
          <input
            type="radio"
            name={name}
            value={opt}
            required={required}
            className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ name, options }) {
  return (
    <div className="space-y-3 mt-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-start gap-3 cursor-pointer text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors"
        >
          <input
            type="checkbox"
            name={name}
            value={opt}
            className="mt-0.5 w-4 h-4 rounded text-blue-600 accent-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

/* ── section divider ── */
function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="border-b border-slate-100 pb-5 mb-8">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 shad-inner">
          <Icon size={20} className="text-blue-600" />
        </div>
        <h3 className="text-xl font-medium text-slate-600">{title}</h3>
      </div>
      {description && (
        <p className="mt-2 text-sm text-slate-500 leading-relaxed ml-[54px]">
          {description}
        </p>
      )}
    </div>
  );
}

function SearchableSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  loading,
  error,
  required,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const selectedOpt = options.find((opt) => String(opt.id) === String(value));
    setSearchTerm(selectedOpt && selectedOpt.name ? selectedOpt.name : "");
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        const selectedOpt = options.find(
          (opt) => String(opt.id) === String(value),
        );
        setSearchTerm(selectedOpt && selectedOpt.name ? selectedOpt.name : "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, options]);

  const filteredOptions = options.filter((opt) =>
    ((opt && opt.name) || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase()),
  );

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={loading ? "Loading..." : placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 shad-sm ${
            error
              ? "border-rose-300 focus:ring-rose-200"
              : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
          }`}
          disabled={loading}
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {isOpen && !loading && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto no-scrollbar py-1">
          {filteredOptions.length === 0 ? (
            <li className="px-4 py-3 text-xs text-slate-400 text-center">
              No options found
            </li>
          ) : (
            filteredOptions.map((opt) => (
              <li
                key={opt.id}
                onClick={() => {
                  onChange(opt.id, opt.name);
                  setSearchTerm(opt.name);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors ${
                  String(opt.id) === String(value)
                    ? "bg-blue-50/50 text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {opt.name}
              </li>
            ))
          )}
        </ul>
      )}
      {error && (
        <p className="text-rose-500 text-xs mt-1.5 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════ */
export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [boards, setBoards] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBoards, setLoadingBoards] = useState(false);
  const [loadingMediums, setLoadingMediums] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const baseUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${baseUrl}/master/states`);
        const data = await res.json();
        if (data.success) {
          setStates(data.data.map((s) => ({ id: s.id, name: s.name })));
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoadingStates(false);
      }
    };

    const fetchBoardsAndMediums = async () => {
      const baseUrl = import.meta.env.VITE_API_URL;
      try {
        setLoadingBoards(true);
        const res = await fetch(`${baseUrl}/master/public/education-boards`);
        const data = await res.json();
        if (data.success) {
          setBoards(data.data.map((b) => ({ id: b.id, name: b.name })));
        }
      } catch (err) {
        console.error("Error fetching boards:", err);
      } finally {
        setLoadingBoards(false);
      }

      try {
        setLoadingMediums(true);
        const res = await fetch(`${baseUrl}/master/public/mediums`);
        const data = await res.json();
        if (data.success) {
          setMediums(data.data.map((m) => ({ id: m.id, name: m.name })));
        }
      } catch (err) {
        console.error("Error fetching mediums:", err);
      } finally {
        setLoadingMediums(false);
      }
    };

    fetchStates();
    fetchBoardsAndMediums();
  }, []);

  const handleStateChange = async (stateId, stateName) => {
    formik.setFieldValue("stateId", stateId);
    formik.setFieldValue("stateName", stateName);
    formik.setFieldValue("cityId", "");
    formik.setFieldValue("cityName", "");

    if (!stateId) {
      setCities([]);
      return;
    }

    try {
      setLoadingCities(true);
      const baseUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${baseUrl}/master/cities/${stateId}`);
      const data = await res.json();
      if (data.success) {
        setCities(data.data.map((c) => ({ id: c.id, name: c.name })));
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleCityChange = (cityId, cityName) => {
    formik.setFieldValue("cityId", cityId);
    formik.setFieldValue("cityName", cityName);
  };

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const src = searchParams.get("src") || "";

  const formik = useFormik({
    initialValues: {
      schoolName: "",
      counsellorName: "",
      email: "",
      mobile: "",
      website: "",
      description: "",
      hasCounsellor: "",
      hasComputerLab: "",
      address: "",
      stateId: "",
      cityId: "",
      stateName: "",
      cityName: "",
      boardId: "",
      boardName: "",
      mediumId: "",
      mediumName: "",
      src: src || "",
    },
    validationSchema: Yup.object({
      schoolName: Yup.string().required("School Name is required"),
      counsellorName: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Official email address is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
        .required("Contact number is required"),
      website: Yup.string().url(
        "Must be a valid URL (e.g. https://example.com)",
      ),
      description: Yup.string(),
      address: Yup.string().required("Address is required"),
      stateId: Yup.string().required("State is required"),
      cityId: Yup.string().required("City is required"),
      boardId: Yup.string().required("Education Board is required"),
      mediumId: Yup.string().required("Instruction Medium is required"),
      hasCounsellor: Yup.boolean().required("This field is required"),
      hasComputerLab: Yup.boolean().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        let response;
        if (id) {
          response = await fetch(`${baseUrl}/specialist/schools/public/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
        } else {
          response = await fetch(`${baseUrl}/specialist/schools/public`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
        }
        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          alert(data.message || "Failed to submit application");
        }
      } catch (err) {
        console.error("Submit error:", err);
        alert("An error occurred while submitting the application");
      }
    },
  });

  useEffect(() => {
    if (!id) return;

    // Fetch data from backend
    const baseUrl = import.meta.env.VITE_API_URL;
    fetch(`${baseUrl}/specialist/schools/public/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const fetchedData = data.data;

          if (fetchedData.updated_with_uuid) {
            setIsAlreadySubmitted(true);
            setSubmitted(true);
            return;
          }

          if (fetchedData.state_id) {
            setLoadingCities(true);
            fetch(`${baseUrl}/master/cities/${fetchedData.state_id}`)
              .then((res) => res.json())
              .then((cityData) => {
                if (cityData.success) {
                  setCities(
                    cityData.data.map((c) => ({ id: c.id, name: c.name })),
                  );
                }
              })
              .catch((err) => console.error("Error pre-fetching cities:", err))
              .finally(() => setLoadingCities(false));
          }

          formik.setValues({
            schoolName: fetchedData.school_name || "",
            counsellorName: fetchedData.counsellor_name || "",
            email: fetchedData.school_email || "",
            mobile: fetchedData.school_contact || "",
            website: fetchedData.website || "",
            description: fetchedData.description || "",
            hasCounsellor:
              fetchedData.do_have_counsellor === null
                ? ""
                : fetchedData.do_have_counsellor === 1 ||
                  fetchedData.do_have_counsellor === true,
            hasComputerLab:
              fetchedData.do_have_computer_lab === null
                ? ""
                : fetchedData.do_have_computer_lab === 1 ||
                  fetchedData.do_have_computer_lab === true,
            address: fetchedData.address || "",
            stateId: fetchedData.state_id || "",
            cityId: fetchedData.city_id || "",
            stateName: fetchedData.state_name || "",
            cityName: fetchedData.city_name || "",
            boardId: fetchedData.board_id || "",
            boardName: fetchedData.board_name || "",
            mediumId: fetchedData.medium_id || "",
            mediumName: fetchedData.medium_name || "",
            src: fetchedData.src || src || "",
          });
        }
      })
      .catch((err) => console.error("Failed to fetch school details:", err));
  }, [id]);

  /* ── Thank-you state ── */
  if (submitted) {
    return (
      <main className="bg-slate-50 min-h-[70vh] flex items-center justify-center px-5 pt-40 pb-12 md:pt-52 relative overflow-hidden">
        <SEO
          title="Apply Now - Application Submitted"
          description="Your application to the Career Ready India Initiative has been submitted successfully."
          canonicalUrl="https://www.careerreadyindia.com/apply"
        />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-10 md:p-14 max-w-lg w-full text-center shad-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative z-10 animate-fade-up">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-8 shad-lg shad-emerald-500/30">
            <CheckSquare size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {isAlreadySubmitted
              ? "Application Already Submitted"
              : "Application Submitted"}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-medium">
            {isAlreadySubmitted
              ? "Your application is already submitted. You will shortly receive an email."
              : "Thank you for applying to Career Ready India Initiative. Your application has been received and will be reviewed. We will contact you at the email address provided."}
          </p>
          <Link
            to={(() => {
              let homeUrl = "/";
              const homeParams = new URLSearchParams();
              if (id) homeParams.append("id", id);
              if (src) homeParams.append("src", src);
              const homeParamStr = homeParams.toString();
              if (homeParamStr) {
                homeUrl = `/?${homeParamStr}`;
              }
              return homeUrl;
            })()}
            className="mt-10 inline-flex items-center justify-center w-full gap-2 bg-slate-900 text-white font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-blue-600 transition-colors shad-md active:scale-[0.98]"
          >
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title="Apply Now | School Career Counselling & Guidance"
        description="Register your school for the Career Ready India Initiative. Apply to access psychometric assessments, counsellor training, and student counselling programs."
        canonicalUrl="https://www.careerreadyindia.com/apply"
        keywords="Career Ready India apply, school career guidance registration, Career counselling program sign up"
        schemaData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.careerreadyindia.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Apply",
                item: "https://www.careerreadyindia.com/apply",
              },
            ],
          },
        ]}
      />
      {/* ══ HERO ══ */}
      <section className="relative bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 border-b border-slate-200/60 overflow-hidden pt-40 pb-16 md:pt-52 md:pb-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzQUYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div
          className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm  border-slate-200/80 rounded-full px-5 py-2 mb-8 shad-sm">
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest">
              Application Portal
            </span>
          </div>
          <h1
            className="
            mx-auto
            text-[24px]
            sm:text-[42px]
            md:text-[45px]
            lg:text-[48px]
            xl:text-[50px]
            font-medium
            tracking-[-0.045em]
            leading-[1.04]
            text-slate-800 mb-6
          "
          >
            Apply to Career Ready <br className="hidden md:block" /> India
            Initiative
          </h1>
          <p
            className="
            text-base
            sm:text-lg
            md:text-xl
            leading-[1.75]
            text-slate-500
            max-w-3xl mx-auto
          "
          >
            Bring a complete career readiness programme to your school. Selected
            schools receive access to The Education Decision platform, unlimited
            psychometric assessments, 346 specialisation assessments,
            professional counsellor training, and application support.
          </p>
          <div className="mt-10 inline-flex items-center justify-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-200/60 shad-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-slate-700">
              No fee to apply or participate if selected.
            </span>
          </div>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section className="bg-slate-50/50 relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10">
          {/* intro */}
          <div className="mb-12 text-center" data-aos="fade-up">
            <h2
              className="   mx-auto
            text-[24px]
            sm:text-[42px]
            md:text-[45px]
            lg:text-[48px]
            xl:text-[50px]
            font-medium
            tracking-[-0.045em]
            leading-[1.04]
            text-slate-800 mb-6"
            >
              Tell us about your school
            </h2>
            <p
              className="     text-base
            sm:text-lg
            md:text-xl
            leading-[1.75]
            text-slate-500
            max-w-3xl mx-auto"
            >
              Complete the application below to help us understand your school,
              its students and its readiness to implement Career Ready India
              Initiative. Applications should be submitted by an authorised
              school leader or counsellor.
            </p>
            <p className="mt-3 text-sm text-slate-400 font-medium">
              Fields marked with <span className="text-rose-500">*</span> are
              required.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* ─────── SCHOOL & CONTACT INFORMATION ─────── */}
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 md:p-10 shad-[0_8px_30px_rgb(0,0,0,0.04)] hover:shad-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
              <SectionHeading
                icon={School}
                title="School & Contact Information"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                <div className="sm:col-span-2">
                  <Label htmlFor="schoolName" required>
                    School Name
                  </Label>
                  <Input
                    id="schoolName"
                    name="schoolName"
                    value={formik.values.schoolName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.schoolName && formik.errors.schoolName
                        ? formik.errors.schoolName
                        : null
                    }
                    placeholder="Enter the complete registered name of the school"
                  />
                </div>
                <div>
                  <Label htmlFor="counsellorName">Counsellor Name</Label>
                  <Input
                    id="counsellorName"
                    name="counsellorName"
                    value={formik.values.counsellorName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.counsellorName &&
                      formik.errors.counsellorName
                        ? formik.errors.counsellorName
                        : null
                    }
                    placeholder="Enter the counsellor name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" required>
                    Official email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                    type="email"
                    placeholder="Enter your official email address"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="mobile" required>
                    Contact number
                  </Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mobile && formik.errors.mobile
                        ? formik.errors.mobile
                        : null
                    }
                    type="tel"
                    placeholder="Enter your contact number"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.website && formik.errors.website
                        ? formik.errors.website
                        : null
                    }
                    type="text"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <SearchableSelect
                    label="State"
                    placeholder="Select State"
                    options={states}
                    value={formik.values.stateId}
                    onChange={handleStateChange}
                    loading={loadingStates}
                    error={
                      formik.touched.stateId && formik.errors.stateId
                        ? formik.errors.stateId
                        : null
                    }
                    required
                  />
                </div>
                <div>
                  <SearchableSelect
                    label="City"
                    placeholder={
                      formik.values.stateId
                        ? "Select City"
                        : "Please select state first"
                    }
                    options={cities}
                    value={formik.values.cityId}
                    onChange={handleCityChange}
                    loading={loadingCities}
                    error={
                      formik.touched.cityId && formik.errors.cityId
                        ? formik.errors.cityId
                        : null
                    }
                    required
                  />
                </div>
                <div>
                  <SearchableSelect
                    label="Education Board"
                    placeholder="Select Board"
                    options={boards}
                    value={formik.values.boardId}
                    onChange={(boardId, boardName) => {
                      formik.setFieldValue("boardId", boardId);
                      formik.setFieldValue("boardName", boardName);
                    }}
                    loading={loadingBoards}
                    error={
                      formik.touched.boardId && formik.errors.boardId
                        ? formik.errors.boardId
                        : null
                    }
                    required
                  />
                </div>
                <div>
                  <SearchableSelect
                    label="Instruction Medium"
                    placeholder="Select Medium"
                    options={mediums}
                    value={formik.values.mediumId}
                    onChange={(mediumId, mediumName) => {
                      formik.setFieldValue("mediumId", mediumId);
                      formik.setFieldValue("mediumName", mediumName);
                    }}
                    loading={loadingMediums}
                    error={
                      formik.touched.mediumId && formik.errors.mediumId
                        ? formik.errors.mediumId
                        : null
                    }
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address" required>
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address && formik.errors.address
                        ? formik.errors.address
                        : null
                    }
                    placeholder="Enter the complete address of the school"
                    rows={3}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null
                    }
                    placeholder="Tell us about your school (Optional)..."
                  />
                </div>
              </div>
            </div>

            {/* ─────── INFRASTRUCTURE ─────── */}
            <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 md:p-10 shad-[0_8px_30px_rgb(0,0,0,0.04)] hover:shad-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
              <SectionHeading
                icon={ClipboardList}
                title="Infrastructure & Readiness"
              />
              <div className="space-y-6">
                <div>
                  <span className="block text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2 ml-1">
                    Do you have an Inhouse counsellor?{" "}
                    <span className="text-rose-500">*</span>
                  </span>
                  <div className="flex gap-6 ml-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                      <input
                        type="radio"
                        name="hasCounsellor"
                        value="true"
                        checked={formik.values.hasCounsellor === true}
                        onChange={() =>
                          formik.setFieldValue("hasCounsellor", true)
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                      <input
                        type="radio"
                        name="hasCounsellor"
                        value="false"
                        checked={formik.values.hasCounsellor === false}
                        onChange={() =>
                          formik.setFieldValue("hasCounsellor", false)
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                      />
                      No
                    </label>
                  </div>
                  {formik.touched.hasCounsellor &&
                    formik.errors.hasCounsellor && (
                      <p className="text-rose-500 text-xs mt-1.5 ml-1 font-medium">
                        {formik.errors.hasCounsellor}
                      </p>
                    )}
                </div>

                <div>
                  <span className="block text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2 ml-1">
                    Do you have a computer lab?{" "}
                    <span className="text-rose-500">*</span>
                  </span>
                  <div className="flex gap-6 ml-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                      <input
                        type="radio"
                        name="hasComputerLab"
                        value="true"
                        checked={formik.values.hasComputerLab === true}
                        onChange={() =>
                          formik.setFieldValue("hasComputerLab", true)
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                      <input
                        type="radio"
                        name="hasComputerLab"
                        value="false"
                        checked={formik.values.hasComputerLab === false}
                        onChange={() =>
                          formik.setFieldValue("hasComputerLab", false)
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                      />
                      No
                    </label>
                  </div>
                  {formik.touched.hasComputerLab &&
                    formik.errors.hasComputerLab && (
                      <p className="text-rose-500 text-xs mt-1.5 ml-1 font-medium">
                        {formik.errors.hasComputerLab}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* ─────── SUBMIT ─────── */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-blue-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shad-[0_8px_30px_-8px_rgba(37,99,235,0.4)] hover:shad-[0_16px_40px_-10px_rgba(37,99,235,0.5)] active:scale-95 text-base cursor-pointer"
              >
                Submit Application
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <p className="mt-5 text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                Your information will be used only to review your application
                and communicate with your institution regarding Career Ready
                India Initiative.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
