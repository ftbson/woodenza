import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Columna 1: marca, descripción y redes sociales */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <Image
              src="/img/woodenza.svg"
              alt="Woodenza"
              width={130}
              height={45}
            />
          </div>
          <p className="footer-description">
            Combustibles de alta calidad procedentes de bosques gestionados de
            forma sostenible.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Columna 2: productos */}
        <div className="footer-col">
          <h4 className="footer-heading">PRODUCTOS</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/boutique">Leña</Link>
            </li>
            <li>
              <Link href="/boutique">Pellets</Link>
            </li>
            <li>
              <Link href="/boutique">Briquetas de madera</Link>
            </li>
            <li>
              <Link href="/boutique">Leña compactada</Link>
            </li>
            <li>
              <Link href="/boutique">Estufas de leña</Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: información */}
        <div className="footer-col">
          <h4 className="footer-heading">INFORMACIÓN</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/livraison-et-retours">Envíos y devoluciones</Link>
            </li>
            <li>
              <Link href="/panier">Métodos de pago</Link>
            </li>
            <li>
              <Link href="/termes-et-conditions">
                Condiciones generales de venta
              </Link>
            </li>
            <li>
              <Link href="/politique-de-confidentialite">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales">Aviso legal</Link>
            </li>
          </ul>
        </div>

        {/* Columna 4: asistencia */}
        <div className="footer-col">
          <h4 className="footer-heading">ASISTENCIA</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/contact">Preguntas frecuentes</Link>
            </li>
            <li>
              <Link href="/contact">Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Columna 5: contacto */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">CONTACTO</h4>
          <ul className="contact-info-list">
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span>344 RUE DE LA CRESSONNIERE 97440 SAINT-ANDRE FRANCE</span>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+41767529493">+41767529493</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:contact@bonbois.fr">contact@bonbois.fr</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Pie de página: derechos y medios de pago */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 Woodenza. Todos los derechos reservados.
          </p>
          <div className="payment-icons">
            <span className="payment-card">VISA</span>
            <span className="payment-card">
              <i className="fa-brands fa-cc-mastercard"></i>
            </span>
            <span className="payment-card amex">AM EX</span>
            <span className="payment-card paypal">PayPal</span>
            <span className="payment-card applepay">
              <i className="fa-brands fa-apple-pay"></i> Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
