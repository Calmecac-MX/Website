import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import AplicaClient from "@/components/AplicaClient";

export const metadata: Metadata = {
  title: "Postulación - Calmécac | Aceleradora e-Commerce",
  description: "Formulario oficial de postulación para formar parte de la generación Calmécac. Rellena tus datos y demuestra de qué está hecho tu e-commerce.",
  openGraph: {
    title: "Postulación Calmécac",
    description: "Aplica ahora a la cohorte de aceleración e-commerce de Calmécac.",
    url: "https://aplica.calmecac.lat",
  },
};

export default function AplicaPage() {
  return (
    <div className="w-full h-screen w-screen bg-[#050B14] text-white overflow-hidden relative">
      <Header />
      <main className="absolute inset-0 w-full h-full flex flex-col overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full h-full flex-1 flex flex-col items-center justify-center bg-[#050B14] text-center p-6">
              <div className="w-12 h-12 border-4 border-[#2ECDB7]/20 border-t-[#2ECDB7] rounded-full animate-spin mb-4" />
              <p className="text-xs font-mono text-[#2ECDB7] tracking-widest uppercase">
                CARGANDO FORMULARIO DE POSTULACIÓN...
              </p>
            </div>
          }
        >
          <AplicaClient />
        </Suspense>
      </main>
    </div>
  );
}
