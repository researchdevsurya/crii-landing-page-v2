import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
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
        title="Privacy Policy"
        description="Read the privacy policy of the Career Ready India Initiative to understand how we protect your personal and school data."
        canonicalUrl="https://www.careerreadyindia.com/privacy"
        keywords="Career Ready India privacy policy, privacy terms, school data protection"
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
                name: "Privacy Policy",
                item: "https://www.careerreadyindia.com/privacy",
              },
            ],
          },
        ]}
      />
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-[100] max-w-7xl mx-auto px-2 md:px-8">
        {/* Article Layout */}
        <article className="bg-white md:border border-slate-200/60 rounded-3xl p-2 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-4 pb-2 border-b border-slate-100">
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
              <Shield size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-medium text-slate-700 tracking-tight">
                Privacy Policy
              </h1>
              {/* <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p> */}
            </div>
          </div>

          {/* Structured Sections */}
          <div className="space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
            <p className="text-slate-500">
              This Privacy Policy regulates your use of the website{" "}
              <a
                href="https://theeducationmatch.com/"
                className="text-blue-600 hover:underline"
              >
                https://theeducationmatch.com/
              </a>
              , as well as email communications received from{" "}
              <a
                href="mailto:contact@theeducationmatch.com"
                className="text-blue-600 hover:underline"
              >
                contact@theeducationmatch.com
              </a>{" "}
              and text messages received from +91 9867738692 [collectively,
              referred to as the “Platform”].
            </p>
            <p className="text-slate-500">
              Ubuntu Ideas Private Limited, a Company located at, 5021, 1
              Aerocity Corporate Park, Saki Naka, Andheri East, Mumbai, 400072,
              India [“The Education Match”], owns and operates the Platform. The
              Education Match recognizes the importance of maintaining the
              privacy of the information provided by you and is committed to
              protect your privacy.
            </p>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                1. DEFINITIONS
              </h2>
              <p className="text-slate-500 font-medium">
                Personal Information:
              </p>
              <p className="text-slate-500">
                as defined under the SPI Rules means any information that
                relates to a natural person, which, either directly or
                indirectly, in combination with other information available or
                likely to be available to a body corporate, is capable of
                identifying such person.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                2. OBJECTIVE OF THIS PRIVACY POLICY
              </h2>
              <p className="text-slate-500">
                This Privacy Policy is published in compliance with Section 43A
                of the Information Technology Act, 2000 and the SPI Rules. It
                mentions the type of information collected from the Users, the
                purpose, means and modes of usage of such information and how
                and to whom such information may be disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                3. WHAT WE COLLECT:
              </h2>
              <p className="text-slate-500">
                We collect contact information (name, email, password), academic
                information from students (date of birth, academics, interests),
                and payment/billing information where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                4. WHAT WE DO WITH THE INFORMATION WE GATHER
              </h2>
              <p className="text-slate-500 mb-3">
                We will be collecting the data for the purpose of career
                counselling and guidance. This data will not be shared to third
                party or sponsors unless the user makes a connection or applies
                to the university or partner. Or if the students shares his or
                her own data to the sponsor or partner through the platform.
              </p>
              <p className="text-slate-500 mb-3">
                The used data will be collected for Career Psychology Guidance,
                Academic Counselling, Application Counselling and Admission
                Counselling.
              </p>
              <p className="text-slate-500">
                We use your information for providing Services, improving
                quality, transactional communications, financial transactions,
                and research/analysis.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                5. BASIS OF PROCESSING
              </h2>
              <p className="text-slate-500 mb-2">
                We process personal data based on:
              </p>
              <ul className="list-disc pl-5 text-slate-500 space-y-1">
                <li>
                  Consent obtained from the Data Principal, where required;
                  and/or
                </li>
                <li>
                  Legitimate use permitted under the DPDP Act, including legal,
                  contractual, and compliance obligations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                6. THIRD PARTY
              </h2>
              <p className="text-slate-500 mb-3">
                Please be aware that The Education Match sometimes contains
                links to other sites that are not governed by this Privacy
                Policy. Visitors to this website may be directed to third-party
                sites for more information.
              </p>
              <p className="text-slate-500">
                Career Ready India Initiative will be monetising through various
                tie-ups from Institutions and Universities and other sponsors by
                means of advertising, and admission promotions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                7. CHILDREN
              </h2>
              <p className="text-slate-500 mb-3">
                In Indian jurisdiction if you are under the age of 18 or the age
                of majority in your jurisdiction, you must use The Education
                Match under the supervision of your parent, legal guardian or
                responsible adult.
              </p>
              <p className="text-slate-500">
                We would need a parent or guardian mobile mandatory number since
                the child is a minor and the consent is required. Also, all the
                student development is shared on the parents WhatsApp. They can
                choose to opt out at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                8. USAGE DATA
              </h2>
              <p className="text-slate-500">
                We may also collect information that the User’s browser sends
                whenever you visit the Platform, such as IP address, browser
                type, pages visited, and time spent on those pages.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                9. RETENTION OF DATA
              </h2>
              <p className="text-slate-500">
                The Education Match retains the Personal Information only for as
                long as it is necessary for the purposes mentioned herein and
                for the duration for which the Service is provided.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                10. YOUR RIGHTS:
              </h2>
              <p className="text-slate-500 mb-4">
                You are entitled to exercise the following rights in relation to
                your Personal Data held by The Education Match:
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-700 font-medium">
                    a. Right to Access:
                  </p>
                  <p className="text-slate-500">
                    You have the right to obtain confirmation as to whether your
                    personal data is being processed by The Education Match's
                    and to access a summary of your personal data along with the
                    identities of all other parties with whom your Personal Data
                    has been shared.
                  </p>
                </div>
                <div>
                  <p className="text-slate-700 font-medium">
                    b. Right to Correction:
                  </p>
                  <p className="text-slate-500">
                    You have the right to request correction of any inaccurate,
                    incomplete, misleading, or outdated personal data concerning
                    you;
                  </p>
                </div>
                <div>
                  <p className="text-slate-700 font-medium">
                    c. Right to Erasure:
                  </p>
                  <p className="text-slate-500">
                    You have the right to request deletion or erasure of your
                    personal data, subject to legal obligations and retention
                    requirements under applicable laws. The Education Match's
                    may retain certain data where required by law or for
                    legitimate purposes such as ongoing program administration
                    or legal compliance;
                  </p>
                </div>
                <div>
                  <p className="text-slate-700 font-medium">
                    d. Right to Withdraw Consent:
                  </p>
                  <p className="text-slate-500">
                    You have the right to withdraw such consent at any time.
                    However, withdrawal of consent shall not affect the
                    lawfulness of processing based on consent before its
                    withdrawal and may affect your ability to participate in or
                    receive benefits under the Program;
                  </p>
                </div>
                <div>
                  <p className="text-slate-700 font-medium">
                    e. Right to Nominate:
                  </p>
                  <p className="text-slate-500">
                    You have the right to nominate any other individual to
                    exercise your rights, in the event of your death or
                    incapacity;
                  </p>
                </div>
                <div>
                  <p className="text-slate-700 font-medium">
                    f. Right to Grievance Redressal:
                  </p>
                  <p className="text-slate-500">
                    You have the right to lodge a complaint with The Education
                    Match's Grievance Officer / designated personnel (contact
                    details provided in Clause 11) regarding any grievance
                    related to the processing of your Personal Data.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                11. GRIEVANCE OFFICER:
              </h2>
              <p className="text-slate-500 mb-3">
                The Education Match has appointed a Grievance Officer to address
                concerns related to personal data processing.
              </p>
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 space-y-2 text-slate-600 mb-3">
                <p>
                  <span className="font-medium">Grievance Officer</span> –
                </p>
                <p>
                  <span className="font-medium">📧 Email:</span>@
                </p>
                <p>
                  <span className="font-medium">📞 Contact:</span>
                </p>
                <p>
                  <span className="font-medium">
                    📍 Registered Office:
                  </span>{" "}
                </p>
              </div>
              <p className="text-slate-500">
                If you are not satisfied with the resolution provided by the
                Grievance Officer, you have the right to file a complaint with
                the Data Protection Board of India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                12. SECURITY SAFEGUARDS
              </h2>
              <p className="text-slate-500">
                We implement reasonable technical and organizational measures to
                safeguard personal data against unauthorized access, disclosure,
                alteration, or loss of personal data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-slate-700 mb-2">
                13. CHANGES OR UPDATES TO THIS NOTICE:
              </h2>
              <p className="text-slate-500 mb-4">
                The Education Match reserves the right to change this privacy
                statement as it may be considered necessary from time to time or
                as may be required by law. Any changes will be immediately
                posted on the Website, and you are deemed to have accepted the
                terms of the privacy statement on your first use of the Website
                following the alterations.
              </p>
              <div className="border-t border-slate-100 pt-6">
                <p className="font-medium text-slate-700">
                  The Education Match
                </p>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Simplifying the toughest decision in every student's life.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
