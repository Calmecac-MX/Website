import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calmécac - No te falta tiempo. Te falta sistema.",
  description: "CALMÉCAC transforma empresas tradicionales en organizaciones digitales mediante sistemas operativos inteligentes y automatización con IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
