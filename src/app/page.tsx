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

      <Categories />
      <Poele />

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
              Aprovecha nuestras ofertas y ahorra hasta un 50 %
            </h2>

            {/* Subtítulo */}
            <p className="promo-subtitle">
              Oferta de temporada, válida hasta agotar existencias.
            </p>
          </div>

          {/* Llamada a la acción */}
          <Link href="/boutique" className="promo-btn">
            <span>Comprar ahora</span>
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
          aria-label="Volver arriba"
        >
          <i className="fa-solid fa-arrow-up"></i>
          {/* <span>Volver arriba</span> */}
        </button>
      </section>
    </main>
  );
}
