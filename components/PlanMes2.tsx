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

  const sessions = [
    {
      number: 5,
      title: "Escalado de Campañas en Meta Ads (Estrategias de Growth)",
      shortDesc: "Implementa frameworks de pruebas creativas y optimización Advantage+ para escalar presupuestos.",
      temario: [
        "Estructura de campañas para escalado horizontal vs. vertical.",
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
      shortDesc: "Optimiza Google Merchant Center y configura campañas avanzadas de Performance Max.",
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
        "Retargeting basado en catálogo digital.",
        "Modelos de atribución (First Click, Last Click, Data-Driven).",
        "Exclusión de audiencias de compradores recientes."
      ],
      objetivos: [
        "Comprende la relevancia del retargeting y los modelos de atribución para el journey del consumidor."
      ],
      herramientas: ["Catálogos de Meta", "Catálogos de TikTok", "Google Analytics 4", "PostHog"],
      aprendizajes: "El emprendedor desarrollará la capacidad de estructurar sistemas publicitarios omnicanal de persecución inteligente. Aprenderá a configurar campañas dinámicas basadas en el catálogo de productos adaptadas a la navegación del usuario, y adquirirá el criterio analítico para interpretar los modelos de atribución basados en datos (Data-Driven), permitiéndole entender qué canal realmente genera sus ventas y optimizar las exclusiones de audiencia para no desperdiciar presupuesto."
    },
    {
      number: 8,
      title: "Marketing de Influencers Basado en Performance (UGC y Afiliados)",
      shortDesc: "Negocia briefs con creadores bajo esquemas de adquisición y recluta embajadores de marca.",
      temario: [
        "Negociación con creadores bajo esquemas de comisión o costo por adquisición.",
        "Relevancia del contenido UGC (Contenido Generado por el Usuario).",
        "Creación y gestión de un programa de embajadores de marca."
      ],
      objetivos: [
        "Comprende la relevancia del performance marketing como canal de adquisición de usuarios."
      ],
      herramientas: ["Códigos de Rastreo", "Afiliados Tiendanube", "UGC Networks"],
      aprendizajes: "El emprendedor aprenderá a transicionar del marketing de influencers tradicional (enfocado en métricas de vanidad) a una estrategia basada al 100% en rendimiento (Performance). Desarrollará habilidades para negociar briefs comerciales bajo modelos de costo por adquisición (CPA) o comisiones, y estructurará un sistema automatizado de reclutamiento de creadores de contenido UGC (Contenido Generado por el Usuario) y embajadores de marca enfocado en el retorno de inversión."
    }
  ];

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        [".allies-main-title", ".allies-subtitle"],
        { y: 30, opacity: 0, rotateX: 15, transformOrigin: "50% 0%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.15 }
      );

      tl.fromTo(
        ".session-card-plan",
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

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
        <h2 className="allies-main-title opacity-0 font-heading text-5xl font-extrabold text-center">
          MÓDULO 2: <span className="blanco text-shine-solid">ADQUISICIÓN AGRESIVA</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-yellow mt-1 font-subheading" style={{ color: "#EAB308" }}>
          Performance Marketing de alto impacto para capturar tráfico calificado y rentabilizar presupuestos
        </p>
      </div>

      <div className="allies-grid-container grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1100px] mx-auto w-full" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", margin: "0 auto" }}>
        {sessions.map((session) => (
          <div
            key={session.number}
            className="session-card-plan stair-card stair-2 opacity-0"
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
