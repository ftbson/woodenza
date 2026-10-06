export default function LegalNoticePage() {
  return (
    <article className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Información del sitio web</span>
        <h1 className="legal-title">Aviso legal</h1>
        <p className="legal-intro">
          La siguiente información se publica de conformidad con las
          obligaciones aplicables a las tiendas en línea.
        </p>

        <section className="legal-section">
          <h2>Responsable del sitio web</h2>
          <p>
            Woodenza
            <br />
            Dirección: 344 RUE DE LA CRESSONNIERE 97440 SAINT-ANDRE FRANCE
            <br />
            Correo electrónico: contact@bonbois.fr
            <br />
            Teléfono: +41767529493
          </p>
          <p>
            El responsable del sitio debe completar los datos de identificación
            de la empresa (forma jurídica, número de registro y, si corresponde,
            número de IVA) antes de la publicación definitiva.
          </p>
        </section>
        <section className="legal-section">
          <h2>Alojamiento</h2>
          <p>
            El responsable del sitio debe completar los datos del proveedor de
            alojamiento y de su domicilio social con la información facilitada
            por dicho proveedor.
          </p>
        </section>
        <section className="legal-section">
          <h2>Propiedad intelectual</h2>
          <p>
            Los textos, imágenes, marcas, logotipos y demás elementos del sitio
            están protegidos por la normativa de propiedad intelectual. Queda
            prohibida cualquier reproducción o uso no autorizado.
          </p>
        </section>
        <section className="legal-section">
          <h2>Responsabilidad</h2>
          <p>
            Woodenza procura mantener la información exacta y actualizada. No
            obstante, el sitio puede dejar de estar disponible temporalmente o
            contener errores. Los enlaces a sitios de terceros no implican que
            avalemos su contenido.
          </p>
        </section>
        <p className="legal-updated">
          Última actualización: 17 de septiembre de 2026
        </p>
      </div>
    </article>
  );
}
