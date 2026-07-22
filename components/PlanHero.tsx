"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface PlanHeroProps {
  isActive?: boolean;
}

export default function PlanHero({ isActive = false }: PlanHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = (
    text: string,
    hoverColor: string = "#ff4ea8",
    glowColor: string = "rgba(255, 78, 168, 0.6)",
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
        ".split-char",
        { y: "115%", opacity: 0, rotateX: -60, transformOrigin: "50% 0%" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.02,
          ease: "back.out(1.4)",
        }
      );

      tl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-description",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-logos",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="plan-hero"
      className="section-card hero-section relative"
      style={{
        backgroundImage: "url(/assets/backgrounds/Hero.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-inner" ref={containerRef}>
        <h1 className="hero-title overflow-hidden flex flex-wrap justify-center gap-x-4">
          <span className="inline-block hero-title-word text-nowrap">
            {splitText("EL PLAN", "#ff4ea8", "rgba(255, 78, 168, 0.6)")}
          </span>
          <span className="inline-block hero-title-word text-nowrap">
            {splitText("ACADÉMICO", "#ff4ea8", "rgba(255, 78, 168, 0.6)")}
          </span>
        </h1>

        <div className="hero-subtitle-container" style={{ margin: "20px auto", alignSelf: "center" }}>
          <p className="hero-subtitle opacity-0 text-center text-magenta">
            CRONOGRAMA DE INCUBACIÓN PARA LA ESCALA OPERATIVA E INTELIGENCIA DE NEGOCIO
          </p>
        </div>

        <div className="hero-description-container">
          <p className="hero-description opacity-0">
            <span className="hero-description-highlight menta font-bold text-xl block mb-4">Un programa táctico dividido en 11 sesiones intensivas.</span>
            Aprende a estructurar tu infraestructura tecnológica, dominar la adquisición agresiva y automatizar la retención de clientes para elevar el LTV de tu organización con la infraestructura líder de Tiendanube y el ecosistema IA de Rífatela.
          </p>
        </div>

        <div className="hero-logos" style={{ marginTop: "35px" }}>
          <Image
            src="/assets/logos/calmecac/logo.svg"
            alt="Calmécac Logo"
            width={195}
            height={91}
            className="logo-calmecac"
            priority
          />
        </div>
      </div>
    </section>
  );
}
