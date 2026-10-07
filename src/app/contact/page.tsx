"use client";

import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Qué variedades de leña puedo encontrar?",
      answer:
        "El catálogo incluye sobre todo maderas duras con alto poder calorífico, como roble, haya, carpe y fresno. Su combustión uniforme y duradera las hace adecuadas para estufas, chimeneas y hogares cerrados.",
    },
    {
      question: "¿Puedo utilizar la leña nada más recibirla?",
      answer:
        "Sí. La leña se seca en horno y tiene una humedad residual inferior al 20 %, por lo que llega lista para usar y favorece una combustión eficiente con menos humo.",
    },
    {
      question: "¿En qué medidas se venden los troncos?",
      answer:
        "Disponemos de troncos de 25 y 33 cm, medidas habituales que se adaptan a muchas estufas y chimeneas modernas.",
    },
    {
      question: "¿Cómo se realiza la entrega de los palés?",
      answer:
        "Llevamos los palés hasta tu domicilio y, con una transpaleta, los dejamos tan cerca como sea posible del lugar donde los guardarás.",
    },
    {
      question: "¿Cuánta leña necesito para la temporada?",
      answer:
        "Para encender la chimenea de vez en cuando, medio palé suele ser suficiente. Si la leña es tu fuente principal de calor durante el invierno, puedes necesitar entre dos y tres palés, según el tamaño de la vivienda.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          {/* COLUMNA IZQUIERDA: preguntas frecuentes */}
          <div className="faq-column">
            <span className="section-subtitle">TE AYUDAMOS</span>
            <h2 className="section-title">Dudas habituales sobre leña y pedidos</h2>

            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? "active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <i
                      className={`fa-solid fa-chevron-${openFaq === index ? "up" : "down"}`}
                    ></i>
                  </button>
                  <div
                    className="faq-answer-wrapper"
                    style={{
                      maxHeight: openFaq === index ? "200px" : "0",
                      opacity: openFaq === index ? 1 : 0,
                    }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEPARADOR VERTICAL */}
          <div className="vertical-divider"></div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="form-column">
            <span className="section-subtitle">            ¿NECESITAS AYUDA?</span>
            <h2 className="section-title">
              Estamos aquí para resolver tus dudas sobre productos, entregas o pedidos.
            </h2>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              {/* Campo de texto */}
              <input
                type="text"
                className="input-full-bordered"
                placeholder=""
              />

              {/* Campos del formulario */}
              <div className="input-grid">
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Tu nombre"
                  required
                />
                <input
                  type="email"
                  className="input-underline"
                  placeholder="Tu correo electrónico"
                  required
                />
                <input
                  type="tel"
                  className="input-underline"
                  placeholder="Tu teléfono"
                />
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Motivo de la consulta"
                />
              </div>

              {/* Mensaje */}
              <textarea
                className="input-underline textarea"
                placeholder="Cuéntanos en qué podemos ayudarte"
                rows={3}
                required
              ></textarea>

              <button type="submit" className="btn-submit-contact">
                ENVIAR CONSULTA
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
