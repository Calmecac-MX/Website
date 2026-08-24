"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AplicaClient() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const searchParams = useSearchParams();

  const baseUrl = "https://app.youform.com/forms/qucl1s6b";
  const params = new URLSearchParams();

  // Forward query parameters (such as proyecto, website, marketplace) to Youform
  searchParams.forEach((value, key) => {
    params.append(key, value);
  });

  const queryString = params.toString();
  const iframeSrc = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  return (
    <div className="w-full h-full flex-1 flex flex-col relative overflow-hidden bg-[#050B14]">
      {/* Loading Spinner Indicator */}
      {!iframeLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050B14] text-center p-6">
          <div className="w-12 h-12 border-4 border-[#2ECDB7]/20 border-t-[#2ECDB7] rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono text-[#2ECDB7] tracking-widest uppercase">
            CARGANDO FORMULARIO DE POSTULACIÓN...
          </p>
        </div>
      )}

      {/* Youform Iframe - Full Screen with bottom branding bar clipped */}
      <div className="w-full h-full flex-1 relative overflow-hidden">
        <iframe
          src={iframeSrc}
          loading="lazy"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="w-full h-[calc(100%+52px)] border-0 -mb-[52px]"
          onLoad={() => setIframeLoaded(true)}
          title="Formulario de Postulación Calmécac"
        />
      </div>
    </div>
  );
}
