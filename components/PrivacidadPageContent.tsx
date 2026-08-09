"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

interface FloatingShape {
  id: number;
  left: number;
  top: number;
  depth: number;
  style: React.CSSProperties;
}

export default function PrivacidadPageContent() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("legal@calmecac.lat");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;

    containerRef.current.style.setProperty("--mouse-x", `${x * 40}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y * 40}px`);
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
      "sun.svg",
    ];

    const colors = ["#2ECDB7", "#01A89E", "#048179", "#ff4ea8"];
    const anims = ["float", "drift", "spin", "pulse"];
    const count = 24;

    const generateShapes = () => {
      const ww = typeof window !== "undefined" ? window.innerWidth : 1200;
      const wh = typeof window !== "undefined" ? window.innerHeight : 800;
      const newShapes: FloatingShape[] = [];

      for (let i = 0; i < count; i++) {
        const size = Math.floor(Math.random() * 45) + 12;
        const vec = vectors[Math.floor(Math.random() * vectors.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = (Math.random() * 0.4 + 0.15).toFixed(2);
        const left = Math.floor(Math.random() * (ww - size));
        const top = Math.floor(Math.random() * (wh * 2 - size));
        const anim = anims[Math.floor(Math.random() * anims.length)];
        const depth = Number((Math.random() * 1.1 + 0.2).toFixed(2));

        let dur: string;
        if (anim === "spin") {
          dur = (Math.random() * 20 + 10).toFixed(2);
        } else {
          dur = (Math.random() * 6 + 3.5).toFixed(2);
        }

        const delay = (Math.random() * 3).toFixed(2);
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".privacidad-hero-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        ".privacidad-hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" }
      );
      gsap.fromTo(
        ".privacidad-hero-lead",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        ".privacy-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          delay: 0.45,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen text-white pt-24 pb-20 px-4 sm:px-8 md:px-12 lg:px-16"
      style={{
        backgroundColor: "var(--black)",
        backgroundImage: "url(/assets/backgrounds/Hero.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative Floating SVGs */}
      <div className="decor-layer pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation back breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[var(--menta)] hover:text-white transition-colors duration-200 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al Inicio
          </Link>
        </div>

        {/* Hero Banner Header */}
        <div className="text-center mb-14 max-w-4xl mx-auto">
          <div className="privacidad-hero-badge inline-block px-4 py-1.5 rounded-full border border-[var(--menta)]/40 bg-[var(--menta)]/10 text-[var(--menta)] text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            Código de Honor & Transparencia Legal
          </div>
          <h1
            className="privacidad-hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            POLÍTICA DE <span className="text-[var(--menta)]">PRIVACIDAD</span>
          </h1>
          <p className="privacidad-hero-lead text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-normal">
            En <span className="font-bold text-[var(--menta)]">Rífatela</span> y{" "}
            <span className="font-bold text-white">Calmécac</span>, la privacidad no es un juego.
            Nos tomamos muy en serio la protección de tu información porque sabemos que la confianza
            es la base de todo buen negocio y de toda tribu de alto rendimiento.
            Aquí te explicamos <span className="text-[var(--menta)] font-semibold">clarito, al tiro y sin rodeos</span> qué hacemos con tus datos.
          </p>
        </div>

        {/* Grid of 6 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Card 1: ¿Quiénes somos? */}
          <div className="privacy-card bg-[#121717]/80 backdrop-blur-md border border-[var(--gris-oxford)]/40 hover:border-[var(--menta)]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(46,205,183,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--menta)]/15 border border-[var(--menta)]/40 flex items-center justify-center text-[var(--menta)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--menta)] tracking-widest uppercase">01. Identidad Legal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              1. ¿Quiénes somos?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Somos <strong className="text-white">Rífatela</strong>, una agencia de aceleración digital con base de operaciones estratégicas en la <strong className="text-[var(--menta)]">Ciudad de México</strong>. Para efectos legales, somos los responsables directos del tratamiento de tus datos personales recabados a través de este sitio web y de nuestras herramientas de automatización.
            </p>
          </div>

          {/* Card 2: ¿Qué datos recabamos? */}
          <div className="privacy-card bg-[#121717]/80 backdrop-blur-md border border-[var(--gris-oxford)]/40 hover:border-[var(--turquesa)]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(1,168,158,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--turquesa)]/15 border border-[var(--turquesa)]/40 flex items-center justify-center text-[var(--turquesa)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--turquesa)] tracking-widest uppercase">02. Recolección Quirúrgica</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              2. ¿Qué datos recabamos?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
              Únicamente pedimos la información estrictamente necesaria para poder ayudarte a acelerar tu negocio y llevarlo al siguiente nivel. Esto incluye:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">▪</span>
                <span><strong className="text-white">Datos de Identificación:</strong> Nombre completo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">▪</span>
                <span><strong className="text-white">Datos de Contacto:</strong> Correo electrónico, número de teléfono (WhatsApp) y dirección (si aplica para facturación).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">▪</span>
                <span><strong className="text-white">Datos del Proyecto:</strong> Información sobre tu empresa o idea de negocio para brindarte una consultoría estratégica y efectiva.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: ¿Para qué usamos tus datos? */}
          <div className="privacy-card bg-[#121717]/80 backdrop-blur-md border border-[var(--gris-oxford)]/40 hover:border-[var(--menta)]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(46,205,183,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--menta)]/15 border border-[var(--menta)]/40 flex items-center justify-center text-[var(--menta)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--menta)] tracking-widest uppercase">03. Motor de Servicio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              3. ¿Para qué usamos tus datos?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3">
              Tus datos son <strong className="text-[var(--menta)]">gasolina para nuestro motor de servicio</strong>. Los usamos para:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">✔</span>
                <span>Contactarte para agendar consultorías o llamadas de descubrimiento.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">✔</span>
                <span>Enviarte propuestas comerciales y cotizaciones a la medida.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">✔</span>
                <span>Automatizar el seguimiento de tu proyecto mediante herramientas avanzadas como ManyChat o CRM.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">✔</span>
                <span>Facturación y trámites administrativos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--menta)] font-bold">✔</span>
                <span>Enviarte contenido de alto valor, tips de aceleración digital y novedades (siempre podrás darte de baja con un clic).</span>
              </li>
            </ul>
          </div>

          {/* Card 4: No vendemos tus datos */}
          <div className="privacy-card bg-[#121717]/80 backdrop-blur-md border border-[var(--gris-oxford)]/40 hover:border-[var(--magenta)]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(255,78,168,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--magenta)]/15 border border-[var(--magenta)]/40 flex items-center justify-center text-[var(--magenta)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--magenta)] tracking-widest uppercase">04. Código de Honor</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              4. No vendemos tus datos
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-[var(--magenta)] uppercase">Punto.</strong> No alquilamos, vendemos ni compartimos tu información con terceros para fines publicitarios ajenos. Tu confianza es sagrada. Solo compartimos datos estrictamente necesarios con nuestros partners tecnológicos (como Shopify, Tiendanube o procesadores de pago) cuando es indispensable para la ejecución de tus servicios contratados.
            </p>
          </div>

          {/* Card 5: Cookies y Rastreo */}
          <div className="privacy-card bg-[#121717]/80 backdrop-blur-md border border-[var(--gris-oxford)]/40 hover:border-[var(--turquesa)]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(1,168,158,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--turquesa)]/15 border border-[var(--turquesa)]/40 flex items-center justify-center text-[var(--turquesa)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--turquesa)] tracking-widest uppercase">05. Experiencia de Usuario</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              5. Cookies y Rastreo
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Usamos cookies para entender cómo navegas en nuestro sitio y mejorarlo continuamente. <strong className="text-white">No son para espiarte</strong>, son para que la web no cargue lento y para saber qué servicios te interesan más. Puedes desactivarlas en tu navegador cuando quieras, aunque la experiencia podría no ser tan fluida (o <strong className="text-[var(--menta)]">&quot;chida&quot;</strong>).
            </p>
          </div>

          {/* Card 6: Tus Derechos ARCO */}
          <div className="privacy-card bg-[#121717]/80 backdrop-blur-md border border-[var(--gris-oxford)]/40 hover:border-[var(--menta)]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(46,205,183,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--menta)]/15 border border-[var(--menta)]/40 flex items-center justify-center text-[var(--menta)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[var(--menta)] tracking-widest uppercase">06. Control Absoluto</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              6. Tus Derechos ARCO
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              <strong className="text-[var(--menta)] font-bold">Tú mandas sobre tu información.</strong> Tienes derecho absoluto a <strong className="text-white">Acceder, Rectificar, Cancelar u Oponerte</strong> al uso de tus datos personales.
            </p>
            <div className="bg-[#0B132B] border border-[var(--menta)]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-gray-300">
                Escríbenos a: <span className="font-mono text-[var(--menta)] font-semibold">legal@calmecac.lat</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-full bg-[var(--menta)] text-[var(--black)] hover:bg-white transition-colors uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "¡Copiado!" : "Copiar Correo"}
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated ARCO Action Box */}
        <div className="bg-gradient-to-r from-[#121717] via-[#0B132B] to-[#121717] border border-[var(--menta)]/50 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[var(--menta)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[var(--turquesa)]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h3
            className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3 tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¿Quieres ejercer tus derechos ARCO o consultar algo con Legal?
          </h3>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Mándanos un correo directo a nuestro equipo legal. Atendemos cualquier solicitud <strong className="text-[var(--menta)]">de volada y al tiro</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:legal@calmecac.lat"
              className="btn btn-primario w-full sm:w-auto"
            >
              ENVIAR CORREO A LEGAL
            </a>
            <button
              onClick={handleCopyEmail}
              className="btn btn-secundario w-full sm:w-auto"
            >
              {copied ? "¡CORREO COPIADO AL PORTAPAPELES!" : "COPIAR LEGAL@CALMECAC.LAT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
