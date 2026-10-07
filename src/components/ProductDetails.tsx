"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addProductToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart({
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image,
      });
    }
  };

  return (
    <main className="product-page">
      <div className="product-page-container">
        <div className="product-page-breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/boutique">Tienda</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrap">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="product-detail-image"
              priority
            />
            {product.discount && (
              <span className="badge-discount">{product.discount}</span>
            )}
          </div>

          <div className="product-detail-content">
            <span className="product-category">{product.category}</span>
            <h1>{product.title}</h1>
            <div className="product-rating product-detail-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star ${index < Math.floor(product.rating || 0) ? "active" : ""}`}
                  ></i>
                ))}
              </div>
              {product.reviewsCount !== undefined && (
                <span className="reviews-count">
                  ({product.reviewsCount} opiniones)
                </span>
              )}
            </div>

            <div className="product-detail-price">
              {product.oldPrice && (
                <span className="old-price">
                  {product.oldPrice.toFixed(2)} €
                </span>
              )}
              <strong>{product.price.toFixed(2)} €</strong>
            </div>
            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-purchase-row">
              <div className="quantity-control" aria-label="Cantidad">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Reducir la cantidad"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Aumentar la cantidad"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="btn-detail-add-cart"
                onClick={addProductToCart}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                Añadir a la cesta
              </button>
            </div>
            <Link href="/panier" className="product-cart-link">
              Ir a la cesta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
