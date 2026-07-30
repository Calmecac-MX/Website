import type { Metadata } from "next";
import PrivacidadClient from "@/components/PrivacidadClient";

export const metadata: Metadata = {
  title: "Política de Privacidad - Calmécac y Rífatela | Código de Honor Digital",
  description: "Conoce nuestra Política de Privacidad en Calmécac y Rífatela: protección de datos personales, uso responsable, cookies y ejercicio de Derechos ARCO.",
  keywords: [
    "Política de Privacidad Calmécac",
    "Privacidad Rífatela",
    "Derechos ARCO Rífatela",
    "Protección de datos personales",
    "Aviso de Privacidad e-commerce",
    "legal Rífatela",
  ],
  openGraph: {
    title: "Política de Privacidad - Calmécac y Rífatela",
    description: "En Rífatela, la privacidad no es un juego. Transparencia, protección de datos y código de honor legal.",
    type: "website",
  },
};

export default function PrivacidadPage() {
  return <PrivacidadClient />;
}
