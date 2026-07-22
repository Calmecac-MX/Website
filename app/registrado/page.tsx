import Registro from "@/components/Registro";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomMenu from "@/components/BottomMenu";

export default function RegistradoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12">
        <Registro />
      </main>
      <Footer />
      <BottomMenu />
    </div>
  );
}
