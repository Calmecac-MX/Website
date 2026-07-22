"use client";

import Link from "next/link";

interface RegistroProps {
  onContinue?: () => void;
}

export default function Registro({ onContinue }: RegistroProps) {
  const handleShareClick = async () => {
    const shareData = {
      title: "Calmécac - No te falta tiempo. Te falta sistema.",
      text: "¡Ya quedé registrado en Calmécac para llevar mi e-commerce al siguiente nivel operativo!",
      url: typeof window !== "undefined" ? window.location.origin : "https://calmecac.mx",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("¡Enlace copiado al portapapeles! Compártelo con tus cuates.");
      } catch (err) {
        console.log("Error copying to clipboard:", err);
      }
    }
  };

  return (
    <section id="register" className="section-card register-section">
      <div className="register-inner">
        <h1 className="register-title">
          ¡Bomba! <br />
          <span className="register-font">Ya quedaste registrado.</span>
        </h1>
        <p className="register-text">
          Si <span className="bold">tu proyecto tiene lo que hay que tener</span>, te
          buscamos de volada. Si no, <span className="bold">no te agüites</span>:
          échale más ganas, refactoriza y <span className="bold">nos vemos en la siguiente</span>.
        </p>
        <div className="register-btns">
          <Link href="/" className="btn btn-primario register-btn">
            ¡Sigue en el tiro!
          </Link>
          <button
            onClick={handleShareClick}
            className="btn btn-secundario register-btn"
            id="share-social-media"
          >
            ¡Cuentale a tus cuates!
          </button>
        </div>
      </div>
    </section>
  );
}
