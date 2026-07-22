import type { Metadata } from "next";
import NosotrosClient from "@/components/NosotrosClient";

export const metadata: Metadata = {
  title: "Nosotros - Calmécac y Rífatela | Sistemas Operativos e IA para E-commerce",
  description: "Conoce el origen histórico de Calmécac, el templo Mexica de alto rendimiento, y cómo Rífatela y nuestros aliados como Tiendanube estructuran y automatizan tu negocio digital.",
  keywords: [
    "Calmécac origen",
    "contexto histórico Calmécac",
    "Rífatela qué hacemos",
    "aliado Tiendanube e-commerce",
    "sistemas operativos inteligentes",
    "automatización con IA",
    "incubadora de negocios",
    "estructuras operativas e-commerce",
    "CRO e-commerce"
  ],
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}
