import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CRILoaderIcon from "./pages/CRILoaderIcon";
import DubaiHomePage from "./pages/Dubai/DubaiHomePage";
import MainPage from "./pages/V2/MainPage";
import FeatureSection from "./pages/V2/FeatureSection";
import DeviceShowcase from "./pages/V2/DeviceShowcase";
import CinematicScrollGallery from "./pages/V2/CinematicScrollGallery";
import PhotoWallScroll from "./pages/V2/PhotoWallScroll";
import AudienceSection from "./pages/V2/AudienceSection";
import AppleScrollSection from "./pages/V2/AppleScrollSection";
import StudentPathwaysHero from "./pages/V2/StudentPathwaysHero";
import ExploreBeforeYouDecide from "./pages/V2/ZeroCostSection";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 800,
      offset: 50,
      easing: "ease-out-cubic",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Play videos only when they enter the viewport and pause when they leave
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.15, // Starts playing when 15% visible in viewport
      },
    );

    const observeAllVideos = () => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        if (!video.dataset.inviewObserved) {
          video.dataset.inviewObserved = "true";
          video.muted = true;
          video.setAttribute("playsinline", "");
          observer.observe(video);
        }
      });
    };

    observeAllVideos();

    // Observe dynamically mounted videos (e.g., page navigation, lazy-loaded components)
    const mutationObserver = new MutationObserver(() => {
      observeAllVideos();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-white">
        <CRILoaderIcon className="w-16 h-auto" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen flex flex-col bg-white relative">
        <Header />
        <div className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<MainPage />} />
            <Route path="/fet" element={<DeviceShowcase />} />
            <Route path="/scroll" element={<CinematicScrollGallery />} />
            <Route path="/audience" element={<AudienceSection />} />
            <Route path="/apple" element={<AppleScrollSection />} />
            <Route path="/wall" element={<PhotoWallScroll />} />
            <Route path="/pathways" element={<StudentPathwaysHero />} />
            <Route path="/explore" element={<ExploreBeforeYouDecide />} />

            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/dubai" element={<DubaiHomePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
