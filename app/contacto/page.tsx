import type { Metadata } from "next";
import ContactoClient from "@/components/ContactoClient";

export const metadata: Metadata = {
  title: "Contacto y Postulación - Calmécac | Aceleradora e-Commerce",
  description: "Postula a tu e-commerce para formar parte de la generación Calmécac. Rellena el formulario de registro y demuestra de qué está hecho tu negocio.",
  keywords: [
    "Contacto Calmécac",
    "postulación aceleración digital",
    "formulario de registro e-commerce",
    "Rífatela contacto",
    "inscribirse en Calmécac"
  ],
};

export default function ContactoPage() {
  return <ContactoClient />;
}
