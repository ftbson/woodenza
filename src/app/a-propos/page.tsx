import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes somos | Woodenza, calefacción de leña en Suiza",
  description:
    "Conoce Woodenza: una selección de leña, pellets, briquetas y estufas para calentar tu hogar con asesoramiento y entrega en Suiza.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* SECCIÓN 1: MISIÓN Y ÁREAS */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-grid-3">
            {/* Área 1: nuestra misión */}
            <div className="about-col">
              <span className="about-subtitle-tag">Conoce Woodenza</span>
              <h1 className="about-col-title">Calor de hogar, con una elección consciente</h1>
              <p className="about-text">
                En Woodenza queremos que calentar tu casa con leña sea una
                opción práctica, asequible y más respetuosa con el entorno.
                Elegimos combustibles de calidad procedentes de fuentes
                responsables para ofrecer un rendimiento fiable y un calor
                agradable en el día a día.
              </p>
            </div>

            {/* Área 2: experiencia */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Experiencia en calefacción para que elijas con tranquilidad.
                </h3>
                <p className="about-text">
                  Llevamos años distribuyendo leña y ayudamos a hogares y
                  empresas a encontrar soluciones adecuadas para sus
                  necesidades de calefacción.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                DESCUBRIR EL CATÁLOGO
              </Link>
            </div>

            {/* Área 3: selección de productos */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Productos elegidos por su calidad y rendimiento
                </h3>
                <p className="about-text">
                  En el catálogo encontrarás leña, briquetas de haya, pellets,
                  leña prensada y estufas de leña, seleccionados para ofrecer
                  un uso fiable y un buen rendimiento.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                EXPLORAR LOS PRODUCTOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: CON WOODENZA, ELIGES */}
      <section className="about-feature-section">
        <div className="about-container">
          <div className="about-feature-grid">
            {/* Imagen del almacén */}
            <div className="about-image-wrapper">
              <Image
                src="/img/about.jpeg"
                alt="Espacio de almacenamiento de leña de Woodenza"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="about-img"
                priority
              />
            </div>

            {/* Contenu texte */}
            <div className="about-feature-content">
              <span className="about-subtitle-tag">
                Tu tienda de leña y calefacción
              </span>
              <h2 className="about-main-title">
                Lo que encuentras en Woodenza
              </h2>

              <p className="about-highlight-text">
                Combustibles seleccionados, rendimiento fiable y atención
                personalizada para que encuentres una solución adaptada a tu
                hogar.
              </p>

              <p className="about-text">
                La calidad guía nuestra selección. Trabajamos con socios que
                apoyan una gestión forestal responsable y ofrecemos
                combustibles con alto poder calorífico, poca humedad residual
                y características constantes.
              </p>

              <p className="about-text">
                Buscamos productos que proporcionen una combustión eficiente y
                un calor constante. Seleccionamos cada referencia pensando en
                las necesidades de calefacción durante todo el año.
              </p>

              {/* Redes sociales */}
              <div className="about-social-divider">
                <div className="about-social-links"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
