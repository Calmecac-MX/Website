"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useCurtain } from "./CurtainContext";

export default function CurtainOverlay() {
  const { curtainPhase } = useCurtain();
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current) return;

    if (curtainPhase === "dropping") {
      gsap.killTweensOf([curtainRef.current, contentRef.current]);
      
      // Drop curtain from top (-100% to 0%)
      gsap.fromTo(
        curtainRef.current,
        { yPercent: -100, display: "flex" },
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power4.inOut",
        }
      );

      // Animate central Mexica emblem popping in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.8, opacity: 0, y: -20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.25,
            ease: "back.out(1.7)",
          }
        );
      }
    } else if (curtainPhase === "lifting") {
      // Lift curtain sliding down off screen or sliding back up
      gsap.to(curtainRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          if (curtainRef.current) {
            gsap.set(curtainRef.current, { display: "none", yPercent: -100 });
          }
        },
      });
    }
  }, [curtainPhase]);

  if (curtainPhase === "idle") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden select-none"
    >
      <div
        ref={curtainRef}
        className="w-full h-full bg-[#050B14] flex flex-col items-center justify-center relative shadow-[0_20px_50px_rgba(46,205,183,0.3)] border-b-2 border-[#2ECDB7]"
        style={{ transform: "translateY(-100%)" }}
      >
        {/* Background Aztec geometric overlay pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/backgrounds/About.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Ambient Turquoise Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#2ECDB7]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        {/* Central Content Container */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Logo / Isotipo */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-[#2ECDB7]/20 blur-lg animate-ping" />
            <Image
              src="/assets/logos/calmecac/positivo.svg"
              alt="Calmécac Logo"
              width={180}
              height={80}
              className="relative drop-shadow-[0_0_20px_rgba(46,205,183,0.5)]"
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-widest uppercase font-heading mb-3">
            ABRIENDO <span className="text-[#2ECDB7]">POSTULACIÓN</span>
          </h2>

          <p className="text-sm md:text-base text-zinc-400 font-mono tracking-wider max-w-md uppercase">
            CALMÉCAC // SISTEMA DE ADMISIÓN
          </p>

          {/* Loading bar visual */}
          <div className="mt-8 w-64 h-1 bg-zinc-800 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#01A89E] via-[#2ECDB7] to-[#71F2DE] w-full animate-pulse shadow-[0_0_10px_#2ECDB7]" />
          </div>
        </div>

        {/* Bottom Mexica Greca Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#2ECDB7] to-transparent opacity-80" />
      </div>
    </div>
  );
}
