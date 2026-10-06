"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  badge: string;
  badgeIcon: string;
  title: string;
  description: string;
  btnPrimaryText: string;
  btnPrimaryLink: string;
  btnSecondaryText: string;
  btnSecondaryLink: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "WOODENZA",
    badgeIcon: "fa-tree",
    title: "Calor natural para tu hogar",
    description:
      "Leña de primera calidad, con entrega en toda Suiza.",
    btnPrimaryText: "Comprar ahora",
    btnPrimaryLink: "/boutique",
    btnSecondaryText: "Ver categorías",
    btnSecondaryLink: "#categories",
    bgImage: "/img/hero-1.jpeg",
  },
  {
    id: 2,
    badge: "LEÑA PREMIUM",
    badgeIcon: "fa-fire",
    title: "Leña secada en horno",
    description:
      "Alto poder calorífico y un nivel de humedad residual inferior al 18 %.",
    btnPrimaryText: "Ver productos",
    btnPrimaryLink: "/boutique",
    btnSecondaryText: "Ver categorías",
    btnSecondaryLink: "#categories",
    bgImage: "/img/hero-2.jpeg",
  },
  {
    id: 3,
    badge: "ENVÍO GRATUITO",
    badgeIcon: "fa-truck-fast",
    title: "Entrega rápida en toda Suiza",
    description: "Haz tu pedido hoy y recíbelo en un plazo de 24 a 72 horas.",
    btnPrimaryText: "Descubrir",
    btnPrimaryLink: "/boutique",
    btnSecondaryText: "Ver categorías",
    btnSecondaryLink: "#categories",
    bgImage: "/img/hero-3.jpeg",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Gestion du Drag / Swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Autoplay (s'arrête au survol)
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, isDragging]);

  // Événements Tactiles et Souris pour le Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -50) nextSlide();
    else if (dragOffset > 50) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -50) nextSlide();
    else if (dragOffset > 50) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
        setDragOffset(0);
      }}
    >
      <div
        className="hero-slider"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
          transition: isDragging
            ? "none"
            : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="hero-slide"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Capa oscura para mejorar la legibilidad */}
            <div className="hero-overlay"></div>

            <div className="hero-content-container">
              <div className="hero-content">
                {/* Badge */}
                <div className="hero-badge">
                  <i className={`fa-solid ${slide.badgeIcon}`}></i>
                  <span>{slide.badge}</span>
                </div>

                {/* Título principal */}
                <h1 className="hero-title">{slide.title}</h1>

                {/* Descripción */}
                <p className="hero-description">{slide.description}</p>

                {/* Botones de acción */}
                <div className="hero-buttons">
                  <Link
                    href={slide.btnPrimaryLink}
                    className="btn-hero-primary"
                  >
                    {slide.btnPrimaryText}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link
                    href={slide.btnSecondaryLink}
                    className="btn-hero-secondary"
                  >
                    {slide.btnSecondaryText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de navegación */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Flechas de navegación */}
      <div className="hero-nav-buttons">
        <button
          className="hero-arrow-btn"
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="hero-arrow-btn"
          onClick={nextSlide}
          aria-label="Diapositiva siguiente"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
