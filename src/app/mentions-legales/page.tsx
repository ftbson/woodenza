export default function LegalNoticePage() {
  return (
    <article className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Datos de publicación</span>
        <h1 className="legal-title">Aviso legal</h1>
        <p className="legal-intro">
          Este espacio reúne la información identificativa y las condiciones
          de uso de la tienda en línea.
        </p>

        <section className="legal-section">
          <h2>Editor y responsable del sitio</h2>
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
            Antes de publicar la versión definitiva, el responsable debe añadir
            la forma jurídica de la empresa, su número de registro y, cuando
            corresponda, el número de IVA.
          </p>
        </section>
        <section className="legal-section">
          <h2>Proveedor de alojamiento</h2>
          <p>
            El responsable debe indicar el nombre y el domicilio social del
            proveedor que aloja este sitio, utilizando los datos que este haya
            facilitado.
          </p>
        </section>
        <section className="legal-section">
          <h2>Derechos de propiedad intelectual</h2>
          <p>
            La legislación sobre propiedad intelectual protege los textos,
            imágenes, marcas, logotipos y otros contenidos de esta web. No está
            permitida su reproducción ni utilización sin autorización.
          </p>
        </section>
        <section className="legal-section">
          <h2>Disponibilidad y responsabilidad</h2>
          <p>
            Woodenza trabaja para que la información publicada sea correcta y
            esté al día, aunque pueden producirse errores o interrupciones
            temporales del servicio. La presencia de enlaces externos no
            supone que respaldemos los contenidos de terceros.
          </p>
        </section>
        <p className="legal-updated">
          Última actualización: 17 de septiembre de 2026
        </p>
      </div>
    </article>
  );
}
