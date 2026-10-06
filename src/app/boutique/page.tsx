import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Tienda | Woodenza",
  description:
    "Descubre nuestra selección de leña, pellets y briquetas de madera.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}
