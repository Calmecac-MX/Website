"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import Header from "@/components/Header";
import PlanHero from "@/components/PlanHero";
import PlanMes1 from "@/components/PlanMes1";
import PlanMes2 from "@/components/PlanMes2";
import PlanMes3 from "@/components/PlanMes3";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BottomMenu from "@/components/BottomMenu";

export default function PlanClient() {
  const animatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 6; // Hero, Mes 1, Mes 2, Mes 3, Contacto, Footer

  const [activeMes1Card, _setActiveMes1Card] = useState(0);
  const activeMes1CardRef = useRef(0);
  const setActiveMes1Card = (val: number | ((prev: number) => number)) => {
    if (typeof val === "function") {
      _setActiveMes1Card((prev) => {
        const next = val(prev);
        activeMes1CardRef.current = next;
        return next;
      });
    } else {
      _setActiveMes1Card(val);
      activeMes1CardRef.current = val;
    }
  };

  const [activeMes2Card, _setActiveMes2Card] = useState(0);
  const activeMes2CardRef = useRef(0);
  const setActiveMes2Card = (val: number | ((prev: number) => number)) => {
    if (typeof val === "function") {
      _setActiveMes2Card((prev) => {
        const next = val(prev);
        activeMes2CardRef.current = next;
        return next;
      });
    } else {
      _setActiveMes2Card(val);
      activeMes2CardRef.current = val;
    }
  };

  const [activeMes3Card, _setActiveMes3Card] = useState(0);
  const activeMes3CardRef = useRef(0);
  const setActiveMes3Card = (val: number | ((prev: number) => number)) => {
    if (typeof val === "function") {
      _setActiveMes3Card((prev) => {
        const next = val(prev);
        activeMes3CardRef.current = next;
        return next;
      });
    } else {
      _setActiveMes3Card(val);
      activeMes3CardRef.current = val;
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

    if (nextIndex === 1 && window.innerWidth < 768) {
      setActiveMes1Card(dir === 1 ? 0 : 3);
    } else if (nextIndex === 2 && window.innerWidth < 768) {
      setActiveMes2Card(dir === 1 ? 0 : 3);
    } else if (nextIndex === 3 && window.innerWidth < 768) {
      setActiveMes3Card(dir === 1 ? 0 : 2);
    }

    const prevSlide = document.getElementById(`plan-slide-${prevIndex}`);
    const nextSlide = document.getElementById(`plan-slide-${nextIndex}`);

    if (!nextSlide) {
      animatingRef.current = false;
      return;
    }

    const prevOuter = prevSlide?.querySelector(".outer");
    const prevInner = prevSlide?.querySelector(".inner");
    const nextOuter = nextSlide.querySelector(".outer");
    const nextInner = nextSlide.querySelector(".inner");

    const nextBg = nextSlide.querySelector(
      ".hero-inner, .plan-section, .contact-layout, .footer-quote-inner"
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

  const handleNavigate = (id: string, slideIdx: number) => {
    goToSlide(slideIdx);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let observerInstance: any = null;
    let isSliderActive = false;

    const setupSlider = () => {
      if (isSliderActive) return;
      isSliderActive = true;

      document.body.classList.add("swipe-slider-active");

      const total = 6;
      setActiveSlide(currentIndexRef.current);
      for (let i = 0; i < total; i++) {
        const slide = document.getElementById(`plan-slide-${i}`);
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

      gsap.registerPlugin(Observer);
      observerInstance = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        axis: "y",
        onDown: () => {
          if (animatingRef.current) return;
          
          const idx = currentIndexRef.current;
          const isMobile = window.innerWidth < 768;

          if (idx === 1 && isMobile && activeMes1CardRef.current > 0) {
            setActiveMes1Card(prev => prev - 1);
          } else if (idx === 2 && isMobile && activeMes2CardRef.current > 0) {
            setActiveMes2Card(prev => prev - 1);
          } else if (idx === 3 && isMobile && activeMes3CardRef.current > 0) {
            setActiveMes3Card(prev => prev - 1);
          } else {
            goToSlide(idx - 1, -1);
          }
        },
        onUp: () => {
          if (animatingRef.current) return;
          
          const idx = currentIndexRef.current;
          const isMobile = window.innerWidth < 768;

          if (idx === 1 && isMobile && activeMes1CardRef.current < 3) {
            setActiveMes1Card(prev => prev + 1);
          } else if (idx === 2 && isMobile && activeMes2CardRef.current < 3) {
            setActiveMes2Card(prev => prev + 1);
          } else if (idx === 3 && isMobile && activeMes3CardRef.current < 2) {
            setActiveMes3Card(prev => prev + 1);
          } else {
            goToSlide(idx + 1, 1);
          }
        },
        tolerance: 15,
        preventDefault: true,
        ignore: "input, textarea, select, button, a, [role='dialog']",
      } as any);
    };

    setupSlider();

    const handleResize = () => {
      setupSlider();
    };
    window.addEventListener("resize", handleResize);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const id = href.slice(1);
          if (id === "" || id === "plan-hero") {
            goToSlide(0);
          } else {
            const element = document.getElementById(id);
            if (element) {
              const slide = element.closest(".swipe-section");
              if (slide) {
                const slideIndex = parseInt(slide.id.split("-")[2], 10); // ID: plan-slide-X
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
      if (animatingRef.current) return;

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
  }, [goToSlide]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow swipe-container" style={{ background: "var(--black)" }}>
        {/* Slide 0: Hero */}
        <div className="swipe-section" id="plan-slide-0">
          <div className="outer">
            <div className="inner">
              <PlanHero isActive={activeSlide === 0} />
            </div>
          </div>
        </div>

        {/* Slide 1: Mes 1 */}
        <div className="swipe-section" id="plan-slide-1">
          <div className="outer">
            <div className="inner">
              <PlanMes1 
                isActive={activeSlide === 1} 
                activeCard={activeMes1Card}
                onChangeCard={setActiveMes1Card}
              />
            </div>
          </div>
        </div>

        {/* Slide 2: Mes 2 */}
        <div className="swipe-section" id="plan-slide-2">
          <div className="outer">
            <div className="inner">
              <PlanMes2 
                isActive={activeSlide === 2} 
                activeCard={activeMes2Card}
                onChangeCard={setActiveMes2Card}
              />
            </div>
          </div>
        </div>

        {/* Slide 3: Mes 3 */}
        <div className="swipe-section" id="plan-slide-3">
          <div className="outer">
            <div className="inner">
              <PlanMes3 
                isActive={activeSlide === 3} 
                activeCard={activeMes3Card}
                onChangeCard={setActiveMes3Card}
              />
            </div>
          </div>
        </div>

        {/* Slide 4: Contacto */}
        <div className="swipe-section" id="plan-slide-4">
          <div className="outer">
            <div className="inner">
              <ContactSection isActive={activeSlide === 4} />
            </div>
          </div>
        </div>

        {/* Slide 5: Cierre / Footer */}
        <div className="swipe-section" id="plan-slide-5">
          <div className="outer">
            <div className="inner">
              <Footer onNavigate={(id) => handleNavigate(id, 4)} />
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Dots */}
      <div className="nav-dots">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const names = ["Inicio", "Mes 1", "Mes 2", "Mes 3", "Contacto", "Cierre"];
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

      <BottomMenu activeSlide={activeSlide} />
    </div>
  );
}
