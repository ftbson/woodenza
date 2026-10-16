import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Comprar leña, pellets y estufas en Espana | Woodenza",
  description:
    "Consulta el catálogo Woodenza: leña, pellets, briquetas y estufas de leña con entrega en Espana.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}
