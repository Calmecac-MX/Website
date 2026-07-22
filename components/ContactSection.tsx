"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

interface ContactSectionProps {
  isActive?: boolean;
}

export default function ContactSection({ isActive = false }: ContactSectionProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    asunto: "",
    mensaje: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".contact-headline",
        { y: 30, opacity: 0, rotateX: 10, transformOrigin: "50% 0%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: "power3.out" }
      );

      tl.fromTo(
        ".contact-subhead",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        ".form-card-contacto",
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call delay and redirect to registration success route
    setTimeout(() => {
      router.push("/registro");
    }, 1500);
  };

  return (
    <section id="contacto" className="section-card contact-section-wrapper" ref={containerRef}>
      <div className="contact-layout">
        <div className="contact-text-col">
          <h2 className="contact-headline opacity-0">
            ¿Aún tienes <span className="blanco text-shine-solid">dudas?</span>
          </h2>
          <p className="contact-subhead opacity-0 font-subheading text-menta">
            Completa el formulario y en breve te contactaremos.
          </p>
        </div>
        
        <div className="form-card-contacto opacity-0 w-full max-w-[500px]">
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
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="text-center mb-6">
                <p className="text-xs text-zinc-400">
                  Ingresa tus datos para que podamos contactarte
                </p>
              </div>

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
                  <span className="btn-text">{isSubmitting ? "ENVIANDO POSTULACIÓN..." : "HABLEMOS DE NEGOCIOS"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}
