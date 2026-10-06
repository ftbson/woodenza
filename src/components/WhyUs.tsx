"use client";

import { useEffect, useState, useRef } from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  active?: boolean;
}

const features: Feature[] = [
  {
    icon: "fa-solid fa-truck-fast",
    title: "Entrega rápida",
    description:
      "Entrega a domicilio en un plazo de 24 a 72 horas en toda Suiza.",
    active: true,
  },
  {
    icon: "fa-solid fa-award",
    title: "Calidad superior",
    description: "Leña suiza, secada en horno y certificada.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Pago seguro",
    description:
      "TWINT, tarjeta de crédito o pago contra factura, con cifrado completo.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Atención al cliente",
    description:
      "Asesoramiento personalizado de lunes a sábado.",
  },
];

interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { id: "clients", target: 15000, suffix: "+", label: "CLIENTES SATISFECHOS" },
  { id: "steres", target: 25000, suffix: "", label: "ESTÉREOS ENTREGADOS" },
  { id: "experience", target: 12, suffix: "", label: "AÑOS DE EXPERIENCIA" },
  { id: "cantons", target: 26, suffix: "", label: "CANTONES ATENDIDOS" },
];

export default function WhyUs() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    clients: 0,
    steres: 0,
    experience: 0,
    cantons: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        clients: Math.floor(progress * 15000),
        steres: Math.floor(progress * 25000),
        experience: Math.floor(progress * 12),
        cantons: Math.floor(progress * 26),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          clients: 15000,
          steres: 25000,
          experience: 12,
          cantons: 26,
        });
      }
    }, intervalTime);
  };

  return (
    <section className="whyus-section" ref={sectionRef}>
      <div className="whyus-container">
        {/* En-tête */}
        <div className="whyus-header">
          <h2 className="whyus-title">¿Por qué Woodenza?</h2>
          <p className="whyus-subtitle">
            Cuatro compromisos en los que puedes confiar.
          </p>
          <div className="whyus-line"></div>
        </div>

        {/* Ventajas */}
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div
                className={`feature-icon-wrap ${
                  feature.active ? "active" : ""
                }`}
              >
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="stats-banner">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-number">
                {counts[stat.id].toLocaleString("es-CH")}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
