"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Poele from "@/components/Poele";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* 1. Carrusel principal */}
      <Hero />

      {/* 2. Categorías */}

      {/* 3. Productos más vendidos */}
      <BestSellers />

      <Poele />
      <Categories />

      {/* 4. Por qué Woodenza */}
      <WhyUs />

      {/* 5. Promoción de temporada */}

      <section className="promo-banner-section">
        <div className="promo-banner-container">
          <div className="promo-banner-content">
            {/* Descuento */}
            <div className="promo-badge">
              <i className="fa-solid fa-bolt"></i>
              <span>-50%</span>
            </div>

            {/* Título */}
            <h2 className="promo-title">
              Equipa tu hogar con calefacción de calidad y ahorra hasta un 50 %
            </h2>

            {/* Subtítulo */}
            <p className="promo-subtitle">
              Promoción de temporada disponible hasta fin de existencias.
            </p>
          </div>

          {/* Llamada a la acción */}
          <Link href="/boutique" className="promo-btn">
            <span>Explorar las ofertas</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
      {/* 6. Opiniones */}
      <Testimonials />

      {/* 7. Volver arriba */}

      <section className="scroll-top-section">
        {/* Botón fijo para volver arriba */}
        <button
          onClick={scrollToTop}
          className="scroll-top-btn-fixed"
          aria-label="Subir al inicio de la página"
        >
          <i className="fa-solid fa-arrow-up"></i>
          {/* <span>Volver arriba</span> */}
        </button>
      </section>
    </main>
  );
}
