"use client";

import Link from "next/link";

export default function Error404() {
  return (
    <section id="error-404" className="section-card error-404-section">
      <div className="error-404-inner">
        <h1 className="error-404-title">
          ¡Brutal! <br />
          <span className="register-font">¿Te perdiste en el camino?</span>
        </h1>
        <p className="error-404-text">
          Tranqui, sin broncas. Un dev metió un bucle infinito y mandó todo a volar.{" "}
          <span className="bold">Regresa al inicio antes de que explote el servidor</span>.
        </p>
        <Link href="/" className="btn btn-primario error-404-btn">
          EL CABLE ROJO
        </Link>
      </div>
    </section>
  );
}
