import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No encontramos esta página | Woodenza",
  description:
    "La página que buscas no está disponible. Vuelve al inicio de Woodenza o explora el catálogo de leña, pellets y estufas.",
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Woodenza</span>
        <h1 className="legal-title">No encontramos esa página</h1>
        <p className="legal-intro">
          Puede que la dirección haya cambiado o que el contenido ya no esté disponible.
        </p>
        <Link href="/" className="about-link-btn">
          Regresar a la página principal
        </Link>
      </div>
    </main>
  );
}
