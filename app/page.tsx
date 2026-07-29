"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Timeline from "@/components/Timeline";
import AboutSection2 from "@/components/AboutSection2";
import CtaAviso from "@/components/CtaAviso";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BottomMenu from "@/components/BottomMenu";

if (typeof window !== "undefined") {
  gsap.registerEffect({
    name: "hoverGlow",
    effect: (targets: gsap.DOMTarget, config: any) => {
      return gsap.to(targets, {
        color: config.color,
        textShadow: `0 0 12px ${config.glowColor}`,
        scale: config.scale,
        y: config.y,
        duration: config.duration,
        ease: "back.out(2)",
      });
    },
    defaults: {
      color: "#2ECDB7",
      glowColor: "rgba(46, 205, 183, 0.6)",
      scale: 1.15,
      y: -6,
      duration: 0.3,
    },
    extendTimeline: true,
  });

  gsap.registerEffect({
    name: "hoverReset",
    effect: (targets: gsap.DOMTarget, config: any) => {
      return gsap.to(targets, {
        color: config.color,
        textShadow: "none",
        scale: 1,
        y: 0,
        duration: config.duration,
        ease: "power2.out",
      });
    },
    defaults: {
      color: "",
      duration: 0.3,
    },
    extendTimeline: true,
  });
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const animatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 7; // Hero, About, Timeline, About2, CtaAviso, Contact, Footer

  const [activeTimelineCard, _setActiveTimelineCard] = useState(0);
  const activeTimelineCardRef = useRef(0);
  const setActiveTimelineCard = (val: number | ((prev: number) => number)) => {
    if (typeof val === "function") {
      _setActiveTimelineCard((prev) => {
        const next = val(prev);
        activeTimelineCardRef.current = next;
        return next;
      });
    } else {
      _setActiveTimelineCard(val);
      activeTimelineCardRef.current = val;
    }
  };



  const goToSlide = useCallback((index: number, direction: number = 0) => {
    if (animatingRef.current) return;

    const wrap = gsap.utils.wrap(0, totalSlides);
    const nextIndex = wrap(index);
    const prevIndex = currentIndexRef.current;

    if (nextIndex === prevIndex && direction === 0) return;

    animatingRef.current = true;

    let dir = direction;
    if (dir === 0) {
      dir = nextIndex > prevIndex ? 1 : -1;
    }

    if (nextIndex === 2 && window.innerWidth < 768) {
      setActiveTimelineCard(dir === 1 ? 0 : 2);
    }

    const prevSlide = document.getElementById(`slide-${prevIndex}`);
    const nextSlide = document.getElementById(`slide-${nextIndex}`);

    if (!nextSlide) {
      animatingRef.current = false;
      return;
    }

    const prevOuter = prevSlide?.querySelector(".outer");
    const prevInner = prevSlide?.querySelector(".inner");
    const nextOuter = nextSlide.querySelector(".outer");
    const nextInner = nextSlide.querySelector(".inner");

    // Targets inside each section to animate (backgrounds/wrappers) for parallax effect
    const nextBg = nextSlide.querySelector(
      ".structure-background, .plan-section, .hero-inner, .callout-grid, .provocation-inner, .contact-layout, .footer-quote-inner"
    );

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power2.inOut" },
      onComplete: () => {
        if (prevSlide) {
          prevSlide.classList.remove("active-slide", "animating-slide");
        }
        nextSlide.classList.add("active-slide");
        nextSlide.classList.remove("animating-slide");
        currentIndexRef.current = nextIndex;
        setActiveSlide(nextIndex);
        animatingRef.current = false;
      },
    });

    nextSlide.classList.add("animating-slide");
    if (nextOuter && nextInner) {
      gsap.set(nextOuter, { yPercent: dir * 100 });
      gsap.set(nextInner, { yPercent: dir * -100 });
    }
    if (nextBg) {
      gsap.set(nextBg, { yPercent: dir * 15 });
    }

    if (prevSlide && prevOuter && prevInner) {
      prevSlide.classList.add("animating-slide");
      tl.to(prevOuter, { yPercent: dir * -100 }, 0)
        .to(prevInner, { yPercent: dir * 100 }, 0);
    }

    if (nextOuter && nextInner) {
      tl.to(nextOuter, { yPercent: 0 }, 0)
        .to(nextInner, { yPercent: 0 }, 0);
    }

    if (nextBg) {
      tl.to(nextBg, { yPercent: 0 }, 0);
    }
  }, []);

  const handleComfortClick = () => {
    const randomStep = Math.random() < 0.5 ? 1 : 2;
    setModalStep(randomStep);
    setIsModalOpen(true);
  };

  const handleModalAccept = () => {
    setIsModalOpen(false);
    goToSlide(5); // Go to ContactSection (slide 5)
  };

  const handleNavigate = (id: string, slideIdx: number) => {
    goToSlide(slideIdx);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let observerInstance: any = null;
    let isSliderActive = false;

    const setupSlider = () => {
      if (isSliderActive) return; // already active
      isSliderActive = true;

      document.body.classList.add("swipe-slider-active");

      // Initialize GSAP positioning for slides
      const total = 7;
      setActiveSlide(currentIndexRef.current);
      for (let i = 0; i < total; i++) {
        const slide = document.getElementById(`slide-${i}`);
        if (slide) {
          const outer = slide.querySelector(".outer");
          const inner = slide.querySelector(".inner");
          if (outer && inner) {
            if (i === currentIndexRef.current) {
              slide.classList.add("active-slide");
              gsap.set(outer, { yPercent: 0 });
              gsap.set(inner, { yPercent: 0 });
            } else {
              slide.classList.remove("active-slide", "animating-slide");
              gsap.set(outer, { yPercent: 100 });
              gsap.set(inner, { yPercent: -100 });
            }
          }
        }
      }

      // Register GSAP Observer Plugin
      gsap.registerPlugin(Observer);
      observerInstance = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        axis: "y",
        onDown: () => {
          if (animatingRef.current || isModalOpen) return;
          
          const idx = currentIndexRef.current;
          const isMobile = window.innerWidth < 768;

          if (idx === 2 && isMobile && activeTimelineCardRef.current > 0) {
            setActiveTimelineCard(prev => prev - 1);
          } else {
            goToSlide(idx - 1, -1);
          }
        },
        onUp: () => {
          if (animatingRef.current || isModalOpen) return;
          
          const idx = currentIndexRef.current;
          const isMobile = window.innerWidth < 768;

          if (idx === 2 && isMobile && activeTimelineCardRef.current < 2) {
            setActiveTimelineCard(prev => prev + 1);
          } else {
            goToSlide(idx + 1, 1);
          }
        },
        tolerance: 15,
        preventDefault: true,
        ignore: "input, textarea, select, button, a",
      } as any);
    };

    // Run setup
    setupSlider();

    // Listen to resize
    const handleResize = () => {
      setupSlider();
    };
    window.addEventListener("resize", handleResize);

    // Intercept clicks on links pointing to page anchor IDs (for sliding navigation)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const id = href.slice(1);
          if (id === "" || id === "hero") {
            goToSlide(0);
          } else {
            const element = document.getElementById(id);
            if (element) {
              const slide = element.closest(".swipe-section");
              if (slide) {
                const slideIndex = parseInt(slide.id.split("-")[1], 10);
                if (!isNaN(slideIndex)) {
                  goToSlide(slideIndex);
                }
              }
            }
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (animatingRef.current || isModalOpen) return;

      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        goToSlide(currentIndexRef.current - 1, -1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        goToSlide(currentIndexRef.current + 1, 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.body.classList.remove("swipe-slider-active");
      if (observerInstance) {
        observerInstance.kill();
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [goToSlide, isModalOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow swipe-container">
        {/* Slide 0: Hero */}
        <div className="swipe-section" id="slide-0">
          <div className="outer">
            <div className="inner">
               <HeroSection onComfortClick={handleComfortClick} onNavigate={handleNavigate} />
            </div>
          </div>
        </div>

        {/* Slide 1: Growth Structure */}
        <div className="swipe-section" id="slide-1">
          <div className="outer">
            <div className="inner">
              <AboutSection isActive={activeSlide === 1} />
            </div>
          </div>
        </div>

        {/* Slide 2: Timeline */}
        <div className="swipe-section" id="slide-2">
          <div className="outer">
            <div className="inner">
              <Timeline 
                isActive={activeSlide === 2} 
                activeCard={activeTimelineCard}
                onChangeCard={setActiveTimelineCard}
              />
            </div>
          </div>
        </div>

        {/* Slide 3: Callout */}
        <div className="swipe-section" id="slide-3">
          <div className="outer">
            <div className="inner">
              <AboutSection2 isActive={activeSlide === 3} onNavigate={handleNavigate} />
            </div>
          </div>
        </div>

        {/* Slide 4: Provocation */}
        <div className="swipe-section" id="slide-4">
          <div className="outer">
            <div className="inner">
               <CtaAviso isActive={activeSlide === 4} onNavigate={handleNavigate} />
            </div>
          </div>
        </div>

        {/* Slide 5: Contact */}
        <div className="swipe-section" id="slide-5">
          <div className="outer">
            <div className="inner">
              <ContactSection isActive={activeSlide === 5} />
            </div>
          </div>
        </div>

        {/* Slide 6: Footer */}
        <div className="swipe-section" id="slide-6">
          <div className="outer">
            <div className="inner">
               <Footer onNavigate={handleNavigate} />
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Dots (visible only when swipe-slider-active is true via CSS) */}
      <div className="nav-dots">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const names = ["Inicio", "Qué Hacemos", "El Plan", "Convocatoria", "Advertencia", "Contacto", "Cierre"];
          return (
            <button
              key={idx}
              className={`nav-dot ${activeSlide === idx ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Ir a la sección ${names[idx]}`}
            >
              <span className="nav-dot-tooltip">{names[idx]}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Fixed Navigation Menu */}
      <BottomMenu activeSlide={activeSlide} />

      {/* Dynamic CtaAviso Modal Overlay */}
      {isModalOpen && (
        <CtaAviso
          isModal={true}
          initialStep={modalStep}
          onAccept={handleModalAccept}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

