"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ConvocatoriaProcesoCronogramaProps {
  isActive?: boolean;
}

export default function ConvocatoriaProcesoCronograma({ isActive = false }: ConvocatoriaProcesoCronogramaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
        ".alliance-card",
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, stagger: 0.2, ease: "power4.out" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="convocatoria-cronograma"
      className="section-card plan-section"
      style={{
        backgroundImage: "url(/assets/backgrounds/About.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={containerRef}
    >
      <div className="plan-header" style={{ marginBottom: "35px" }}>
        <h2 className="allies-main-title opacity-0 font-heading text-4xl md:text-5xl font-extrabold text-center">
          PROCESO <span className="blanco text-shine-solid">Y CRONOGRAMA</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-menta mt-1 font-subheading">
          Las fechas y etapas clave para formar parte de Calmécac
        </p>
      </div>

      <div className="convocatoria-cronograma-grid">
        {/* Proceso de Selección Card */}
        <div className="alliance-card stair-card stair-1 opacity-0">
          <div className="stair-desc">
            <span className="stair-month block text-xs font-extrabold tracking-widest uppercase mb-4 text-menta">
              PROCESO DE SELECCIÓN
            </span>
            <div className="space-y-4 text-left">
              <div className="flex gap-3">
                <span className="text-menta font-bold text-lg">1.</span>
                <div>
                  <h4 className="text-white text-sm font-bold">Postulación</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Llenar el formulario de registro al final de esta página con tus datos de facturación e infraestructura.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-menta font-bold text-lg">2.</span>
                <div>
                  <h4 className="text-white text-sm font-bold">Entrevista 1-1 / Resolución de Dudas</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Videollamada con el equipo de Rífatela para evaluar tu modelo de negocio, factibilidad de migración y hacer match.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-menta font-bold text-lg">3.</span>
                <div>
                  <h4 className="text-white text-sm font-bold">Onboarding</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Bienvenida oficial al Calmécac, entrega de accesos a tus herramientas digitales y banderazo de salida de migración.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cronograma Card */}
        <div className="alliance-card stair-card stair-2 opacity-0">
          <div className="stair-desc">

            <span className="stair-month block text-xs font-extrabold tracking-widest uppercase mb-4 text-yellow" style={{ color: "#EAB308" }}>
              FECHAS IMPORTANTES (2026)
            </span>
            <div className="space-y-4 text-left">
              <div className="border-l-2 border-yellow/30 pl-4 py-1" style={{ borderColor: "rgba(234,179,8,0.3)" }}>
                <span className="text-yellow text-[10px] font-bold tracking-wider uppercase block" style={{ color: "#EAB308" }}>21 DE JULIO</span>
                <h4 className="text-white text-sm font-bold">Apertura de Postulaciones</h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-0.5">Inicio oficial de la convocatoria Calmécac.</p>
              </div>
              <div className="border-l-2 border-yellow/30 pl-4 py-1" style={{ borderColor: "rgba(234,179,8,0.3)" }}>
                <span className="text-yellow text-[10px] font-bold tracking-wider uppercase block" style={{ color: "#EAB308" }}>22 DE JULIO AL 6 DE AGOSTO</span>
                <h4 className="text-white text-sm font-bold">Entrevistas 1-1</h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-0.5">Agendamiento de videollamadas con perfiles pre-seleccionados.</p>
              </div>
              <div className="border-l-2 border-yellow/30 pl-4 py-1" style={{ borderColor: "rgba(234,179,8,0.3)" }}>
                <span className="text-yellow text-[10px] font-bold tracking-wider uppercase block" style={{ color: "#EAB308" }}>15 DE AGOSTO</span>
                <h4 className="text-white text-sm font-bold">Cierre de Convocatoria</h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-0.5">Límite para recepción de aplicaciones.</p>
              </div>
            {/* Fecha de eventos presenciales
              <div className="border-l-2 border-yellow/30 pl-4 py-1" style={{ borderColor: "rgba(234,179,8,0.3)" }}>
                <span className="text-yellow text-[10px] font-bold tracking-wider uppercase block" style={{ color: "#EAB308" }}>28 DE AGOSTO</span>
                <h4 className="text-white text-sm font-bold">Ceremonia de Clausura</h4>
                <p className="text-zinc-400 text-xs leading-relaxed mt-0.5">Evento presencial y celebración de graduados en Tuxtla Gutiérrez, Chiapas.</p>
              </div>
            */} 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
