import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * TrustedByLeaders  Light Theme (Full Color Logos)
 *
 * A clean, light‑background component that matches the provided image design.
 * Displays a random selection of at least 12 logos from a large array (1000+).
 * Logos are shown in full color, with a subtle fade effect on hover.
 */

// Sample logo data  replace with your own array of 1000+ entries
const sampleLogos = [
  {
    id: 1,
    name: "Google",
    src: "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.faa49ab5e1fff880.webp",
  },
  {
    id: 2,
    name: "Microsoft",
    src: "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.faa49ab5e1fff880.webp",
  },
  {
    id: 3,
    name: "Amazon",
    src: "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.faa49ab5e1fff880.webp",
  },
  {
    id: 4,
    name: "Apple",
    src: "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.faa49ab5e1fff880.webp",
  },
  {
    id: 5,
    name: "Facebook",
    src: "https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.jpg",
  },
  { id: 6, name: "Tesla", src: "https://logo.clearbit.com/tesla.com" },
  {
    id: 7,
    name: "Netflix",
    src: "https://images.seeklogo.com/logo-png/25/1/netflix-logo-png_seeklogo-256429.png",
  },
  {
    id: 8,
    name: "Adobe",
    src: "https://images.seeklogo.com/logo-png/25/1/netflix-logo-png_seeklogo-256429.png",
  },
  {
    id: 9,
    name: "Salesforce",
    src: "https://media.licdn.com/dms/image/v2/D4D22AQEzIUF30wj0FQ/feedshare-shrink_800/B4DZniRBtQKQAg-/0/1760437740090?e=2147483647&v=beta&t=K_1RSdYmafdM6JyrvUL5Jh6IZtQ_LKtFOzQ9WUSYvVM",
  },
  {
    id: 10,
    name: "Oracle",
    src: "https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.jpg",
  },
  {
    id: 11,
    name: "IBM",
    src: "https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.jpg",
  },
  {
    id: 12,
    name: "Intel",
    src: "https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.jpg",
  },
  {
    id: 13,
    name: "Cisco",
    src: "https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.jpg",
  },
  {
    id: 14,
    name: "PayPal",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLJH0VRmv2TwTjVR5i2HOpG1mtpmvu2WwNQ&s",
  },
  {
    id: 15,
    name: "Uber",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s",
  },
  {
    id: 16,
    name: "Airbnb",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSs-jfFCBPhZasWPx2RCGMqf5oVhw0QszGvQ&s",
  },
  {
    id: 17,
    name: "Spotify",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSs-jfFCBPhZasWPx2RCGMqf5oVhw0QszGvQ&s",
  },
  {
    id: 18,
    name: "Slack",
    src: "https://media.licdn.com/dms/image/v2/D4D22AQEzIUF30wj0FQ/feedshare-shrink_800/B4DZniRBtQKQAg-/0/1760437740090?e=2147483647&v=beta&t=K_1RSdYmafdM6JyrvUL5Jh6IZtQ_LKtFOzQ9WUSYvVM",
  },
  {
    id: 19,
    name: "Zoom",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLJH0VRmv2TwTjVR5i2HOpG1mtpmvu2WwNQ&s",
  },
  {
    id: 20,
    name: "Shopify",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLJH0VRmv2TwTjVR5i2HOpG1mtpmvu2WwNQ&s",
  },
  // Add up to 1000+ entries as needed
];

export default function TrustedByLeaders({ logos = sampleLogos }) {
  const [selectedLogos, setSelectedLogos] = useState([]);

  useEffect(() => {
    // Randomly select 36 logos to ensure enough for three rows
    const count = Math.min(logos.length, 36);
    const shuffled = [...logos].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count);
    setSelectedLogos(picked);
  }, [logos]);

  const third = Math.ceil(selectedLogos.length / 3);
  const row1 = selectedLogos.slice(0, third);
  const row2 = selectedLogos.slice(third, third * 2);
  const row3 = selectedLogos.slice(third * 2);

  return (
    <section className="bg-white relative py-20 md:py-28 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* ─── HEADER ─── */}
        <div className="text-center max-w-5xl mx-auto mb-16" data-aos="fade-up">
          {/* Badge  "Testimonials" */}
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600 bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-100/50 mb-5">
            Partner Schools
          </span>

          {/* Main heading  two lines */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-[-0.025em] text-[#14213D]">
            Trusted by forward-thinking
            <br />
            <span className="text-[#1D4ED8]">schools across the country</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#475569] max-w-3xl mx-auto">
            Join a rapidly growing network of educational institutions equipping
            their students with comprehensive, world-class career readiness.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400/60" />
            <span className="w-2 h-2 rounded-full bg-blue-500/80" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400/60" />
          </div>
        </div>

        {/* ─── LOGO MARQUEE ─── */}
        {selectedLogos.length > 0 && (
          <div
            className="flex flex-col gap-6 md:gap-8 mt-16 overflow-hidden relative w-full mask-edges"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* ROW 1 */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-6 md:gap-8 px-3 md:px-4">
                  {row1.map((logo, index) => (
                    <div
                      key={`${logo.id || index}-r1-${i}`}
                      className="bg-gray-50/80 border border-gray-200/60 rounded-2xl p-5 md:p-8 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-blue-300/50 hover:bg-white w-44 md:w-56 shrink-0"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name || "Logo"}
                        className="max-h-12 md:max-h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ROW 2 */}
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-6 md:gap-8 px-3 md:px-4">
                  {row2.map((logo, index) => (
                    <div
                      key={`${logo.id || index}-r2-${i}`}
                      className="bg-gray-50/80 border border-gray-200/60 rounded-2xl p-5 md:p-8 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-blue-300/50 hover:bg-white w-44 md:w-56 shrink-0"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name || "Logo"}
                        className="max-h-12 md:max-h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ROW 3 */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-6 md:gap-8 px-3 md:px-4">
                  {row3.map((logo, index) => (
                    <div
                      key={`${logo.id || index}-r3-${i}`}
                      className="bg-gray-50/80 border border-gray-200/60 rounded-2xl p-5 md:p-8 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-blue-300/50 hover:bg-white w-44 md:w-56 shrink-0"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name || "Logo"}
                        className="max-h-12 md:max-h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* ─── CUSTOM MARQUEE ANIMATIONS ─── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 80s linear infinite;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%);
        }
      `}</style>
    </section>
  );
}
