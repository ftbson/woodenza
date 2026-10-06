"use client";

import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Qué tipos de madera ofrece Woodenza?",
      answer:
        "Ofrecemos principalmente maderas duras de alto poder calorífico: roble, haya, carpe y fresno. Arden durante más tiempo y de forma uniforme, por lo que son ideales para estufas, chimeneas y hogares cerrados.",
    },
    {
      question: "¿La leña está seca y lista para usar?",
      answer:
        "Sí. Toda nuestra leña se seca en horno (con una humedad residual inferior al 20 %) y está lista para usar desde la entrega, con una combustión óptima y menos humo.",
    },
    {
      question: "¿Qué longitudes de troncos hay disponibles?",
      answer:
        "Nuestros troncos se cortan en longitudes estándar de 25 o 33 cm, ideales para la mayoría de las estufas y chimeneas modernas.",
    },
    {
      question: "¿Ofrecen entrega a domicilio?",
      answer:
        "Sí. Entregamos los palés de leña directamente en tu domicilio y los dejamos con una transpaleta lo más cerca posible de tu zona de almacenamiento.",
    },
    {
      question: "¿Qué cantidad de leña debería pedir?",
      answer:
        "Para un uso ocasional, normalmente basta con medio palé. Si calientas principalmente con leña durante todo el invierno, recomendamos entre 2 y 3 palés completos, según el tamaño de tu hogar.",
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
            <span className="section-subtitle">INFORMACIÓN Y AYUDA</span>
            <h2 className="section-title">PREGUNTAS FRECUENTES</h2>

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
            <span className="section-subtitle">CONTACTO</span>
            <h2 className="section-title">
              No dudes en ponerte en contacto con nosotros si tienes alguna pregunta.
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
                  placeholder="Nombre"
                  required
                />
                <input
                  type="email"
                  className="input-underline"
                  placeholder="Correo electrónico"
                  required
                />
                <input
                  type="tel"
                  className="input-underline"
                  placeholder="Número de teléfono"
                />
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Asunto"
                />
              </div>

              {/* Mensaje */}
              <textarea
                className="input-underline textarea"
                placeholder="Tu mensaje"
                rows={3}
                required
              ></textarea>

              <button type="submit" className="btn-submit-contact">
                ENVIAR PREGUNTA
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
