"use client";

import Header from "@/components/Header";
import PrivacidadPageContent from "@/components/PrivacidadPageContent";
import Footer from "@/components/Footer";
import BottomMenu from "@/components/BottomMenu";

export default function PrivacidadClient() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B]">
      <Header />
      <main className="flex-grow">
        <PrivacidadPageContent />
        <Footer />
      </main>
      <BottomMenu />
    </div>
  );
}
