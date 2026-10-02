import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import CRILoaderIcon from "../pages/CRILoaderIcon";

export default function Footer() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const src = searchParams.get("src") || "";

  let applyUrl = "/apply";
  let homeUrl = "/";
  let dubaipage = "/dubai";
  let privacyUrl = "/privacy";
  let termsUrl = "/terms";
  const urlParams = new URLSearchParams();
  if (id) urlParams.append("id", id);
  if (src) urlParams.append("src", src);
  const paramStr = urlParams.toString();
  if (paramStr) {
    applyUrl = `/apply?${paramStr}`;
    homeUrl = `/?${paramStr}`;
    privacyUrl = `/privacy?${paramStr}`;
    termsUrl = `/terms?${paramStr}`;
  }
  return (
    <footer
      className="relative bg-[#161617] pt-20 pb-10 overflow-hidden mt-auto"
    >
      {/* Decorative background glows */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" /> */}
      {/* <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" /> */}

      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & About (Takes more space) */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link to={homeUrl} className="inline-flex items-center gap-4 mb-6 group">
              <CRILoaderIcon className="h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity" dark={true} />
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                  Career Ready India
                </span>
              </div>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              A national initiative to equip schools with everything they need
              to make every student career ready, providing professional tools
              and guidance at zero cost to selected schools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="text-gray-200 text-sm font-medium uppercase tracking-[0.1em] mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to={homeUrl}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to={dubaipage}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Dubai
                </Link>
              </li>

              <li>
                <Link
                  to={applyUrl}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-gray-200 text-sm font-semibold uppercase tracking-[0.15em] mb-6">
              Stay Connected
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              For questions regarding applications and programme details,
              schools may reach out through their application contact.
            </p>
            <Link
              to={applyUrl}
              className="group inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              <Mail size={16} className="text-blue-400" />
              <span>Contact Support</span>
              <ArrowRight
                size={14}
                className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-300 font-medium">
            © {new Date().getFullYear()} Career Ready India Initiative. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to={privacyUrl}
              className="text-xs text-slate-300 hover:text-slate-100 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to={termsUrl}
              className="text-xs text-slate-300 hover:text-slate-100 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
