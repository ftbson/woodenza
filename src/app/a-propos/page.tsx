import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* SECCIÓN 1: MISIÓN Y ÁREAS */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-grid-3">
            {/* Área 1: nuestra misión */}
            <div className="about-col">
              <span className="about-subtitle-tag">Sobre Woodenza</span>
              <h1 className="about-col-title">Nuestra misión</h1>
              <p className="about-text">
                En Woodenza creemos que la calefacción con leña debe ser
                económica, cómoda y respetuosa con el medioambiente. Por eso
                seleccionamos combustibles de alta calidad procedentes de
                fuentes responsables, para ofrecer un calor constante y un
                rendimiento óptimo en cada uso.
              </p>
            </div>

            {/* Área 2: experiencia */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Ponemos nuestra experiencia al servicio de tu comodidad.
                  Ahorra con nuestros productos y servicios.
                </h3>
                <p className="about-text">
                  Con años de experiencia en la distribución de leña, Woodenza
                  ayuda a particulares y empresas a cubrir todas sus
                  necesidades de calefacción.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                VISITAR LA TIENDA
              </Link>
            </div>

            {/* Área 3: selección de productos */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Una selección responsable y cuidadosa de productos
                </h3>
                <p className="about-text">
                  Ya sea leña, briquetas de haya, pellets, leña compactada o
                  estufas de leña, ofrecemos productos seleccionados por su
                  rendimiento y fiabilidad.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                VISITAR LA TIENDA
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
                alt="Almacén de leña de Woodenza"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="about-img"
                priority
              />
            </div>

            {/* Contenu texte */}
            <div className="about-feature-content">
              <span className="about-subtitle-tag">
                Tu especialista en calefacción con leña
              </span>
              <h2 className="about-main-title">
                Con Woodenza eliges:
              </h2>

              <p className="about-highlight-text">
                Calidad, rendimiento, sostenibilidad y atención personalizada.
                Nos enorgullece contribuir a una calefacción más natural,
                económica y responsable.
              </p>

              <p className="about-text">
                La calidad es el eje de todo lo que hacemos. Colaboramos con
                socios comprometidos con la gestión forestal sostenible y
                ofrecemos combustibles de alto poder calorífico, baja humedad
                residual, limpios y de calidad constante.
              </p>

              <p className="about-text">
                Nuestros productos ofrecen una combustión eficiente y de alta
                calidad. Probamos cada uno para garantizar una calefacción
                óptima en cualquier época del año.
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
