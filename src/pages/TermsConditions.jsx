import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import SEO from "../components/SEO";

export default function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const src = searchParams.get("src") || "";

  let homeUrl = "/";
  const urlParams = new URLSearchParams();
  if (id) urlParams.append("id", id);
  if (src) urlParams.append("src", src);
  const paramStr = urlParams.toString();
  if (paramStr) {
    homeUrl = `/?${paramStr}`;
  }

  return (
    <main className="bg-white min-h-screen md:pt-40 pb-20 relative overflow-hidden">
      <SEO
        title="Terms & Conditions"
        description="Review the terms and conditions for participating in the Career Ready India Initiative for schools and students."
        canonicalUrl="https://www.careerreadyindia.com/terms"
        keywords="Career Ready India terms and conditions, terms of service, participation agreement"
        schemaData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.careerreadyindia.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Terms & Conditions",
                "item": "https://www.careerreadyindia.com/terms"
              }
            ]
          }
        ]}
      />
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-[100] max-w-7xl mx-auto px-3 md:px-8">
        {/* Article Layout */}
        <article className="bg-white md:border border-slate-200/60 rounded-3xl  md:p-12 ">
          {/* Header */}
          <div className="flex items-center pt-4 mb-8 pb-6 border-b border-slate-100">
            <a
              href={homeUrl}
              className="p-2 -ml-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all group cursor-pointer"
              title="Back to Home"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </a>
            <div className="hidden md:flex w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center shrink-0">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-700 tracking-tight">
                Terms & Conditions
              </h1>
              {/* <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p> */}
            </div>
          </div>

          {/* Structured Sections */}
          <div className="space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-3">1. Acceptance of Terms</h2>
              <p className="text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-3">2. Description of Service</h2>
              <p className="text-slate-500">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-3">3. Eligibility and Onboarding</h2>
              <p className="text-slate-500">
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-3">4. Intellectual Property</h2>
              <p className="text-slate-500">
                Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-3">5. Limitation of Liability</h2>
              <p className="text-slate-500">
                Praesent congue erat at massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ut leo. Cras viverra metus rhoncus sem.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-3">6. Governing Law</h2>
              <p className="text-slate-500">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
