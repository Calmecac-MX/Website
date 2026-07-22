"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MisionVisionProps {
  isActive?: boolean;
}

export default function MisionVision({ isActive = false }: MisionVisionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = (
    text: string,
    hoverColor: string = "#ff4ea8",
    glowColor: string = "rgba(255, 78, 168, 0.5)",
    hoverY: number = -6
  ) => {
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

      tl.fromTo(
        [".allies-main-title", ".allies-subtitle"],
        { y: 30, opacity: 0, rotateX: 15, transformOrigin: "50% 0%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      );

      tl.fromTo(
        ".alliance-card",
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, stagger: 0.2, ease: "power4.out" },
        "-=0.5"
      );

      tl.fromTo(
        ".alliance-card .split-char",
        { y: "110%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.015, ease: "back.out(1.2)" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="mision-vision"
      className="section-card plan-section"
      style={{
        backgroundImage: "url(/assets/backgrounds/About.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={containerRef}
    >
      <div className="plan-header" style={{ marginBottom: "50px" }}>
        <h2 className="allies-main-title opacity-0 font-heading text-5xl font-extrabold text-center">
          PROPÓSITO <span className="blanco text-shine-solid">Y ESTRATEGIA</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-menta mt-2 font-subheading">
          Nuestra guía fundamental para el éxito de tu organización
        </p>
      </div>

      <div className="staircase-container allies-grid-container" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px", alignItems: "stretch" }}>
        {/* Misión Card */}
        <div className="alliance-card stair-card stair-1 opacity-0" style={{ border: "none", background: "none", padding: 0, height: "auto", alignSelf: "stretch", boxShadow: "none" }}>
          <div className="stair-desc" style={{ height: "100%", minHeight: "340px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 32px", boxSizing: "border-box", borderRadius: "22px", borderWidth: "3px", borderStyle: "solid" }}>
            <div>
              <span className="stair-month text-center block" style={{ fontSize: "14px", letterSpacing: "1.5px", color: "#2ECDB7", marginBottom: "25px" }}>
                {splitText("MISIÓN", "#2ECDB7", "rgba(46, 205, 183, 0.5)")}
              </span>
              <p style={{ fontSize: "18px", color: "#cbd5e1", lineHeight: "1.7", textAlign: "center", fontStyle: "italic" }}>
                &quot;Acelerar la transformación digital de empresas establecidas a través de estructura operativa, automatización y ejecución estratégica.&quot;
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", marginTop: "25px", display: "flex", justifyContent: "space-around", fontSize: "12px", color: "#94a3b8", fontWeight: "bold" }}>
              <span>✓ Estructura Operativa</span>
              <span>✓ Automatización</span>
            </div>
          </div>
        </div>

        {/* Visión Card */}
        <div className="alliance-card stair-card stair-3 opacity-0" style={{ border: "none", background: "none", padding: 0, height: "auto", alignSelf: "stretch", boxShadow: "none" }}>
          <div className="stair-desc" style={{ height: "100%", minHeight: "340px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 32px", boxSizing: "border-box", borderRadius: "22px", borderWidth: "3px", borderStyle: "solid" }}>
            <div>
              <span className="stair-month text-center block" style={{ fontSize: "14px", letterSpacing: "1.5px", color: "#ff4ea8", marginBottom: "25px" }}>
                {splitText("VISIÓN", "#ff4ea8", "rgba(255, 78, 168, 0.5)")}
              </span>
              <p style={{ fontSize: "18px", color: "#cbd5e1", lineHeight: "1.7", textAlign: "center", fontStyle: "italic" }}>
                &quot;Convertirse en el modelo de incubación líder para empresas de alto rendimiento en Latinoamérica.&quot;
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", marginTop: "25px", display: "flex", justifyContent: "space-around", fontSize: "12px", color: "#94a3b8", fontWeight: "bold" }}>
              <span>✓ Alto Rendimiento</span>
              <span>✓ Liderazgo Regional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
