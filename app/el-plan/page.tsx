import type { Metadata } from "next";
import PlanClient from "@/components/PlanClient";

export const metadata: Metadata = {
  title: "El Plan Académico de Incubación - Calmécac | Cronograma e-Commerce",
  description: "Conoce el plan detallado de 3 meses y 11 sesiones intensivas diseñado para transformar tu e-commerce: optimización de conversión, pauta agresiva, retención y unit economics.",
  keywords: [
    "Plan académico Calmécac",
    "cronograma e-commerce",
    "incubación paso a paso",
    "auditoría CRO",
    "API conversiones Meta",
    "logística ecommerce 3PL",
    "escalado Advantage Meta Ads",
    "marketing automatizado Klaviyo",
    "suscripciones e-commerce",
    "Unit Economics Looker Studio"
  ],
};

export default function PlanPage() {
  return <PlanClient />;
}
