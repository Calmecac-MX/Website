"use client";

interface CtaProps {
  onAccept?: () => void;
}

export default function Cta({ onAccept }: CtaProps) {
  const handleAcceptClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onAccept) {
      e.preventDefault();
      onAccept();
    }
  };

  return (
    <section id="provocacion" className="section-card provocation-section">
      <div className="provocation-inner">
        <h2 className="provocation-title">
          ¿VAS A SEGUIR PRESUMIENDO TU IDEA O TE VAS{" "}
          <span className="menta">A RIFAR</span> A{" "}
          <span className="menta">HACERLA</span> DE VERDAD?
        </h2>
        <a
          href="#contacto"
          onClick={handleAcceptClick}
          className="btn btn-primario provocation-btn"
        >
          ACEPTO EL RETO Y ME LA JUEGO
        </a>
        <p className="provocation-subtitle">
          Llena el formulario. Muéstranos de qué estás hecho.
        </p>
      </div>
    </section>
  );
}
