import type { Metadata } from "next";
import QueHacemosClient from "@/components/QueHacemosClient";

export const metadata: Metadata = {
  title: "¿Qué hacemos? - Calmécac | Incubación, Sistemas Operativos e IA para Empresas",
  description: "Descubre cómo Calmécac ayuda a las empresas establecidas a transformarse en organizaciones digitales, escalables e indestructibles a través de su Misión, Visión y sistemas operativos monumentales.",
  keywords: [
    "Calmécac qué hacemos",
    "misión y visión Calmécac",
    "sistemas operativos monumentales",
    "aceleración e-commerce",
    "automatización con IA",
    "incubadora de negocios Latinoamérica",
    "transformación digital",
    "estructuras operativas escalables"
  ],
};

export default function QueHacemosPage() {
  return <QueHacemosClient />;
}
