"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface ContactoPageContentProps {
  isActive?: boolean;
}

export default function ContactoPageContent({ isActive = false }: ContactoPageContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    asunto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
        if (effects && effects.hoverGlow && classNameMatches(e.currentTarget, "split-char")) {
          effects.hoverGlow(e.currentTarget, { color: hoverColor, glowColor, y: hoverY });
        }
      };

      const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const effects = (gsap as any).effects;
        if (effects && effects.hoverReset && classNameMatches(e.currentTarget, "split-char")) {
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

  const classNameMatches = (el: HTMLElement, cls: string) => {
    return el.classList.contains(cls);
  };

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".split-char",
        { y: "115%", opacity: 0, rotateX: -60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.02,
          ease: "back.out(1.4)",
        }
      );

      tl.fromTo(
        ".contact-info-block",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.6"
      );

      tl.fromTo(
        ".contact-form-card",
        { x: 30, opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power4.out" },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Postulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <section
      id="contacto"
      className="section-card plan-section relative flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundImage: "url(/assets/backgrounds/About.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      ref={containerRef}
    >
      <div className="max-w-[800px] w-full mx-auto flex flex-col items-center justify-center text-center gap-6">
        {/* Left Column: Info */}
        <div className="text-center flex flex-col items-center justify-center">
          <span className="text-xs font-extrabold tracking-widest text-menta uppercase mb-2 block">
            POSTULACIÓN DE INGRESO
          </span>
          <h1 className="hero-title text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight flex flex-wrap justify-center gap-x-3">
            <span className="inline-block text-nowrap">
              {splitText("HAGAMOS", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
            <span className="inline-block text-nowrap">
              {splitText("HISTORIA.", "#2ECDB7", "rgba(46, 205, 183, 0.6)")}
            </span>
          </h1>

          <p className="contact-info-block text-zinc-300 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Solo contamos con <strong>9 lugares disponibles</strong> para esta cohorte de aceleración Calmécac. Rellena el formulario de abajo para iniciar tu proceso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-start mb-6">
            <div className="contact-info-block flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-menta font-bold text-sm shrink-0">
                ✉
              </div>
              <div className="text-left">
                <h4 className="text-white text-[9px] font-bold uppercase tracking-wider">Soporte Académico</h4>
                <p className="text-zinc-400 text-xs mt-0.5">calmecac@rifatela.digital</p>
              </div>
            </div>

            <div className="contact-info-block flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-menta font-bold text-sm shrink-0">
                💬
              </div>
              <div className="text-left">
                <h4 className="text-white text-[9px] font-bold uppercase tracking-wider">WhatsApp Soporte</h4>
                <p className="text-zinc-400 text-xs mt-0.5">+52 (961) 234 5678</p>
              </div>
            </div>

            <div className="contact-info-block flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-menta font-bold text-sm shrink-0">
                📍
              </div>
              <div className="text-left">
                <h4 className="text-white text-[9px] font-bold uppercase tracking-wider">Clausura Presencial</h4>
                <p className="text-zinc-400 text-xs mt-0.5">Tuxtla Gutiérrez, Chiapas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="contact-form-card relative w-full max-w-[500px] mx-auto">
          <div
            className="stair-desc"
            style={{
              padding: "35px 30px",
              borderRadius: "24px",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: "rgba(46, 205, 183, 0.6)",
              background: "rgba(18, 23, 23, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)"
            }}
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 text-2xl"
                  style={{
                    color: "#2ECDB7",
                    borderColor: "rgba(46, 205, 183, 0.6)",
                    background: "rgba(46, 205, 183, 0.08)",
                  }}
                >
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4 font-heading">
                  ¡MENSAJE ENVIADO!
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-sm mx-auto">
                  Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo en menos de 24 horas a través de tu correo electrónico o WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white text-center mb-6 font-heading">
                  FORMULARIO DE CONTACTO
                </h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1 tracking-wider">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-menta transition-colors"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1 tracking-wider">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="juan@ejemplo.com"
                      className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-menta transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1 tracking-wider">WhatsApp / Teléfono</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 5512345678"
                      className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-menta transition-colors"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1 tracking-wider">Asunto</label>
                  <select
                    required
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-menta transition-colors cursor-pointer"
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                  >
                    <option value="" disabled>Selecciona un asunto...</option>
                    <option value="dudas">Dudas del programa</option>
                    <option value="alianzas">Alianzas</option>
                    <option value="estado">Calmécac en mi estado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1 tracking-wider">Mensaje o Consulta</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-menta transition-colors resize-none"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className={`submit-btn btn-primario btn w-full ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                    style={{ padding: "14px 20px" }}
                  >
                    <span className="btn-text">{isSubmitting ? "ENVIANDO MENSAJE..." : "HABLEMOS DE NEGOCIOS"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
