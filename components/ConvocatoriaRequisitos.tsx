"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ConvocatoriaRequisitosProps {
  isActive?: boolean;
}

export default function ConvocatoriaRequisitos({ isActive = false }: ConvocatoriaRequisitosProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const requirements = [
    {
      step: "01",
      title: "Plataforma de Origen",
      desc: "Operar actualmente en Shopify, Magento, WooCommerce o VTEX y estar listos para migrar.",
    },
    {
      step: "02",
      title: "Volumen de Ventas",
      desc: "Contar con un GMV (Volumen Bruto de Mercancías) igual o superior a $90,000 MXN mensuales.",
    },
    {
      step: "03",
      title: "Compromiso Académico",
      desc: "Cumplir con un mínimo del 80% de asistencia obligatoria a las 11 sesiones remotas.",
    },
    {
      step: "04",
      title: "Casos de Éxito",
      desc: "Permitir el uso de la imagen de tu marca y fundadores para los casos de éxito y el Muro de Graduados.",
    }
    /* Fecha de ceremonia de clausura
    {
      step: "05",
      title: "Presencialidad",
      desc: "Asistir y celebrar en la ceremonia de clausura en Tuxtla Gutiérrez, Chiapas, el viernes 28 de agosto de 2026.",
    }
    */
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
        ".req-card",
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="convocatoria-requisitos"
      className="section-card plan-section"
      style={{
        backgroundImage: "url(/assets/backgrounds/About.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={containerRef}
    >
      <div className="plan-header" style={{ marginBottom: "35px" }}>
        <h2 className="allies-main-title opacity-0 font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-center">
          REQUISITOS <span className="blanco text-shine-solid">DE POSTULACIÓN</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-magenta mt-1 font-subheading">
          El nivel de esta cohorte exige compromiso total. Los candidatos deben cumplir estrictamente el perfil
        </p>
      </div>

      <div className="convocatoria-requirements-grid">
        {requirements.map((req, idx) => (
          <div
            key={idx}
            className="req-card stair-card stair-3 opacity-0"
          >
            <div className="stair-desc">

              {/* Step Circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 border-2"
                style={{
                  color: "#ff4ea8",
                  borderColor: "rgba(255, 78, 168, 0.6)",
                  background: "rgba(255, 78, 168, 0.08)",
                  boxShadow: "0 0 10px rgba(255, 78, 168, 0.15)"
                }}
              >
                {req.step}
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                  {req.title}
                </h3>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {req.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
