"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface NosotrosHeroProps {
  isActive?: boolean;
}

export default function NosotrosHero({ isActive = false }: NosotrosHeroProps) {
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

      // Title letters reveal from below
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

      // Subtitle reveal
      tl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Description reveal
      tl.fromTo(
        ".hero-description",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // Logos/vectors reveal
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
      id="nosotros-hero"
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
            {splitText("EL", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
          </span>
          <span className="inline-block hero-title-word text-nowrap">
            {splitText("ORIGEN", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
          </span>
          <span className="inline-block hero-title-word text-nowrap">
            {splitText("DEL", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
          </span>
          <span className="inline-block hero-title-word text-nowrap">
            {splitText("SISTEMA.", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
          </span>
        </h1>

        <div className="hero-subtitle-container" style={{ margin: "20px auto", alignSelf: "center" }}>
          <p className="hero-subtitle opacity-0 text-center">
            EL TEMPLO DE LA ESTRATEGIA, LA DISCIPLINA Y EL ALTO RENDIMIENTO
          </p>
        </div>

        <div className="hero-description-container">
          <p className="hero-description opacity-0">
            En el corazón del imperio Mexica, el <span className="hero-description-highlight turquesa">Calmécac</span> (&quot;la casa de la estirpe&quot;) no era un colegio ordinario. Era la institución de alto rendimiento donde se forjaba a la nobleza para gobernar, administrar y ganar batallas. Bajo una disciplina inquebrantable, los jóvenes aprendían historia, astronomía, leyes y estrategia de guerra. <br /><br />
            En el <span className="bold blanco">Calmécac original</span>, los líderes no nacían, se construían mediante estructura y rigor. Hoy, adaptamos este contexto histórico para dar vida a una <span className="hero-description-highlight menta">incubadora de negocios de alto rendimiento</span> que sustituye la teoría corporativa por sistemas operativos digitales indestructibles para e-commerce.
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
