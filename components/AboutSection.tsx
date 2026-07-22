"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface AboutSectionProps {
  isActive?: boolean;
}

export default function AboutSection({ isActive = false }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = (text: string, hoverColor: string = "#01A89E", glowColor: string = "rgba(1, 168, 158, 0.5)", hoverY: number = -6) => {
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalized coordinates (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    // Apply tilt angles to the pyramid elements (subtle tilt)
    const rx = -y * 20; // rotation around X axis
    const ry = x * 20;  // rotation around Y axis
    
    // Smooth translation offset (parallax)
    const tx = x * 45;
    const ty = y * 45;

    const piramide = containerRef.current.querySelector(".structure.piramide") as HTMLElement;
    if (piramide) {
      piramide.style.setProperty("--piramide-rx", `${rx}deg`);
      piramide.style.setProperty("--piramide-ry", `${ry}deg`);
      piramide.style.setProperty("--piramide-tx", `${tx}px`);
      piramide.style.setProperty("--piramide-ty", `${ty}px`);
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    
    const piramide = containerRef.current.querySelector(".structure.piramide") as HTMLElement;
    if (piramide) {
      piramide.style.setProperty("--piramide-rx", "0deg");
      piramide.style.setProperty("--piramide-ry", "0deg");
      piramide.style.setProperty("--piramide-tx", "0px");
      piramide.style.setProperty("--piramide-ty", "0px");
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Clip path animation to "build" the pyramid from bottom to top
      tl.fromTo(
        ".piramide",
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          scale: 0.95,
          opacity: 0,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          opacity: 0.85,
          duration: 1.6,
          ease: "power2.inOut",
        }
      );

      // Text elements reveal
      tl.fromTo(
        [".structure-title", ".structure-description", ".logo-calmecac-reveal"],
        { y: 40, opacity: 0, rotateX: 10, transformOrigin: "50% 0%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.22, ease: "power4.out" },
        "-=1.0"
      );

      tl.fromTo(
        ".structure-highlight",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(
        ".structure-highlight .split-char",
        { y: "110%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.015, ease: "back.out(1.2)" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="estructura"
      className="section-card structure-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="structure-background">
        <div className="structure-background-overlay">
          <Image
            src="/assets/images/piramide.png"
            alt="Pirámide Decorativa"
            width={1565}
            height={1000}
            className="structure piramide opacity-0"
            priority
          />
        </div>
      </div>
      <div className="grid-two-columns">
        <div className="structure-text-col">
          <h2 className="structure-title opacity-0">
            Construye la estructura{" "}
            <span className="blanco text-shine-solid">que tu empresa necesita para crecer.</span>
          </h2>
          <p className="structure-highlight opacity-0">
            CALMÉCAC{" "}
            <span className="turquesa text-nowrap">
              {splitText("transforma empresas tradicionales", "#01A89E", "rgba(1, 168, 158, 0.5)")}
            </span>{" "}
            en{" "}
            <span className="turquesa text-nowrap">
              {splitText("organizaciones digitales", "#01A89E", "rgba(1, 168, 158, 0.5)")}
            </span>{" "}
            mediante sistemas operativos inteligentes.
          </p>
          <p className="structure-description opacity-0">
            <span className="bold">La incubadora de negocios de alto rendimiento</span>{" "}
            que construye{" "}
            <span className="bold turquesa">
              estructuras operativas monumentales, sólidas e indestructibles.
            </span>{" "}
            Sin rollos corporativos. <br />
            <span className="bold">
              Venimos a automatizar tu e-commerce con esteroides e IA.
            </span>
          </p>
          <Image
            src="/assets/logos/calmecac/logo.svg"
            alt="Calmécac Logo"
            width={195}
            height={91}
            className="logo-calmecac margin-top-20 logo-calmecac-reveal opacity-0"
          />
        </div>
      </div>
      <div className="structure-forma" />
    </section>
  );
}
