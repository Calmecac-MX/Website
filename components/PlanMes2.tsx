"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SessionDetailModal from "@/components/SessionDetailModal";

interface PlanMes2Props {
  isActive?: boolean;
}

export default function PlanMes2({ isActive = false }: PlanMes2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const sessions = [
    {
      number: 5,
      title: "Escalado de Campañas en Meta Ads (Estrategias de Growth)",
      shortDesc: "Implementa frameworks de pruebas creativas y optimización Advantage+ para escalar presupuestos.",
      temario: [
        "Estructura de campaigns para escalado horizontal vs. vertical.",
        "Campañas de compras Advantage+ (ASC) y cuándo implementarlas.",
        "Framework de pruebas creativas (Creative Testing)."
      ],
      objetivos: [
        "Conocer, comprender y dominar campañas estructuradas bajo el modelo Advantage+ y un set de pruebas creativas dinámicas."
      ],
      herramientas: ["Meta Ads Manager", "Advantage+ Suite", "Creative Frameworks"],
      aprendizajes: "El emprendedor dominará las metodologías avanzadas de asignación presupuestaria en Meta Ads. Aprenderá a implementar frameworks de experimentación constante de anuncios (Creative Testing) y a delegar la optimización algorítmica mediante campañas de compra Advantage+ (ASC), logrando escalar presupuestos vertical u horizontalmente sin disparar los costos por adquisición (CPA)."
    },
    {
      number: 6,
      title: "Google Ads para E-Commerce",
      shortDesc: "Optimiza Google Merchant Center y configura campaigns avanzadas de Performance Max.",
      temario: [
        "Configuración avanzada de Google Merchant Center y optimización del Feed de productos.",
        "Campañas de Performance Max (PMax).",
        "Estrategias de palabras clave negativas y concordancias."
      ],
      objetivos: [
        "Configurar un feed de datos limpio y estructurar una campaña de Performance Max."
      ],
      herramientas: ["Google Merchant Center", "Google Ads", "PMax Campaigns"],
      aprendizajes: "El emprendedor comprenderá el funcionamiento del motor de intención de búsqueda de Google. Aprenderá a auditar y optimizar la calidad de los datos de su catálogo en Google Merchant Center para alimentar los algoritmos de las campañas de Performance Max (PMax), dominando el uso de palabras clave negativas para blindar su presupuesto y maximizar la visibilidad de sus productos."
    },
    {
      number: 7,
      title: "Retargeting Avanzado Dinámico y Modelos de Atribución",
      shortDesc: "Configura persecución inteligente de catálogos y evalúa la atribución real multi-canal.",
      temario: [
        "Estructura de retargeting de catálogo dinámico (DABA vs. DPA).",
        "Atribución publicitaria multi-canal y modelado de datos.",
        "Campañas de retención anticipada para leads fríos."
      ],
      objetivos: [
        "Diferenciar y estructurar audiencias frías y calientes para su correcto retargeting."
      ],
      herramientas: ["Klaviyo", "Meta Custom Audiences", "Google Analytics 4"],
      aprendizajes: "El emprendedor comprenderá cómo conectar sus esfuerzos orgánicos y pagados mediante atribución precisa. Aprenderá a estructurar campañas de retargeting dinámico personalizadas por comportamiento del usuario y a evaluar la atribución de conversiones en Google Analytics 4 para balancear con precisión la inversión publicitaria en su embudo de ventas."
    },
    {
      number: 8,
      title: "TikTok Ads y Nuevos Canales de Tráfico",
      shortDesc: "Domina el formato nativo Spark Ads y diversifica tu pauta en plataformas emergentes.",
      temario: [
        "El ecosistema de anuncios en TikTok Ads: Spark Ads y catálogos nativos.",
        "El framework creativo de video de alta retención para e-commerce.",
        "Diversificación de pauta y planeación presupuestaria multicanal."
      ],
      objetivos: [
        "Configurar una campaña en TikTok Ads y estructurar un set-up de video nativo optimizado para pauta."
      ],
      herramientas: ["TikTok Ads Manager", "Spark Ads", "CapCut / Video Suite"],
      aprendizajes: "El emprendedor dominará el lenguaje visual y la configuración técnica del tráfico móvil moderno. Aprenderá a estructurar anuncios nativos Spark Ads que no parezcan publicidad y a optimizar la retención de video creativo en los primeros 3 segundos, integrando TikTok Ads como canal complementario clave para la adquisición diversificada de clientes."
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
      id="plan-mes-2"
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
          MÓDULO 2: <span className="blanco text-shine-solid">ADQUISICIÓN AGRESIVA</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-yellow mt-1 font-subheading" style={{ color: "#EAB308" }}>
          Performance Marketing de alto impacto para capturar tráfico calificado y rentabilizar presupuestos
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
            className="session-card-plan stair-card stair-2 opacity-0"
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
                <span className="text-xs font-extrabold tracking-widest uppercase block mb-1 text-yellow" style={{ color: "#EAB308" }}>
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
                <span className="text-[10px] font-bold text-yellow tracking-wider uppercase" style={{ color: "#EAB308" }}>
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
                  backgroundColor: activeMobileIndex === idx ? "#ffdc7a" : "rgba(255, 255, 255, 0.08)",
                  color: activeMobileIndex === idx ? "#050B14" : "rgba(255, 255, 255, 0.8)",
                  borderColor: activeMobileIndex === idx ? "#ffdc7a" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: activeMobileIndex === idx ? "0 0 10px #ffdc7a" : "none",
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
          colorScheme="yellow"
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
