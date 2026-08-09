"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

if (typeof window !== "undefined") {
  // Overwrite-safe registration of global letter hover glow effects
  gsap.registerEffect({
    name: "hoverGlow",
    effect: (targets: gsap.DOMTarget, config: any) => {
      return gsap.to(targets, {
        color: config.color,
        textShadow: `0 0 12px ${config.glowColor}`,
        scale: config.scale,
        y: config.y,
        duration: config.duration,
        ease: "back.out(2)",
      });
    },
    defaults: {
      color: "#2ECDB7",
      glowColor: "rgba(46, 205, 183, 0.6)",
      scale: 1.15,
      y: -6,
      duration: 0.3,
    },
    extendTimeline: true,
  });

  gsap.registerEffect({
    name: "hoverReset",
    effect: (targets: gsap.DOMTarget, config: any) => {
      return gsap.to(targets, {
        color: config.color,
        textShadow: "none",
        scale: 1,
        y: 0,
        duration: config.duration,
        ease: "power2.out",
      });
    },
    defaults: {
      color: "",
      duration: 0.3,
    },
    extendTimeline: true,
  });
}

import { useCurtain } from "./CurtainContext";

export default function Header() {
  const [isStuck, setIsStuck] = useState(false);
  const { triggerCurtain } = useCurtain();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isStuck ? "is-stuck" : ""}`}>
      <div className="header-container">
        <Link href="/" className="logo-group" id="logo-link">
          <Image
            src="/assets/logos/calmecac/positivo.svg"
            alt="Calmécac Logo"
            width={150}
            height={72}
            className="logo-calmecac-header"
            priority
          />
        </Link>

        <nav className="nav-menu">
          <button
            onClick={() => triggerCurtain("/aplica")}
            className="nav-cta-btn cursor-pointer bg-transparent border-0 font-inherit"
          >
            Comenzar
          </button>
        </nav>
      </div>
    </header>
  );
}
