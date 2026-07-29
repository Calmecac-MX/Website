"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import Header from "@/components/Header";
import ConvocatoriaHero from "@/components/ConvocatoriaHero";
import ConvocatoriaBeneficios from "@/components/ConvocatoriaBeneficios";
import ConvocatoriaRequisitos from "@/components/ConvocatoriaRequisitos";
import ConvocatoriaProcesoCronograma from "@/components/ConvocatoriaProcesoCronograma";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BottomMenu from "@/components/BottomMenu";
import { useLoader } from "@/components/LoaderContext";

export default function ConvocatoriaClient() {
  const { isLoaded } = useLoader();
  const animatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 6; // Hero, Beneficios, Requisitos, Proceso/Cronograma, Contacto, Footer



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

    const prevSlide = document.getElementById(`convocatoria-slide-${prevIndex}`);
    const nextSlide = document.getElementById(`convocatoria-slide-${nextIndex}`);

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
        if (prevSlide && prevOuter && prevInner) {
          prevSlide.classList.remove("active-slide", "animating-slide");
          gsap.set(prevOuter, { yPercent: dir * -100 });
          gsap.set(prevInner, { yPercent: dir * 100, opacity: 1, scale: 1 });
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
      gsap.set(nextInner, { yPercent: dir * -100, opacity: 0, scale: 0.95 });
    }
    if (nextBg) {
      gsap.set(nextBg, { yPercent: dir * 15 });
    }

    if (prevSlide && prevOuter && prevInner) {
      prevSlide.classList.add("animating-slide");
      tl.to(prevOuter, { yPercent: dir * -100 }, 0)
        .to(prevInner, { yPercent: dir * 100, opacity: 0, scale: 1.05 }, 0);
    }

    if (nextOuter && nextInner) {
      tl.to(nextOuter, { yPercent: 0 }, 0)
        .to(nextInner, { yPercent: 0, opacity: 1, scale: 1 }, 0);
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
        const slide = document.getElementById(`convocatoria-slide-${i}`);
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
          if (!animatingRef.current) {
            goToSlide(currentIndexRef.current - 1, -1);
          }
        },
        onUp: () => {
          if (!animatingRef.current) {
            goToSlide(currentIndexRef.current + 1, 1);
          }
        },
        tolerance: 15,
        preventDefault: true,
        ignore: "input, textarea, select, button, a",
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
          if (id === "" || id === "convocatoria-hero") {
            goToSlide(0);
          } else {
            const element = document.getElementById(id);
            if (element) {
              const slide = element.closest(".swipe-section");
              if (slide) {
                const slideIndex = parseInt(slide.id.split("-")[2], 10); // ID: convocatoria-slide-X
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
        <div className="swipe-section" id="convocatoria-slide-0">
          <div className="outer">
            <div className="inner">
               <ConvocatoriaHero isActive={activeSlide === 0 && isLoaded} />
            </div>
          </div>
        </div>

        {/* Slide 1: Beneficios */}
        <div className="swipe-section" id="convocatoria-slide-1">
          <div className="outer">
            <div className="inner">
              <ConvocatoriaBeneficios isActive={activeSlide === 1} />
            </div>
          </div>
        </div>

        {/* Slide 2: Requisitos */}
        <div className="swipe-section" id="convocatoria-slide-2">
          <div className="outer">
            <div className="inner">
              <ConvocatoriaRequisitos isActive={activeSlide === 2} />
            </div>
          </div>
        </div>

        {/* Slide 3: Proceso y Cronograma */}
        <div className="swipe-section" id="convocatoria-slide-3">
          <div className="outer">
            <div className="inner">
              <ConvocatoriaProcesoCronograma isActive={activeSlide === 3} />
            </div>
          </div>
        </div>

        {/* Slide 4: Formulario de Postulación */}
        <div className="swipe-section" id="convocatoria-slide-4">
          <div className="outer">
            <div className="inner">
              <ContactSection isActive={activeSlide === 4} />
            </div>
          </div>
        </div>

        {/* Slide 5: Cierre / Footer */}
        <div className="swipe-section" id="convocatoria-slide-5">
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
          const names = ["Convocatoria", "Beneficios", "Requisitos", "Proceso & Fechas", "Formulario", "Cierre"];
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
