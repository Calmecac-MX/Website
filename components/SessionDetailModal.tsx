"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  colorScheme: "menta" | "yellow" | "magenta";
  sessionNumber: number;
  title: string;
  temario: string[];
  objetivos: string[];
  herramientas: string[];
  aprendizajes: string;
}

export default function SessionDetailModal({
  isOpen,
  onClose,
  colorScheme,
  sessionNumber,
  title,
  temario,
  objetivos,
  herramientas,
  aprendizajes,
}: SessionDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const colorMap = {
    menta: {
      text: "#2ECDB7",
      border: "rgba(46, 205, 183, 0.6)",
      glow: "rgba(46, 205, 183, 0.15)",
    },
    yellow: {
      text: "#EAB308",
      border: "rgba(234, 179, 8, 0.6)",
      glow: "rgba(234, 179, 8, 0.15)",
    },
    magenta: {
      text: "#ff4ea8",
      border: "rgba(255, 78, 168, 0.6)",
      glow: "rgba(255, 78, 168, 0.15)",
    },
  };

  const currentTheme = colorMap[colorScheme];

  const modalJSX = (
    <div
      className="fixed inset-0 z-50 overflow-y-auto w-screen h-screen bg-black/95 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 p-6 md:p-10 border-2 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: currentTheme.border,
          boxShadow: `0 20px 50px ${currentTheme.glow}`,
          backgroundImage: "url(/assets/backgrounds/About.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors text-sm font-semibold tracking-wider"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          CERRAR [X]
        </button>

        {/* Title */}
        <div className="mb-6">
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-1"
            style={{ color: currentTheme.text }}
          >
            SESIÓN {sessionNumber}
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight font-heading">
            {title}
          </h3>
        </div>

        {/* Two-column Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Temario */}
          <div>
            <h4
              className="text-sm font-extrabold tracking-wider uppercase mb-3 pb-1 border-b border-zinc-800"
              style={{ color: currentTheme.text }}
            >
              Temario de la Sesión
            </h4>
            <ul className="space-y-2 text-zinc-300 text-sm">
              {temario.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span style={{ color: currentTheme.text }}>▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Objetivos */}
          <div>
            <h4
              className="text-sm font-extrabold tracking-wider uppercase mb-3 pb-1 border-b border-zinc-800"
              style={{ color: currentTheme.text }}
            >
              Objetivos Clave
            </h4>
            <ul className="space-y-2 text-zinc-300 text-sm">
              {objetivos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span style={{ color: currentTheme.text }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Herramientas */}
        <div className="mb-8">
          <h4
            className="text-sm font-extrabold tracking-wider uppercase mb-3 pb-1 border-b border-zinc-800"
            style={{ color: currentTheme.text }}
          >
            Herramientas e Integraciones
          </h4>
          <div className="flex flex-wrap gap-2">
            {herramientas.map((item, idx) => (
              <span
                key={idx}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-900 border text-zinc-200"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Aprendizajes Esperados */}
        <div>
          <h4
            className="text-sm font-extrabold tracking-wider uppercase mb-3 pb-1 border-b border-zinc-800"
            style={{ color: currentTheme.text }}
          >
            Aprendizaje Esperado
          </h4>
          <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/40">
            {aprendizajes}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.body);
}
