"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  onNavigate?: (id: string, slideIdx: number) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="footer-quote" className="section-card footer-quote-section">
      <div className="footer-quote-inner">
        <p className="footer-quote-text">
          Aquí no venimos a ver si podemos, sino porque{" "}
          <span className="menta">podemos venimos</span>.
        </p>
        <div className="footer-cta-container" style={{ marginTop: "30px", marginBottom: "40px" }}>
          <a
            href="#contacto"
            className="btn btn-primario"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("contacto", 5);
              }
            }}
          >
            ACEPTO EL RETO
          </a>
        </div>
        <div className="hero-logos">
          <Image
            src="/assets/logos/calmecac/logo.svg"
            alt="Calmécac Logo"
            width={195}
            height={91}
            className="logo-calmecac"
          />
          <Image
            src="/assets/logos/rifatela/RIFATELA.svg"
            alt="Rifatela Logo"
            width={160}
            height={48}
            className="logo-rifatela"
          />
          <Image
            src="/assets/logos/tiendanube/TIENDANUBE.svg"
            alt="Tiendanube Logo"
            width={237}
            height={40}
            className="logo-tiendanube"
          />
        </div>

        <div className="footer-legal-link" style={{ marginTop: "28px", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase" }}>
          <Link href="/privacidad" className="text-gray-400 hover:text-[var(--menta)] transition-colors duration-200 font-medium">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
