"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SessionDetailModal from "@/components/SessionDetailModal";

interface PlanMes3Props {
  isActive?: boolean;
}

export default function PlanMes3({ isActive = false }: PlanMes3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const sessions = [
    {
      number: 9,
      title: "Automatización de Ciclo de Vida del Cliente (Retention Marketing)",
      shortDesc: "Segmenta bajo el modelo RFM y automatiza flujos inteligentes de recompra y Up-selling.",
      temario: [
        "Segmentación RFM (Recencia, Frecuencia, Valor Monetario) de la base de datos de clientes.",
        "Flujos automatizados avanzados: Recuperación de clientes VIP inactivos, Up-selling y Cross-selling.",
        "Automatización hiper-personalizada según el comportamiento de navegación en tienda."
      ],
      objetivos: [
        "Diseñar y comprender un flujo complejo de retención de 3 pasos (Bienvenida -> Post-Compra -> Reactivación)."
      ],
      herramientas: ["Marketing Nube", "Klaviyo", "ActiveCampaign", "Omnisend"],
      aprendizajes: "El emprendedor aprenderá a extraer valor financiero recurrente de su base de datos actual. Desarrollará la capacidad de segmentar a sus clientes bajo el modelo matemático RFM y configurar árboles de decisión automatizados de comunicación avanzada (Up-selling, Cross-selling, recuperación de carritos abandonados con incentivos dinámicos) activados directamente por el comportamiento de navegación del usuario en la plataforma."
    },
    {
      number: 10,
      title: "Modelos de Suscripción y Programas de Lealtad Gamificados",
      shortDesc: "Estructura suscripciones y diseña dinámicas de retención basadas en puntos y niveles.",
      temario: [
        "Suscripciones en el E-Commerce.",
        "Diseño de programas de fidelización basados en puntos, niveles y/o recompensas exclusivas.",
        "Estrategias psicológicas para reducir la tasa de cancelación (Churn)."
      ],
      objetivos: [
        "Diseñar e implementar programas basados en suscripciones y/o programas de lealtad."
      ],
      herramientas: ["Aplicaciones de Suscripción", "Loyalty Apps", "Gamificación E-commerce"],
      aprendizajes: "El emprendedor dominará la lógica de los ingresos recurrentes y la retención a largo plazo. Aprenderá a estructurar modelos de suscripción viables para su catálogo de productos y a diseñar programas de lealtad gamificados (basados en hitos y recompensas), aplicando detonantes psicológicos para mitigar la tasa de cancelación (Churn Rate) y elevar el Valor de Vida del Cliente (LTV)."
    },
    {
      number: 11,
      title: "Business Intelligence y Unit Economics para la Toma de Decisiones",
      shortDesc: "Calcula tus Unit Economics reales, evalúa la relación LTV:CAC y conecta tableros en tiempo real.",
      temario: [
        "Desglose de los Unit Economics (margen de contribución real por orden).",
        "Relación LTV:CAC de salud de negocio.",
        "Creación de tableros de control conectados en tiempo real."
      ],
      objetivos: [
        "Construir un tablero que permita el análisis y comparación de los datos de inversión publicitaria con facturación neta."
      ],
      herramientas: ["Metabase", "Looker Studio", "Google Analytics 4"],
      aprendizajes: "El emprendedor desarrollará una mentalidad directiva basada en datos financieros de alta fidelidad (Business Intelligence). Aprenderá a desglosar con precisión sus Unit Economics (margen de contribución real por orden) y a evaluar la salud del negocio cruzando la relación LTV:CAC. Al cierre, será capaz de conectar e integrar sus fuentes de adquisición publicitaria con su facturación neta en un tablero de control automatizado en tiempo real para la toma de decisiones estratégicas de escala."
    }
  ];

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP slider entry transitions
  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        [".allies-main-title", ".allies-subtitle"],
        { y: 30, opacity: 0, rotateX: 15, transformOrigin: "50% 0%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.15 }
      );

      if (!isMobile) {
        tl.fromTo(
          ".session-card-plan",
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" },
          "-=0.4"
        );
      } else {
        tl.fromTo(
          ".allies-grid-container",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, isMobile]);

  // Mobile horizontal sliding effect
  useEffect(() => {
    if (!isMobile) {
      gsap.killTweensOf(".plan-section .allies-grid-container");
      gsap.killTweensOf(".plan-section .session-card-plan");
      gsap.set(".plan-section .allies-grid-container", { clearProps: "x,transform" });
      gsap.set(".plan-section .session-card-plan", { clearProps: "scale,opacity" });
      return;
    }

    const cardWidth = 280; // matches css
    const gap = 20; // matches css
    const parentWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const targetX = (parentWidth - cardWidth) / 2 - activeMobileIndex * (cardWidth + gap);

    gsap.to(containerRef.current?.querySelector(".allies-grid-container") || ".allies-grid-container", {
      x: targetX,
      duration: 0.5,
      ease: "power2.out",
    });

    const cards = gsap.utils.toArray<Element>(containerRef.current?.querySelectorAll(".session-card-plan") || ".session-card-plan");
    cards.forEach((card, idx: number) => {
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

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        setActiveMobileIndex((prev) => Math.min(prev + 1, sessions.length - 1));
      } else {
        setActiveMobileIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const activeSessionData = selectedSession !== null ? sessions.find(s => s.number === selectedSession) : null;

  return (
    <section
      id="plan-mes-3"
      className="section-card plan-section"
      style={{
        backgroundImage: "url(/assets/backgrounds/About.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={containerRef}
    >
      <div className="plan-header" style={{ marginBottom: "25px" }}>
        <h2 className="allies-main-title opacity-0 font-heading text-3xl md:text-5xl font-extrabold text-center">
          MÓDULO 3: <span className="blanco text-shine-solid">RETENCIÓN Y BI</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-magenta mt-1 font-subheading">
          Fidelización, incremento de LTV recurrente e inteligencia de negocio basada en datos financieros
        </p>
      </div>

      <div 
        className="allies-grid-container" 
        style={isMobile ? {
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "20px",
          margin: "0 auto",
        } : {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          margin: "0 auto",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sessions.map((session) => (
          <div
            key={session.number}
            className="session-card-plan stair-card stair-3 opacity-0"
            style={{ 
              height: "auto", 
              alignSelf: "stretch", 
              flex: isMobile ? "0 0 280px" : "none" 
            }}
          >
            <div
              className="stair-desc cursor-pointer hover:translate-y-[-4px]"
              onClick={() => setSelectedSession(session.number)}
              style={{
                height: "100%",
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px 28px",
                boxSizing: "border-box",
                borderRadius: "20px",
                borderWidth: "3px",
                borderStyle: "solid",
                transition: "all 0.3s ease"
              }}
            >
              <div>
                <span className="text-xs font-extrabold tracking-widest uppercase block mb-1 text-magenta">
                  SESIÓN {session.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                  {session.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                  {session.shortDesc}
                </p>
              </div>
              <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[180px]">
                  ⚙ {session.herramientas.slice(0, 2).join(", ")}
                </span>
                <span className="text-[10px] font-bold text-magenta tracking-wider uppercase">
                  EXPLORAR →
                </span>
              </div>
            </div>
          </div>
        ))}
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
            {sessions.map((_, idx) => (
              <button
                key={idx}
                className={`mobile-dot w-2 h-2 rounded-full transition-all`}
                onClick={() => setActiveMobileIndex(idx)}
                style={{
                  backgroundColor: activeMobileIndex === idx ? "#ff4ea8" : "rgba(255, 255, 255, 0.25)",
                  boxShadow: activeMobileIndex === idx ? "0 0 8px #ff4ea8" : "none",
                }}
                aria-label={`Sesión ${idx + 1}`}
              />
            ))}
          </div>

          <button
            className="mobile-nav-btn"
            onClick={() => setActiveMobileIndex((prev) => Math.min(prev + 1, sessions.length - 1))}
            disabled={activeMobileIndex === sessions.length - 1}
            style={{
              opacity: activeMobileIndex === sessions.length - 1 ? 0.35 : 1,
              pointerEvents: activeMobileIndex === sessions.length - 1 ? "none" : "auto",
            }}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      )}

      {activeSessionData && (
        <SessionDetailModal
          isOpen={selectedSession !== null}
          onClose={() => setSelectedSession(null)}
          colorScheme="magenta"
          sessionNumber={activeSessionData.number}
          title={activeSessionData.title}
          temario={activeSessionData.temario}
          objetivos={activeSessionData.objetivos}
          herramientas={activeSessionData.herramientas}
          aprendizajes={activeSessionData.aprendizajes}
        />
      )}
    </section>
  );
}
