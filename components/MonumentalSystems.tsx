"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface FloatingShape {
  id: number;
  left: number;
  top: number;
  depth: number;
  style: React.CSSProperties;
}

interface MonumentalSystemsProps {
  isActive?: boolean;
}

export default function MonumentalSystems({ isActive = false }: MonumentalSystemsProps) {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    containerRef.current.style.setProperty("--mouse-x", `${x * 60}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y * 60}px`);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--mouse-x", "0px");
    containerRef.current.style.setProperty("--mouse-y", "0px");
  };

  useEffect(() => {
    const vectors = [
      "espiral.svg",
      "espiral-2.svg",
      "3-dots-horizontal.svg",
      "3-dots-vertical.svg",
      "box.svg",
      "cross.svg",
      "dots-rectangle-horizontal.svg",
      "dots-rectangle-vertical.svg",
      "pyramid.svg",
      "sun.svg"
    ];
    
    const colors = ["#ff4ea8", "#01A89E", "#048179"];
    const anims = ["float", "drift", "spin", "pulse", "wobble"];
    const count = 18;

    const generateShapes = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const newShapes: FloatingShape[] = [];

      for (let i = 0; i < count; i++) {
        const size = Math.floor(Math.random() * 41) + 10;
        const vec = vectors[Math.floor(Math.random() * vectors.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = (Math.random() * 0.4 + 0.15).toFixed(2);
        const left = Math.floor(Math.random() * (ww - size));
        const top = Math.floor(Math.random() * (wh - size));
        const anim = anims[Math.floor(Math.random() * anims.length)];
        const depth = Number((Math.random() * 1.0 + 0.3).toFixed(2));
        
        let dur: string;
        if (anim === "spin") {
          dur = (Math.random() * 20 + 8).toFixed(2);
        } else {
          dur = (Math.random() * 6 + 3).toFixed(2);
        }
        
        const delay = (Math.random() * 4).toFixed(2);
        const timing = anim === "spin" ? "linear" : "ease-in-out";
        const dir = anim === "spin" ? "normal" : "alternate";

        const style: React.CSSProperties = {
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          opacity: Number(opacity),
          WebkitMaskImage: `url("/assets/vectors/${vec}")`,
          maskImage: `url("/assets/vectors/${vec}")`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          animation: `${anim} ${dur}s ${timing} ${delay}s infinite ${dir}`,
          transformOrigin: "50% 50%",
        };

        newShapes.push({
          id: i,
          left,
          top,
          depth,
          style,
        });
      }

      setShapes(newShapes);
    };

    generateShapes();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateShapes();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".monumental-title",
        { y: 35, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.0, ease: "power4.out" }
      );

      tl.fromTo(
        ".monumental-text",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        ".monumental-logo",
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="sistemas-monumentales"
      className="section-card provocation-section relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: "url(/assets/backgrounds/Fondo-Rojo.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative floating shapes background */}
      <div className="decor-layer" aria-hidden="true">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="decor-small-wrapper"
            style={{
              position: "absolute",
              left: `${shape.left}px`,
              top: `${shape.top}px`,
              transform: `translate3d(calc(var(--mouse-x, 0px) * ${shape.depth}), calc(var(--mouse-y, 0px) * ${shape.depth}), 0)`,
              transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              pointerEvents: "none",
            }}
          >
            <div
              className="decor-small"
              style={{ ...shape.style, left: 0, top: 0, position: "relative" }}
            />
          </div>
        ))}
      </div>

      <div className="provocation-inner relative w-full text-center" style={{ maxWidth: "900px" }}>
        <h2 className="monumental-title provocation-title opacity-0 font-heading text-6xl font-extrabold text-magenta mb-6 leading-tight">
          CONSTRUIMOS <span className="blanco text-shine-solid">SISTEMAS OPERATIVOS</span> MONUMENTALES
        </h2>
        <p className="monumental-text provocation-text opacity-0 text-xl text-zinc-300 leading-relaxed mb-10">
          Diseñamos e implementamos estructuras absolutas que permiten a las empresas escalar con confianza, alta eficiencia operativa y sostenibilidad a largo plazo.
        </p>
        <div className="monumental-logo opacity-0 flex justify-center mt-6">
          <Image
            src="/assets/logos/calmecac/logo.svg"
            alt="Calmecac Logo"
            width={180}
            height={84}
            className="logo-calmecac"
          />
        </div>
      </div>
    </section>
  );
}
