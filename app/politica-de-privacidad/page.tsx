import type { Metadata } from "next";
import PrivacidadClient from "@/components/PrivacidadClient";

export const metadata: Metadata = {
  title: "Política de Privacidad - Calmécac y Rífatela",
  description: "Conoce nuestra Política de Privacidad en Calmécac y Rífatela.",
};

export default function PoliticaPrivacidadPage() {
  return <PrivacidadClient />;
}
