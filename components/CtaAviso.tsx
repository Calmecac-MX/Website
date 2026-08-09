"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCurtain } from "./CurtainContext";

interface CtaAvisoProps {
  isModal?: boolean;
  initialStep?: number;
  onAccept?: () => void;
  onClose?: () => void;
  isActive?: boolean;
  onNavigate?: (id: string, slideIdx: number) => void;
}

export default function CtaAviso({ isModal = false, initialStep = 1, onAccept, onClose, onNavigate }: CtaAvisoProps) {
  const [step, setStep] = useState(initialStep);
  const [isShaking, setIsShaking] = useState(false);
  const [isRedAlert, setIsRedAlert] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { triggerCurtain } = useCurtain();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Sync state if initialStep changes (important when modal re-opens)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(initialStep);
  }, [initialStep]);

  const handleAcceptClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onAccept) {
      onAccept();
    } else {
      triggerCurtain("/aplica");
    }
  };

  const handleDeclineClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Step 2 decline: Trigger shake and warning red flash
      setIsShaking(true);
      setIsRedAlert(true);
      setTimeout(() => {
        setIsShaking(false);
        setIsRedAlert(false);
      }, 500);
    }
  };

  const content = (
    <>
      <h2 className="provocation-title">
        EL MERCADO <span className="menta">NO SIENTE COMPASIÓN</span>.
      </h2>
      {step === 1 ? (
        <>
          <p className="provocation-text">
            ¿Neta te vas a conformar con eso? O construyes una estructura indestructible o tu competencia te va a borrar del mapa de volada.
          </p>
          <div className="provocation-btns">
            <a
              href="#contacto"
              onClick={handleAcceptClick}
              className="btn btn-primario provocation-btn"
            >
              ACEPTO EL RETO Y ME LA JUEGO
            </a>
            <button
              onClick={handleDeclineClick}
              className="btn btn-secundario provocation-btn"
              id="btn-competencia"
            >
              PREFIERO QUE MI COMPETENCIA ME BORRE
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="provocation-text">
            <span className="bold">Si te agüitas antes de empezar, no te preocupes:</span>{" "}
            puedes seguir perdiendo el tiempo en Twitter presumiendo tu MVP, o regresar y{" "}
            <span className="bold">demostrar de qué estás hecho</span>.
          </p>
          <div className="provocation-btns">
            <a
              href="#contacto"
              onClick={handleAcceptClick}
              className="btn btn-primario provocation-btn"
            >
              ¡Cámbiate las pilas e inténtalo otra vez, rífatela!
            </a>
            <button
              onClick={handleDeclineClick}
              className="btn btn-secundario provocation-btn"
              id="btn-competencia"
              style={{
                borderColor: isShaking ? "var(--magenta)" : "var(--cyan)",
                color: isShaking ? "var(--magenta)" : "var(--blanco)"
              }}
            >
              ¡No te hagas, da click arriba y ponte al tiro!
            </button>
          </div>
        </>
      )}
    </>
  );

  const styleTag = (
    <style jsx>{`
      @keyframes stamp {
        0% {
          transform: scale(2.8) rotate(-10deg);
          opacity: 0;
          filter: blur(12px);
        }
        65% {
          transform: scale(0.92) rotate(3deg);
          opacity: 0.95;
          filter: blur(0);
        }
        85% {
          transform: scale(1.04) rotate(-1deg);
          opacity: 1;
        }
        100% {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
      }
      
      .stamp-active {
        animation: stamp 0.55s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        transform-origin: center center;
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        15%, 45%, 75% { transform: translateX(-8px); }
        30%, 60%, 90% { transform: translateX(8px); }
      }
      
      .shake-active {
        animation: shake 0.5s ease-in-out;
      }

      @keyframes red-flash {
        0% {
          background-color: rgba(255, 78, 168, 0.35);
          box-shadow: inset 0 0 100px rgba(255, 78, 168, 0.5);
        }
        100% {
          background-color: transparent;
          box-shadow: inset 0 0 0px rgba(255, 78, 168, 0);
        }
      }
      
      .red-flash-active {
        animation: red-flash 0.5s ease-out;
      }
    `}</style>
  );

  if (isModal) {
    if (!mounted) return null;

    const modalJSX = (
      <div
        className={`fixed inset-0 z-50 overflow-y-auto w-screen h-screen bg-black/95 ${isShaking ? "shake-active" : ""} ${isRedAlert ? "red-flash-active" : ""}`}
        style={{ transition: "all 0.3s ease" }}
      >
        {styleTag}
        <section
          id="provocacion-modal"
          className="section-card provocation-section w-full h-full min-h-screen"
          style={{
            backgroundImage: 'url(/assets/backgrounds/About.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: '80px 40px',
            borderRadius: 0,
          }}
        >
          <div className="provocation-inner relative w-full stamp-active">
            {onClose && (
              <button
                onClick={onClose}
                className="absolute -top-12 md:-top-16 right-4 md:right-0 text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-semibold tracking-wider"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                CERRAR [X]
              </button>
            )}
            {content}
          </div>
        </section>
      </div>
    );

    return createPortal(modalJSX, document.body);
  }

  return (
    <>
      {styleTag}
      <section
        id="provocacion"
        className={`section-card provocation-section ${isShaking ? "shake-active" : ""} ${isRedAlert ? "red-flash-active" : ""}`}
        style={{ transition: "all 0.3s ease" }}
      >
        <div className="provocation-inner relative w-full">
          {content}
        </div>
      </section>
    </>
  );
}
