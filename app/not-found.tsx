import Error404 from "@/components/Error404";

export const metadata = {
  title: "404 - Página No Encontrada | Calmécac",
  description: "Tranqui, sin broncas. Te perdiste en el camino.",
};

export default function NotFound() {
  return <Error404 />;
}
