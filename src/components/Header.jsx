import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(pathname !== "/");
  const id = searchParams.get("id") || "";
  const src = searchParams.get("src") || "";

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      // Reveal smoothly when scrolled past top hero (~120px)
      if (window.scrollY > 120) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle hash scrolling if navigating from another page with #hash
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  let applyUrl = "/apply";
  let homeUrl = "/";
  const urlParams = new URLSearchParams();
  if (id) urlParams.append("id", id);
  if (src) urlParams.append("src", src);
  const paramStr = urlParams.toString();
  if (paramStr) {
    applyUrl = `/apply?${paramStr}`;
    homeUrl = `/?${paramStr}`;
  }

  const handleNavClick = (sectionId, e) => {
    if (e) e.preventDefault();
    setOpen(false);

    if (pathname === "/") {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(
        `/${paramStr ? `?${paramStr}` : ""}${sectionId !== "home" ? `#${sectionId}` : ""}`,
      );
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#f5f5f7]/80 backdrop-blur-md border-b border-black/[0.08] transition-all duration-300 ease-in-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto h-12 sm:h-14 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Name */}
        <div className="flex items-center">
          <button
            onClick={(e) => handleNavClick("home", e)}
            className="text-base sm:text-lg font-semibold tracking-tight text-[#1d1d1f] hover:opacity-80 transition-opacity"
          >
            Career Ready India
          </button>
        </div>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            onClick={(e) => handleNavClick("home", e)}
            className="text-xs sm:text-sm font-normal text-[#1d1d1f]/80 hover:text-[#0071e3] transition-colors"
          >
            Home
          </button>

          <button
            onClick={(e) => handleNavClick("highlights", e)}
            className="text-xs sm:text-sm font-normal text-[#1d1d1f]/80 hover:text-[#0071e3] transition-colors"
          >
            Highlights
          </button>

          <button
            onClick={(e) => handleNavClick("platform", e)}
            className="text-xs sm:text-sm font-normal text-[#1d1d1f]/80 hover:text-[#0071e3] transition-colors"
          >
            Platform
          </button>

          <button
            onClick={(e) => handleNavClick("features", e)}
            className="text-xs sm:text-sm font-normal text-[#1d1d1f]/80 hover:text-[#0071e3] transition-colors"
          >
            Features
          </button>

          <Link
            to={applyUrl}
            className="inline-flex items-center justify-center bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-normal px-4 py-1 sm:py-1.5 rounded-full transition-all shadow-sm active:scale-95 no-underline"
          >
            Apply
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to={applyUrl}
            className="inline-flex items-center justify-center bg-[#0071e3] text-white text-xs font-normal px-3 py-1 rounded-full no-underline"
          >
            Apply
          </Link>
          <button
            className="p-1.5 text-neutral-800 hover:text-black transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#f5f5f7]/95 backdrop-blur-md border-b border-black/[0.08] ${
          open ? "max-h-72 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="px-6 space-y-3">
          <button
            onClick={(e) => handleNavClick("home", e)}
            className="block w-full text-left py-1.5 text-sm font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
          >
            Home
          </button>
          <button
            onClick={(e) => handleNavClick("highlights", e)}
            className="block w-full text-left py-1.5 text-sm font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
          >
            Highlights
          </button>
          <button
            onClick={(e) => handleNavClick("platform", e)}
            className="block w-full text-left py-1.5 text-sm font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
          >
            Platform
          </button>
          <button
            onClick={(e) => handleNavClick("features", e)}
            className="block w-full text-left py-1.5 text-sm font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
          >
            Features
          </button>
        </div>
      </div>
    </header>
  );
}
