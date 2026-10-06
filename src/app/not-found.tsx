import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada | Woodenza",
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Woodenza</span>
        <h1 className="legal-title">Página no encontrada</h1>
        <p className="legal-intro">
          Lo sentimos, la página que buscas no existe o se ha movido.
        </p>
        <Link href="/" className="about-link-btn">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
