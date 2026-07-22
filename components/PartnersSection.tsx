"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PartnersSlider from "./PartnersSlider";

interface PartnersSectionProps {
  isActive?: boolean;
}

export default function PartnersSection({ isActive = false }: PartnersSectionProps) {
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
        [".partners-section-title", ".partners-section-subtitle"],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2 }
      );

      tl.fromTo(
        ".partners-slider-wrapper",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="partners-section"
      className="section-card plan-section flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: "url(/assets/backgrounds/About.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={containerRef}
    >
      <div className="plan-header text-center" style={{ marginBottom: "50px" }}>
        <h2 className="partners-section-title opacity-0 font-heading text-4xl md:text-5xl font-extrabold text-center">
          NUESTROS <span className="blanco text-shine-solid">PARTNERS</span>
        </h2>
        <p className="partners-section-subtitle opacity-0 text-center text-menta mt-2 font-subheading">
          Las marcas líderes que impulsan el desarrollo de tu canal e-commerce
        </p>
      </div>

      <div className="partners-slider-wrapper opacity-0 w-full">
        <PartnersSlider inline={true} />
      </div>
    </section>
  );
}
