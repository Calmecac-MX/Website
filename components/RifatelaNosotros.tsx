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

interface RifatelaNosotrosProps {
  isActive?: boolean;
}

export default function RifatelaNosotros({ isActive = false }: RifatelaNosotrosProps) {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalized coordinates (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    // Apply parallax values as CSS variables
    containerRef.current.style.setProperty("--mouse-x", `${x * 60}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y * 60}px`);

    // Calculate 3D tilt angles for the image frame
    const tiltX = -y * 30;
    const tiltY = x * 30;
    
    const imageFrame = containerRef.current.querySelector(".image-frame") as HTMLElement;
    if (imageFrame) {
      imageFrame.style.setProperty("--tilt-x", `${tiltX}deg`);
      imageFrame.style.setProperty("--tilt-y", `${tiltY}deg`);
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    
    containerRef.current.style.setProperty("--mouse-x", "0px");
    containerRef.current.style.setProperty("--mouse-y", "0px");
    
    const imageFrame = containerRef.current.querySelector(".image-frame") as HTMLElement;
    if (imageFrame) {
      imageFrame.style.setProperty("--tilt-x", "0deg");
      imageFrame.style.setProperty("--tilt-y", "0deg");
    }
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
    const count = 20;

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
        ".image-frame",
        { scale: 0.9, opacity: 0, rotationY: -10 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "power2.out" }
      );

      tl.fromTo(
        ".callout-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      );

      tl.fromTo(
        ".rifatela-title",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      id="rifatela-nosotros"
      className="section-card callout-section relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

      <div className="callout-grid">
        <div className="image-frame opacity-0">
          <Image
            src="/assets/images/rifatela_operations.png"
            alt="Rifatela Operaciones Digitales e IA"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="callout-image"
            style={{ objectFit: "contain", backgroundColor: "#000000" }}
            priority
          />
          <div className="accent-dot accent-dot-1" aria-hidden="true" />
          <div className="accent-dot accent-dot-2" aria-hidden="true" />
        </div>
        
        <div className="divider" aria-hidden="true" />
        
        <div className="callout-inner text-wrap">
          <h2 className="rifatela-title opacity-0 font-heading text-4xl font-extrabold text-magenta mb-4">
            ¿QUÉ HACE RÍFATELA?
          </h2>
          <p className="callout-text opacity-0">
            <span className="emph text-white">Rífatela</span> es el brazo táctico de Calmécac. Aquí dejamos atrás las pláticas de coaching corporativo y nos enfocamos 100% en la <span className="emph text-menta">ejecución y la tracción tecnológica</span>. 
            <br />
            <br />
            Diseñamos e implementamos sistemas operativos inteligentes para e-commerce que automatizan flujos operativos mediante inteligencia artificial, optimizan tasas de conversión (CRO) y multiplican el retorno de inversión (ROI) en pauta digital.
            <br />
            <br />
            <strong>Somos un equipo de operadores reales para negocios que están listos para crecer sin límites.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
