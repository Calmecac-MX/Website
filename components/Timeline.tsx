"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TimelineProps {
  isActive?: boolean;
}

export default function Timeline({ isActive = false }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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

      // Month cards staggered scale & slide up from bottom
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

      // Footer text reveal
      tl.fromTo(
        ".plan-footer-text",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section id="plan" className="section-card plan-section" ref={containerRef}>
      <div className="plan-header">
        <h2 className="plan-main-title opacity-0">
          RÍFATELA<span className="blanco text-shine-solid">. ESTE ES EL PLAN.</span>
        </h2>
        <p className="plan-subtitle opacity-0">Tu plan para alcanzar la verdadera madurez operativa</p>
      </div>

      <div className="staircase-container">
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

      <div className="plan-footer">
        <p className="plan-footer-text opacity-0">Diseñamos estructuras capaces de crecer contigo</p>
      </div>
    </section>
  );
}
