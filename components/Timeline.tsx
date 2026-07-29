"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TimelineProps {
  isActive?: boolean;
}

export default function Timeline({ isActive = false }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const staircaseRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const splitText = (text: string, hoverColor: string, glowColor: string, hoverY: number = -6) => {
    return text.split("").map((char, index) => {
      if (char === " ") return " ";
      
      const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const effects = (gsap as any).effects;
        if (effects && effects.hoverGlow) {
          effects.hoverGlow(e.currentTarget, { color: hoverColor, glowColor, y: hoverY });
        }
      };
      
      const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const effects = (gsap as any).effects;
        if (effects && effects.hoverReset) {
          effects.hoverReset(e.currentTarget);
        }
      };

      return (
        <span
          key={index}
          className="inline-block split-char cursor-default"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: "inline-block", transformOrigin: "50% 50%" }}
        >
          {char}
        </span>
      );
    });
  };

  // Main entry GSAP animations
  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title & Subtitle fade in
      tl.fromTo(
        [".plan-main-title", ".plan-subtitle"],
        { y: 30, opacity: 0, rotateX: 15, transformOrigin: "50% 0%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      );

      if (!isMobile) {
        // Month cards staggered scale & slide up from bottom (Desktop)
        tl.fromTo(
          ".stair-card",
          { y: 80, opacity: 0, scaleY: 0.9, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            scaleY: 1,
            rotate: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            transformOrigin: "bottom center",
          },
          "-=0.6"
        );

        // Stagger timeline card headers letter by letter
        tl.fromTo(
          ".stair-card .split-char",
          { y: "110%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.015,
            ease: "back.out(1.2)",
          },
          "-=0.6"
        );
      } else {
        // Mobile only: Slide up the staircase-container as a whole and fade in
        tl.fromTo(
          ".staircase-container",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          "-=0.4"
        );
      }

      // Footer text reveal
      tl.fromTo(
        ".plan-footer-text",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, isMobile]);

  // Mobile horizontal slider sliding and card scaling animation
  useEffect(() => {
    if (!isMobile) {
      // Clear properties on desktop
      gsap.killTweensOf(".plan-section .staircase-container");
      gsap.killTweensOf(".plan-section .stair-card");
      gsap.set(".plan-section .staircase-container", { clearProps: "x,transform" });
      gsap.set(".plan-section .stair-card", { clearProps: "scale,opacity" });
      return;
    }

    const cardWidth = 280; // matches css
    const gap = 20; // matches css
    const parentWidth = containerRef.current?.offsetWidth || window.innerWidth;
    // Calculate translation offset to center the active card
    const targetX = (parentWidth - cardWidth) / 2 - activeMobileIndex * (cardWidth + gap);

    gsap.to(".plan-section .staircase-container", {
      x: targetX,
      duration: 0.5,
      ease: "power2.out",
    });

    const cards = gsap.utils.toArray(".plan-section .stair-card");
    cards.forEach((card: any, idx: number) => {
      if (idx === activeMobileIndex) {
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(card, {
          scale: 0.88,
          opacity: 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }, [isMobile, activeMobileIndex]);

  // Touch handlers for horizontal swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(touchStartRef.current.x - currentX);
    const diffY = Math.abs(touchStartRef.current.y - currentY);

    // Stop propagation if the movement is horizontal
    if (diffX > diffY && diffX > 10) {
      e.stopPropagation();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartRef.current.x - endX;
    const diffY = touchStartRef.current.y - endY;

    // Detect horizontal swipe if delta X is larger than delta Y and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swipe left -> Next module
        setActiveMobileIndex((prev) => Math.min(prev + 1, 2));
      } else {
        // Swipe right -> Previous module
        setActiveMobileIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <section id="plan" className="section-card plan-section" ref={containerRef}>
      <div className="plan-header">
        <h2 className="plan-main-title opacity-0">
          RÍFATELA<span className="blanco text-shine-solid">. ESTE ES EL PLAN.</span>
        </h2>
        <p className="plan-subtitle opacity-0">Tu plan para alcanzar la verdadera madurez operativa</p>
      </div>

      <div 
        className="staircase-container" 
        ref={staircaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Module 1 */}
        <div className="stair-card stair-1 opacity-0">
          <span className="stair-month">
            {splitText("MÓDULO 1", "#2ECDB7", "rgba(46, 205, 183, 0.5)")}
          </span>
          <h3 className="stair-title">
            {splitText("Infraestructura Avanzada y CRO", "#2ECDB7", "rgba(46, 205, 183, 0.5)")}
          </h3>
          <p className="stair-desc">
            Optimiza el checkout, domina las APIs de conversiones y automatiza tu
            logística con Envío Nube.
          </p>
        </div>
        {/* Module 2 */}
        <div className="stair-card stair-2 opacity-0">
          <span className="stair-month">
            {splitText("MÓDULO 2", "#ffdc7a", "rgba(255, 220, 122, 0.5)")}
          </span>
          <h3 className="stair-title">
            {splitText("Adquisición Agresiva", "#ffdc7a", "rgba(255, 220, 122, 0.5)")}
          </h3>
          <p className="stair-desc">
            Escalamiento real en Meta Ads (Advantage+), Performance Max en Google y
            retargeting avanzado basado en datos.
          </p>
        </div>
        {/* Module 3 */}
        <div className="stair-card stair-3 opacity-0">
          <span className="stair-month">
            {splitText("MÓDULO 3", "#ff4ea8", "rgba(255, 78, 168, 0.5)")}
          </span>
          <h3 className="stair-title">
            {splitText("Retención Extrema (LTV)", "#ff4ea8", "rgba(255, 78, 168, 0.5)")}
          </h3>
          <p className="stair-desc">
            Automatización hiper-personalizada con Marketing Nube, modelos de
            suscripción y control absoluto de tus Unit Economics.
          </p>
        </div>
      </div>

      {/* Controls container for mobile */}
      {isMobile && (
        <div className="mobile-controls-container">
          <button
            className="mobile-nav-btn"
            onClick={() => setActiveMobileIndex((prev) => Math.max(prev - 1, 0))}
            disabled={activeMobileIndex === 0}
            style={{
              opacity: activeMobileIndex === 0 ? 0.35 : 1,
              pointerEvents: activeMobileIndex === 0 ? "none" : "auto",
            }}
            aria-label="Anterior"
          >
            ←
          </button>
          
          <div className="mobile-dots-container">
            {[0, 1, 2].map((idx) => {
              const colors = ["#2ECDB7", "#ffdc7a", "#ff4ea8"];
              return (
                <button
                  key={idx}
                  className={`mobile-dot ${activeMobileIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveMobileIndex(idx)}
                  style={{
                    backgroundColor: activeMobileIndex === idx ? colors[idx] : "rgba(255, 255, 255, 0.25)",
                    boxShadow: activeMobileIndex === idx ? `0 0 8px ${colors[idx]}` : "none",
                  }}
                  aria-label={`Módulo ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            className="mobile-nav-btn"
            onClick={() => setActiveMobileIndex((prev) => Math.min(prev + 1, 2))}
            disabled={activeMobileIndex === 2}
            style={{
              opacity: activeMobileIndex === 2 ? 0.35 : 1,
              pointerEvents: activeMobileIndex === 2 ? "none" : "auto",
            }}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      )}

      <div className="plan-footer">
        <p className="plan-footer-text opacity-0">Diseñamos estructuras capaces de crecer contigo</p>
      </div>
    </section>
  );
}
