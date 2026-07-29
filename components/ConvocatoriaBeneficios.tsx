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
      icon: "🎁",
      title: "Mes de Gestión Gratuito",
      desc: "Un mes de gestión de E-commerce en Rífatela completamente sin costo para que tu tienda arranque optimizada desde el primer día.",
      accent: "#2ECDB7",
      accentRgb: "46, 205, 183",
      tag: "Beneficio 1",
    },
    {
      icon: "⭐",
      title: "Soporte Corporativo VIP",
      desc: "Acceso directo a un ejecutivo SMB de Rífatela con acompañamiento estratégico, asesoría personalizada y canal prioritario.",
      accent: "#EAB308",
      accentRgb: "234, 179, 8",
      tag: "Beneficio 2",
    },
    {
      icon: "🚀",
      title: "Impulso de Agencia",
      desc: "50% de descuento en servicios de la agencia Rífatela para potenciar tu identidad verbal y sistemas visuales.",
      accent: "#ff4ea8",
      accentRgb: "255, 78, 168",
      tag: "Beneficio 3",
    },
    {
      icon: "🎓",
      title: "Formación Especializada",
      desc: "11 sesiones remotas intensivas de 2 horas cada una, con acompañamiento y capacitación avanzada en e-commerce.",
      accent: "#ff4ea8",
      accentRgb: "255, 78, 168",
      tag: "Beneficio 4",
    },
    {
      icon: "⚡",
      title: "Migración Premium Cero",
      desc: "Trasladamos tu tienda (Shopify, WooCommerce, etc.) a Tiendanube de forma gratuita, segura y sin complicaciones.",
      accent: "#2ECDB7",
      accentRgb: "46, 205, 183",
      tag: "Beneficio 5",
    },
    {
      icon: "💎",
      title: "Subsidios a la Medida",
      desc: "Evaluamos tu negocio para otorgarte la posibilidad de un subsidio parcial o total en tu plan de Tiendanube.",
      accent: "#EAB308",
      accentRgb: "234, 179, 8",
      tag: "Beneficio 6",
    },
  ];

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".cb-title",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 }
      );
      tl.fromTo(
        ".cb-subtitle",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.55"
      );
      tl.fromTo(
        ".cb-card",
        { y: 36, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.09, ease: "power4.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="convocatoria-beneficios"
      className="cb-section"
      ref={containerRef}
    >
      {/* Header */}
      <div className="cb-header">
        <p className="cb-eyebrow">Programa Calmécac × Rífatela</p>
        <h2 className="cb-title">
          BENEFICIOS <span className="cb-highlight">EXCLUSIVOS</span>
        </h2>
        <p className="cb-subtitle">
          Ecosistema integral de crecimiento sin costo para los{" "}
          <strong>9 negocios seleccionados</strong>
        </p>
      </div>

      {/* Cards grid */}
      <div className="cb-grid">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="cb-card opacity-0"
            style={{ "--cb-accent": b.accent, "--cb-accent-rgb": b.accentRgb } as React.CSSProperties}
          >
            <div className="cb-card-glow" />
            <div className="cb-card-inner">
              <div className="cb-icon-wrap">
                <span className="cb-icon">{b.icon}</span>
              </div>
              <div className="cb-card-content">
                <span className="cb-tag">{b.tag}</span>
                <h3 className="cb-card-title">{b.title}</h3>
                <p className="cb-card-desc">{b.desc}</p>
              </div>
            </div>
            <div className="cb-card-border" />
          </div>
        ))}
      </div>
    </section>
  );
}
