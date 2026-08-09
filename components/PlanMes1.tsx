"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SessionDetailModal from "@/components/SessionDetailModal";

interface PlanMes1Props {
  isActive?: boolean;
}

export default function PlanMes1({ isActive = false }: PlanMes1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const sessions = [
    {
      number: 1,
      title: "Auditoría de E-Commerce y Optimización de la Tasa de Conversión (CRO)",
      shortDesc: "Corrige puntos de fuga de dinero analizando el comportamiento visual del usuario.",
      temario: [
        "Análisis de fricción en el checkout.",
        "Mapas de calor y grabaciones de sesiones de usuarios para detectar bloqueos.",
        "Pruebas A/B en páginas de producto (fotografía de alta conversión vs. vídeo, copys de beneficio vs. técnicos)."
      ],
      objetivos: [
        "Identificar y corregir los principales puntos de fuga de dinero en su sitio web actual."
      ],
      herramientas: ["Microsoft Clarity", "PostHog", "Fathom"],
      aprendizajes: "El emprendedor desarrollará la capacidad de auditar visual y analíticamente el comportamiento del usuario dentro de su tienda, interpretando mapas de calor y grabaciones de sesión para identificar puntos críticos de fricción. Aprenderá a estructurar e implementar experimentos y pruebas A/B basados en datos duros para incrementar el porcentaje de conversión en el checkout sin depender de un aumento en el tráfico publicitario."
    },
    {
      number: 2,
      title: "Arquitectura de Datos: Píxeles, APIs y Medición Correcta",
      shortDesc: "Estructura la medición de datos Server-Side ante el fin de las cookies de terceros.",
      temario: [
        "Cookies de terceros and su impacto en la estrategia digital.",
        "Configuración de API de Conversiones vs. Píxel Tradicional.",
        "Eventos personalizados de valor (Add-to-cart, Initiate Checkout, Purchase) y su correcta atribución."
      ],
      objetivos: [
        "Identificar y validar el correcto rastreo y deduplicación de eventos en las principales API’s de Conversiones."
      ],
      herramientas: ["Meta Business Suite", "TikTok Ads Manager", "Google Tag Manager", "Test Event’s Tools"],
      aprendizajes: "El emprendedor comprenderá el nuevo panorama de privacidad digital ante la depreciación de las cookies de terceros. Aprenderá a estructurar e implementar una estrategia de medición híbrida a través de Google Tag Manager, logrando conectar y validar la API de Conversiones (Server-Side) para garantizar un rastreo preciso, deduplicado y limpio de los eventos de valor de su negocio."
    },
    {
      number: 3,
      title: "Ecosistema de Pagos Complejo y Disminución de Rechazos",
      shortDesc: "Optimiza la conversión del checkout integrando soluciones avanzadas y BNPL.",
      temario: [
        "Optimización del flujo de pagos.",
        "Estrategias de financiamiento para elevar el ticket.",
        "Gestión avanzada de contracargos y reglas de prevención de fraude."
      ],
      objetivos: [
        "Conocer la importancia de los módulos anti-fraude, así como de la importancia de la simplicidad del checkout en la conversión de consumidores."
      ],
      herramientas: ["Pago Nube", "Kueski Pay", "Aplazo"],
      aprendizajes: "El emprendedor dominará los criterios técnicos y financieros para optimizar su embudo de pago. Aprenderá a balancear la fricción de los sistemas de prevención de fraude (antifraude) con la agilidad del checkout, e integrará soluciones de financiamiento (Buy Now, Pay Later) estratégicamente diseñadas para elevar el ticket promedio y mitigar la tasa de rechazo bancario de su tienda."
    },
    {
      number: 4,
      title: "Logística de Escala: Fulfilment y Última Milla",
      shortDesc: "Mapea, automatiza y delega la cadena de distribución e inventario para la escala.",
      temario: [
        "Relevancia de la logística en la experiencia del cliente.",
        "Estrategias de logística inversa automatizada para mejorar la experiencia post-venta.",
        "Automatizando la logística interna."
      ],
      objetivos: [
        "Diseñar el plan de costos o en su defecto una matriz de integración con un centro de distribución 3PL."
      ],
      herramientas: ["Envío Nube", "Sistemas 3PL", "Última Milla"],
      aprendizajes: "El emprendedor aprenderá a mapear, costear y automatizar su cadena de suministro e inventarios para la escala. Desarrollará el criterio logístico necesario para transicionar de la operación interna hacia integraciones automatizadas con centros de distribución (3PL) y servicios de última milla, automatizando además un flujo eficiente de logística inversa (devoluciones) que fidelice al consumidor post-venta."
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

    const cards = gsap.utils.toArray(containerRef.current?.querySelectorAll(".session-card-plan") || ".session-card-plan");
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
      id="plan-mes-1"
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
          MÓDULO 1: <span className="blanco text-shine-solid">INFRAESTRUCTURA Y CRO</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-menta mt-1 font-subheading">
          Estructura tecnológica y optimización de conversión para escalar la base de tu tienda
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
          gridTemplateColumns: "repeat(2, 1fr)",
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
            className="session-card-plan stair-card stair-1 opacity-0"
            style={{ height: "auto", alignSelf: "stretch" }}
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
                <span className="text-xs font-extrabold tracking-widest uppercase block mb-1 text-menta">
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
                <span className="text-[10px] font-bold text-menta tracking-wider uppercase">
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
                className={`mobile-dot ${activeMobileIndex === idx ? "active" : ""}`}
                onClick={() => setActiveMobileIndex(idx)}
                style={{
                  backgroundColor: activeMobileIndex === idx ? "#2ECDB7" : "rgba(255, 255, 255, 0.08)",
                  color: activeMobileIndex === idx ? "#050B14" : "rgba(255, 255, 255, 0.8)",
                  borderColor: activeMobileIndex === idx ? "#2ECDB7" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: activeMobileIndex === idx ? "0 0 10px #2ECDB7" : "none",
                }}
                aria-label={`Sesión ${idx + 1}`}
              >
                <span className="mobile-pill-text">{`SESIÓN ${idx + 1}`}</span>
              </button>
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
          colorScheme="menta"
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
