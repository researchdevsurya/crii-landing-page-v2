import React, { useEffect, useRef, useState } from "react";

const WORDS = ["Courses", "Careers", "Colleges", "Pathways"];

export default function NeedFor() {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      let p = -rect.top / scrollDistance;
      p = Math.max(0, Math.min(1, p));

      setProgress(p);

      // ============================================
      // WORD PROGRESS (0 to 0.62)
      // ============================================
      const wordProgress = Math.min(p / 0.62, 0.9999);
      const index = Math.floor(wordProgress * WORDS.length);
      setActiveWord(Math.max(0, Math.min(WORDS.length - 1, index)));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ================================================
  // EASING
  // ================================================
  const ease = (value) => {
    return value * value * (3 - 2 * value);
  };

  // ================================================
  // BLACK → WHITE TRANSITION
  // ================================================
  const bgStart = 0.65;
  const bgProgress = Math.max(
    0,
    Math.min(1, (progress - bgStart) / (1 - bgStart)),
  );
  const bgEase = ease(bgProgress);

  const backgroundColor = `rgb(
    ${Math.round(9 + 246 * bgEase)},
    ${Math.round(11 + 244 * bgEase)},
    ${Math.round(16 + 239 * bgEase)}
  )`;

  // ================================================
  // MAIN CONTENT OPACITY
  // ================================================
  const mainOpacity = 1 - bgEase;

  // ================================================
  // FINAL SENTENCE
  // ================================================
  const sentenceProgress = Math.max(0, Math.min(1, (progress - 0.76) / 0.18));
  const sentenceEase = ease(sentenceProgress);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "360vh",
      }}
    >
      {/* ==================================================
          STICKY SCREEN
      ================================================== */}
      <div
        className="
          sticky
          top-0
          flex
          h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          backgroundColor,
        }}
      >
        {/* ==================================================
            NEED FOR EYEBROW
        ================================================== */}

        {/* ==================================================
            MORE + SCROLLING WORDS REEL (PERFECTLY CENTERED)
        ================================================== */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-4
            sm:px-8
          "
          style={{
            opacity: mainOpacity,
            "--row-height": "clamp(4.2rem, 10.5vw, 11.5rem)",
          }}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7">
            {/* MORE */}
            <div className="flex h-[var(--row-height)] shrink-0 items-center">
              <h1
                className="
                  select-none
                  whitespace-nowrap
                  text-[clamp(2.2rem,7.5vw,8.5rem)]
                  font-semibold
                  leading-none
                  text-white
                "
              >
                More
              </h1>
            </div>

            {/* WORDS REEL */}
            <div
              className="
                relative
                w-fit
                overflow-hidden
                py-2
              "
              style={{
                height: "calc(var(--row-height) * 3.6)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
              }}
            >
              {/* Invisible spacer matching exact font styles with generous right clearance */}
              <div
                className="invisible h-0 select-none overflow-hidden pr-6 sm:pr-10 md:pr-14"
                aria-hidden="true"
              >
                <span className="block whitespace-nowrap text-[clamp(2.2rem,7.5vw,8.5rem)] font-semibold leading-none">
                  Pathways.
                </span>
              </div>

              <div
                className="
                  absolute
                  left-0
                  flex
                  w-full
                  flex-col
                  transition-transform
                  duration-600
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                "
                style={{
                  top: "50%",
                  transform: `translateY(calc(-${activeWord} * var(--row-height) - var(--row-height) * 0.5))`,
                }}
              >
                {WORDS.map((word, index) => {
                  const distance = Math.abs(index - activeWord);

                  // Dim & faint logic for inactive words
                  const opacity =
                    distance === 0
                      ? 1
                      : distance === 1
                        ? 0.25
                        : distance === 2
                          ? 0.08
                          : 0.02;

                  const scale =
                    distance === 0 ? 1 : distance === 1 ? 0.96 : 0.92;

                  const blur =
                    distance === 0
                      ? "none"
                      : `blur(${Math.min(distance * 0.7, 1.5)}px)`;

                  return (
                    <div
                      key={word}
                      className="
                        flex
                        h-[var(--row-height)]
                        shrink-0
                        items-center
                        pr-4
                      "
                    >
                      <span
                        className="
                          block
                          select-none
                          whitespace-nowrap
                          text-[clamp(2.2rem,7.5vw,8.5rem)]
                          font-semibold
                          leading-none
                          text-white
                          transition-all
                          duration-600
                          ease-[cubic-bezier(0.16,1,0.3,1)]
                        "
                        style={{
                          opacity,
                          transform: `scale(${scale})`,
                          transformOrigin: "left center",
                          filter: blur,
                        }}
                      >
                        {word}.
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            PROGRESS DOTS / PILLS
        ================================================== */}
        <div
          className="
            absolute
            bottom-[8%]
            left-1/2
            flex
            -translate-x-1/2
            items-center
            gap-2
          "
          style={{
            opacity: mainOpacity,
          }}
        >
          {WORDS.map((word, index) => (
            <span
              key={word}
              className="
                block
                h-[3px]
                rounded-full
                transition-all
                duration-500
              "
              style={{
                width: index === activeWord ? "32px" : "7px",
                backgroundColor:
                  index === activeWord
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* ==================================================
            FINAL SENTENCE (Reveals on white transition)
        ================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-6
            sm:px-10
            md:px-20
          "
          style={{
            opacity: sentenceEase,
            transform: `translateY(${30 - sentenceEase * 30}px)`,
          }}
        >
          <p
            className="
              w-full
              max-w-9xl
              text-center
              text-[clamp(1.5rem,3.5vw,7rem)]
              font-medium
              leading-[1.12]
              tracking-[-0.035em]
              text-[#090b10]
            "
          >
            But important decisions are still made in untimely chaos, without
            enough information.
          </p>
        </div>
      </div>
    </section>
  );
}
