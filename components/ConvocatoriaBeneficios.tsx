"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ConvocatoriaBeneficiosProps {
  isActive?: boolean;
}

export default function ConvocatoriaBeneficios({ isActive = false }: ConvocatoriaBeneficiosProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      title: "Mes de Gestión Gratuito",
      desc: "Recibe un mes de gestión de E-commerce en Rífatela completamente sin costo para asegurar que tu tienda arranque optimizada desde el primer día.",
      color: "#2ECDB7",
      borderClass: "stair-1"
    },
    {
      title: "Soporte Corporativo VIP",
      desc: "Acceso directo a un ejecutivo SMB por parte de Rífatela, quien te brindará acompañamiento estratégico, asesoría y canal prioritario.",
      color: "#EAB308",
      borderClass: "stair-2"
    },
    {
      title: "Impulso de Agencia",
      desc: "Obtén un 50% de descuento en servicios de la agencia Rífatela (adicionales) para potenciar tu identidad verbal y sistemas visuales.",
      color: "#ff4ea8",
      borderClass: "stair-3"
    },
    {
      title: "Formación Especializada",
      desc: "Programa intensivo de 11 sesiones remotas (2 horas c/u) con acompañamiento y capacitación avanzada en e-commerce.",
      color: "#ff4ea8",
      borderClass: "stair-3"
    },
    {
      title: "Migración Premium Cero",
      desc: "Trasladamos tu tienda actual (Shopify, WooCommerce, etc.) a Tiendanube de forma completamente gratuita, segura y sin dolores de cabeza.",
      color: "#2ECDB7",
      borderClass: "stair-1"
    },
    {
      title: "Subsidios a la Medida",
      desc: "Evaluaremos el perfil de tu negocio para otorgarte la posibilidad de obtener un subsidio parcial o total en tu plan de Tiendanube.",
      color: "#EAB308",
      borderClass: "stair-2"
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
        ".benefit-card",
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="convocatoria-beneficios"
      className="section-card plan-section convocatoria-beneficios-section"
      ref={containerRef}
    >
      <div className="plan-header convocatoria-plan-header" style={{ marginBottom: "20px" }}>
        <h2 className="allies-main-title opacity-0 font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-center">
          BENEFICIOS <span className="blanco text-shine-solid">EXCLUSIVOS</span>
        </h2>
        <p className="allies-subtitle opacity-0 text-center text-menta mt-1 font-subheading">
          Ecosistema integral de crecimiento sin costo para los 9 negocios seleccionados
        </p>
      </div>

      <div className="convocatoria-benefits-grid">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className={`benefit-card stair-card ${benefit.borderClass} opacity-0`}
          >
            <div className="stair-desc">

              <div className="mb-2">
                <span className="text-[10px] font-extrabold tracking-widest uppercase block mb-1" style={{ color: benefit.color }}>
                  BENEFICIO {idx + 1}
                </span>
                <h3 className="text-base font-bold text-white mb-2 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
