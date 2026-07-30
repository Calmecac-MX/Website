import type { Metadata } from "next";
import PrivacidadClient from "@/components/PrivacidadClient";

export const metadata: Metadata = {
  title: "Aviso de Privacidad - Calmécac y Rífatela",
  description: "Conoce nuestro Aviso de Privacidad en Calmécac y Rífatela.",
};

export default function AvisoPrivacidadPage() {
  return <PrivacidadClient />;
}
