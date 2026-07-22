import type { Metadata } from "next";
import ConvocatoriaClient from "@/components/ConvocatoriaClient";

export const metadata: Metadata = {
  title: "Convocatoria Aceleración E-commerce 2026 - Calmécac | Rífatela & Tiendanube",
  description: "Aplica a la cohorte de aceleración Calmécac: un programa de crecimiento exclusivo para 9 e-commerce de alto rendimiento. Migración premium, sesiones de mentores y mes de gestión sin costo.",
  keywords: [
    "Convocatoria Calmécac 2026",
    "aceleración e-commerce México",
    "Rífatela Tiendanube",
    "becas aceleración digital",
    "migración Shopify a Tiendanube",
    "gestión e-commerce gratuita",
    "casos de éxito e-commerce",
    "ceremonia clausura Tuxtla"
  ],
};

export default function ConvocatoriaPage() {
  return <ConvocatoriaClient />;
}
