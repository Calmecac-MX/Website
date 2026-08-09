import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { LoaderProvider } from "@/components/LoaderContext";
import { CurtainProvider } from "@/components/CurtainContext";
import Preloader from "@/components/Preloader";
import DynamicFavicon from "@/components/DynamicFavicon";
import CurtainOverlay from "@/components/CurtainOverlay";

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
  icons: {
    icon: [
      {
        url: "/assets/favicon/negativo.ico",
        media: "(prefers-color-scheme: dark)",
        type: "image/x-icon",
      },
      {
        url: "/assets/favicon/positivo.ico",
        media: "(prefers-color-scheme: light)",
        type: "image/x-icon",
      },
    ],
    shortcut: "/assets/favicon/negativo.ico",
    apple: "/assets/favicon/negativo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${roboto.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <head>
        <DynamicFavicon />
      </head>
      <body className="min-h-full flex flex-col">
        <LoaderProvider>
          <CurtainProvider>
            <Preloader />
            <CurtainOverlay />
            {children}
          </CurtainProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}

