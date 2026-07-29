"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface ConvocatoriaHeroProps {
  isActive?: boolean;
}

export default function ConvocatoriaHero({ isActive = false }: ConvocatoriaHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = (
    text: string,
    hoverColor: string = "#2ECDB7",
    glowColor: string = "rgba(46, 205, 183, 0.6)",
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
          stagger: 0.015,
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
      id="convocatoria-hero"
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
            {splitText("CONVOCATORIA", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
          </span>
        </h1>

        <div className="hero-subtitle-container" style={{ margin: "20px auto", alignSelf: "center" }}>
          <p className="hero-subtitle opacity-0 text-center text-menta">
            COHORTE &quot;CALMÉCAC&quot;
          </p>
        </div>

        <div className="hero-description-container">
          <p className="hero-description opacity-0 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
            <span className="hero-description-highlight turquesa font-bold text-base md:text-lg block mb-4">¿Tu tienda en línea está lista para el siguiente nivel?</span>
            En el México prehispánico, el <strong>Calmécac</strong> era el centro de educación superior reservado para formar a los líderes, estrategas, nobles y guerreros de élite. Inspirados en esa visión de grandeza, la aceleradora <strong>Rífatela</strong>, en estrecha colaboración con <strong>Tiendanube</strong>, ha creado la campaña <strong>Calmécac</strong>: una cohorte de aceleración diseñada para forjar a los próximos líderes del comercio electrónico.
            <br /><br />
            Buscamos emprendedores que ya tengan tracción y quieran optimizar su infraestructura, escalar sus ventas y consolidar su marca. Si facturas más de <strong>$100,000 MXN mensuales</strong> en tu e-commerce actual, es momento de rifártela y aplicar.
          </p>
        </div>

        <div className="hero-logos" style={{ marginTop: "30px" }}>
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
