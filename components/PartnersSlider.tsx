"use client";

import Image from "next/image";

interface PartnersSliderProps {
  inline?: boolean;
}

export default function PartnersSlider({ inline = false }: PartnersSliderProps) {
  const logos = [
    { src: "/assets/logos/rifatela/RIFATELA.svg", alt: "Rífatela" },
    { src: "/assets/logos/tiendanube/TIENDANUBE.svg", alt: "Tiendanube" },
  ];

  // Repeat logos multiple times to ensure a smooth scrolling loop
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <div className={`partners-slider-container w-full overflow-hidden py-4 border-t border-b border-zinc-800/30 bg-zinc-950/10 backdrop-blur-[4px] ${inline ? "relative bottom-auto mt-0" : ""}`}>
      <div className="partners-slider-track animate-marquee">
        {repeatedLogos.map((logo, idx) => (
          <div key={idx} className="partners-logo-item shrink-0 px-8 flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={50}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300 filter brightness-100 grayscale hover:grayscale-0"
              style={{ height: "30px", width: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
