"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useCurtain } from "./CurtainContext";

interface HeroSectionProps {
  onComfortClick?: () => void;
  onNavigate?: (id: string, slideIdx: number) => void;
  startAnimation?: boolean;
}

export default function HeroSection({
  onComfortClick,
  onNavigate,
  startAnimation = true,
}: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerCurtain } = useCurtain();

  const splitText = (text: string, hoverColor: string = "#2ECDB7", glowColor: string = "rgba(46, 205, 183, 0.6)", hoverY: number = -6) => {
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

  const handleComfortClick = () => {
    if (onComfortClick) {
      onComfortClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalAccept = () => {
    setIsModalOpen(false);
    triggerCurtain("/aplica");
  };

  useEffect(() => {
    if (!startAnimation) return;

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
          stagger: 0.025,
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

      // Buttons entrance
      tl.fromTo(
        ".hero-btn-anim",
        { y: 15, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 },
        "-=0.5"
      );

      // Logos stagger
      tl.fromTo(
        ".logo-partner",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        "-=0.4"
      );
      
      // Scroll indicator fade in
      tl.fromTo(
        ".scroll-indicator-wrapper",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <>
      <section id="hero" ref={containerRef} className="section-card hero-section relative" data-animate-svg>
        <div className="hero-inner">
          <h1 className="hero-title overflow-hidden flex flex-wrap justify-center gap-x-4">
            <span className="inline-block hero-title-word text-nowrap">
              {splitText("NO", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block hero-title-word text-nowrap">
              {splitText("TE", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block hero-title-word text-nowrap">
              {splitText("FALTA", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block hero-title-word text-nowrap">
              {splitText("TIEMPO.", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block hero-title-word text-nowrap">
              {splitText("TE", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block hero-title-word text-nowrap">
              {splitText("FALTA", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block hero-title-word text-nowrap">
              <span className="split-char">[</span>
              <span className="hero-title-highlight hero-title-highlight-glow">
                {splitText("SISTEMA", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
              </span>
              <span className="split-char">]</span>
            </span>
          </h1>
          <div className="hero-subtitle-container">
            <p className="hero-subtitle opacity-0">y eso se puede arreglar.</p>
          </div>
          <div className="hero-description-container">
            <p className="hero-description opacity-0">
              <span className="hero-description-highlight blanco">
                La alianza estratégica para merchants
              </span>{" "}
              que están listos para la verdadera madurez operativa.{" "}
              <span className="hero-description-highlight menta text-shine-solid">
                Sin rodeos, en corto y sin explicaciones redundantes: directo al grano.
              </span>
            </p>
          </div>
          <div className="hero-buttons">
            <button
              className="btn btn-primario hero-btn-anim opacity-0 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                triggerCurtain("/aplica");
              }}
            >
              ACEPTO EL RETO Y ME LA JUEGO
            </button>
            <button
              onClick={handleComfortClick}
              className="btn btn-secundario hero-btn-anim opacity-0"
              id="btn-comfort"
            >
              ME QUEDO EN MI ZONA DE CONFORT
            </button>
          </div>
          <div className="hero-logos">
            <Image
              src="/assets/logos/calmecac/logo.svg"
              alt="Calmécac Logo"
              width={195}
              height={91}
              className="logo-calmecac logo-partner opacity-0 svg-bg"
              priority
            />
            <Image
              src="/assets/logos/rifatela/RIFATELA.svg"
              alt="Rifatela Logo"
              width={160}
              height={48}
              className="logo-rifatela logo-partner opacity-0 svg-bg"
              priority
            />
            <Image
              src="/assets/logos/tiendanube/TIENDANUBE.svg"
              alt="Tiendanube Logo"
              width={237}
              height={40}
              className="logo-tiendanube logo-partner opacity-0 svg-bg"
              priority
            />
          </div>
        </div>

        {/* Scroll Mouse Indicator */}
        <div className="scroll-indicator-wrapper opacity-0">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Desliza para empezar</span>
        </div>
      </section>

      {/* Comfort Zone Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleModalClose();
          }}
        >
          <div className="relative w-[90%] max-w-[500px] rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center shadow-2xl transition-transform duration-300 scale-100">
            <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white uppercase font-heading">
              ¿Seguro que quieres seguir en tu <span className="text-turquesa">zona de confort</span>?
            </h3>
            <p className="mb-8 text-base text-zinc-400 font-body leading-relaxed">
              El crecimiento real ocurre fuera de tu zona cómoda. Los sistemas inteligentes de Calmécac automatizan tu e-commerce para darte la libertad que buscas. No le temas al éxito.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleModalAccept}
                className="w-full rounded-full bg-menta py-4 px-6 text-lg font-bold text-white transition-all duration-300 hover:bg-turquesa hover:translate-y-[-2px] hover:shadow-lg border border-gris-oxford"
              >
                ACEPTO EL RETO Y ME LA JUEGO
              </button>
              <button
                onClick={handleModalClose}
                className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-4 px-6 text-lg font-bold text-zinc-400 transition-all duration-300 hover:bg-zinc-800 hover:text-white"
              >
                Seguir de miedoso
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
