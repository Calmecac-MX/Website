"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLoader } from "./LoaderContext";

export default function Preloader() {
  const { finishLoading } = useLoader();
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("SISTEMA: INICIALIZANDO NÚCLEO...");
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    let current = 0;
    let timeoutId: NodeJS.Timeout;

    const updateProgress = () => {
      if (current >= 100) {
        return;
      }
      
      // Aumento inteligente: rápido al inicio, lento al final (de 70% a 90%), rápido al terminar
      let step = Math.floor(Math.random() * 3) + 1;
      if (current >= 70 && current < 90) {
        step = Math.random() > 0.4 ? 1 : 0;
      } else if (current >= 90) {
        step = Math.floor(Math.random() * 4) + 2;
      }

      current = Math.min(100, current + step);
      setProgress(current);

      // Logs cambiantes según el progreso
      if (current < 20) {
        setCurrentLog("SISTEMA: CONFIGURANDO NÚCLEO DIGITAL...");
      } else if (current < 40) {
        setCurrentLog("TIEMPO: SINCRONIZANDO CRONOGRAMAS Y FLUJOS...");
      } else if (current < 65) {
        setCurrentLog("DATOS: ESTABLECIENDO RED DE NODOS INTELIGENTES...");
      } else if (current < 85) {
        setCurrentLog("IA: IMPLEMENTANDO OPERACIONES DE ALTO RENDIMIENTO...");
      } else if (current < 98) {
        setCurrentLog("CALMÉCAC: COMPILANDO METODOLOGÍA OPERATIVA MEXICA...");
      } else {
        setCurrentLog("SISTEMA CALMÉCAC: EN LÍNEA Y OPTIMIZADO.");
      }

      // Intervalos de tiempo orgánicos
      let delay = Math.random() * 60 + 20; // 20ms - 80ms
      if (current >= 70 && current < 90) {
        delay = Math.random() * 200 + 100; // Simula carga pesada
      }
      
      timeoutId = setTimeout(updateProgress, delay);
    };

    timeoutId = setTimeout(updateProgress, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Animación de salida con GSAP al llegar a 100%
  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          finishLoading();
          setIsExited(true);
        },
      });

      // 1. Implosión del núcleo central
      tl.to(".preloader-center-element", {
        scale: 0.1,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6,
        ease: "back.in(1.5)",
      });

      // 2. Apertura dramática de persianas verticales
      tl.to(
        ".shutter-left",
        {
          xPercent: -100,
          duration: 1.1,
          ease: "power3.inOut",
        },
        "-=0.2"
      );

      tl.to(
        ".shutter-right",
        {
          xPercent: 100,
          duration: 1.1,
          ease: "power3.inOut",
        },
        "-=1.1"
      );

      // Desvanecer contenedor principal
      tl.to(
        ".preloader-container",
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.4,
        },
        "-=0.4"
      );
    }
  }, [progress, finishLoading]);

  // Efecto Parallax interactivo con el ratón
  useEffect(() => {
    if (progress === 100) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Pequeño desplazamiento 3D de ±15px max
      const x = (clientX - window.innerWidth / 2) / 35;
      const y = (clientY - window.innerHeight / 2) / 35;

      gsap.to(".preloader-parallax-core", {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [progress]);

  if (isExited) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Persianas deslizantes */}
      <div className="shutter-left absolute top-0 left-0 w-1/2 h-full bg-[#0B132B] border-r border-[#2ECDB7]/10" />
      <div className="shutter-right absolute top-0 right-0 w-1/2 h-full bg-[#0B132B] border-l border-[#2ECDB7]/10" />

      {/* Contenido del Loader */}
      <div className="preloader-content absolute inset-0 flex flex-col justify-center items-center">
        {/* Consola Técnica Superior Izquierda */}
        <div className="absolute top-8 left-8 hidden md:block font-mono text-[10px] text-[#2ECDB7]/40 leading-relaxed uppercase">
          <div>[SYS.STATUS: INITIALIZING]</div>
          <div>CORE_LOADER // VER: 4.0.9</div>
          <div>SECTORS: ACTIVE</div>
          <div>STABILITY_INDEX: 1.0</div>
        </div>

        {/* Consola Técnica Inferior Derecha */}
        <div className="absolute bottom-8 right-8 hidden md:block font-mono text-[10px] text-[#2ECDB7]/40 text-right leading-relaxed uppercase">
          <div>LATENCY: 0.05ms</div>
          <div>AZTEC_GRID: COMPILING</div>
          <div>SYS_TEMPO: SYNCHRONIZED</div>
          <div>[CALMECAC_READY: OK]</div>
        </div>

        {/* Elemento central parallax */}
        <div className="preloader-center-element flex flex-col items-center">
          <div className="preloader-parallax-core relative flex items-center justify-center">
            {/* Círculo de fondo glow */}
            <div className="absolute w-64 h-64 bg-[#2ECDB7]/5 rounded-full blur-3xl animate-pulse" />

            {/* SVG HUD de Círculos Concéntricos e Icono Pirámide */}
            <svg
              className="w-72 h-72 md:w-96 md:h-96 text-[#2ECDB7] drop-shadow-[0_0_15px_rgba(46,205,183,0.3)]"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Anillo Externo Punteado - Gira horario */}
              <circle
                cx="200"
                cy="200"
                r="175"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="animate-spin-slow-clockwise origin-center"
              />

              {/* Anillo de Ticks - Gira antihorario */}
              <circle
                cx="200"
                cy="200"
                r="155"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2 12"
                className="animate-spin-medium-counter origin-center opacity-60"
              />

              {/* Arcos Principales Gruesos */}
              <path
                d="M 200 35 A 165 165 0 0 1 365 200"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-80"
              />
              <path
                d="M 200 365 A 165 165 0 0 1 35 200"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-80"
              />

              {/* Anillo de Engranaje Azteca - Gira horario */}
              <circle
                cx="200"
                cy="200"
                r="125"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 6 4 6"
                className="animate-spin-medium-clockwise origin-center opacity-70"
              />

              {/* Anillo de Precisión Interno */}
              <circle
                cx="200"
                cy="200"
                r="105"
                stroke="currentColor"
                strokeWidth="0.5"
                className="opacity-40"
              />

              {/* Nodos de Conexión Digital (Puntos que parpadean) */}
              <circle cx="200" cy="35" r="3" fill="currentColor" className="animate-ping origin-center" />
              <circle cx="200" cy="365" r="3" fill="currentColor" className="animate-ping origin-center" />
              <circle cx="35" cy="200" r="3" fill="currentColor" className="animate-ping origin-center" />
              <circle cx="365" cy="200" r="3" fill="currentColor" className="animate-ping origin-center" />

              {/* Glifo Pirámide Mexica (Centro del Calmécac) */}
              <g className="text-[#2ECDB7]">
                {/* Estructura Base Piramidal */}
                <path
                  d="M 200 135 L 285 255 L 115 255 Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  fill="rgba(11, 19, 43, 0.7)"
                  className="drop-shadow-[0_0_8px_rgba(46,205,183,0.5)]"
                />
                
                {/* Líneas horizontales de niveles de la pirámide */}
                <line x1="171" y1="175" x2="229" y2="175" stroke="currentColor" strokeWidth="2.5" />
                <line x1="149" y1="205" x2="251" y2="205" stroke="currentColor" strokeWidth="2.5" />
                <line x1="127" y1="235" x2="273" y2="235" stroke="currentColor" strokeWidth="2.5" />

                {/* Escalera Central */}
                <path
                  d="M 188 175 L 188 255 L 212 255 L 212 175 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="rgba(11, 19, 43, 0.9)"
                />
                
                {/* Escalones */}
                <line x1="188" y1="191" x2="212" y2="191" stroke="currentColor" strokeWidth="1.5" />
                <line x1="188" y1="207" x2="212" y2="207" stroke="currentColor" strokeWidth="1.5" />
                <line x1="188" y1="223" x2="212" y2="223" stroke="currentColor" strokeWidth="1.5" />
                <line x1="188" y1="239" x2="212" y2="239" stroke="currentColor" strokeWidth="1.5" />
              </g>
            </svg>

            {/* Porcentaje en el centro de la pirámide (debajo de ella) */}
            <div className="absolute bottom-12 font-heading font-black text-2xl md:text-3xl text-[#2ECDB7] select-none tracking-widest drop-shadow-[0_0_10px_rgba(46,205,183,0.6)] font-mono">
              {String(progress).padStart(2, "0")}%
            </div>
          </div>

          {/* Log de carga dinámico */}
          <div className="mt-8 font-mono text-xs md:text-sm text-[#2ECDB7] tracking-[0.2em] uppercase select-none animate-pulse h-6 text-center drop-shadow-[0_0_5px_rgba(46,205,183,0.3)]">
            {currentLog}
          </div>

          {/* Barra de Progreso Minimalista Inferior */}
          <div className="mt-3 w-48 h-[2px] bg-[#2ECDB7]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#01A89E] to-[#2ECDB7] shadow-[0_0_8px_rgba(46,205,183,0.8)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
