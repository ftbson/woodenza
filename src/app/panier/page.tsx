"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type Customer = {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
};

type WeroDetails = {
  enabled: boolean;
  recipientName?: string;
  phoneNumber?: string;
};

type BankTransferDetails = {
  enabled: boolean;
  accountName?: string;
  iban?: string;
  bic?: string;
};

type PaymentMethod = "stripe" | "wero" | "bank_transfer";

const emptyCustomer: Customer = {
  firstName: "",
  lastName: "",
  country: "Suiza",
  streetAddress: "",
  whatsapp: "",
  email: "",
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [weroDetails, setWeroDetails] = useState<WeroDetails | null>(null);
  const [bankTransferDetails, setBankTransferDetails] =
    useState<BankTransferDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const shippingCost = subtotal > 150 || cart.length === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  useEffect(() => {
    fetch("/api/wero")
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudo cargar Wero");
        setWeroDetails(await response.json());
      })
      .catch(() => setWeroDetails({ enabled: false }));

    fetch("/api/bank-transfer")
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudieron cargar los datos bancarios");
        setBankTransferDetails(await response.json());
      })
      .catch(() => setBankTransferDetails({ enabled: false }));
  }, []);

  const updateCustomer = (field: keyof Customer, value: string) =>
    setCustomer((current) => ({ ...current, [field]: value }));

  const checkout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const checkoutRoutes: Record<PaymentMethod, string> = {
        stripe: "/api/checkout/stripe",
        wero: "/api/checkout/wero",
        bank_transfer: "/api/checkout/bank-transfer",
      };
      const response = await fetch(checkoutRoutes[paymentMethod], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Se ha producido un error.");
      if (paymentMethod === "stripe") {
        if (!data.url)
          throw new Error("Falta la URL de pago de Stripe.");
        window.location.assign(data.url);
        return;
      }

      if (paymentMethod === "wero") {
        setMessage(
          `Pedido ${data.orderId} registrado. Envía ${data.grandTotal.toFixed(2)} € mediante Wero al ${data.weroDetails.phoneNumber}, a nombre de ${data.weroDetails.recipientName}.`,
        );
      } else {
        const { accountName, iban, bic } = data.bankDetails;
        const details = [
          accountName && `Beneficiario: ${accountName}`,
          iban && `IBAN : ${iban}`,
          bic && `BIC : ${bic}`,
        ]
          .filter(Boolean)
          .join(" | ");
        setMessage(
          `Pedido ${data.orderId} registrado. Realiza una transferencia de ${data.grandTotal.toFixed(2)} €${details ? ` a ${details}` : ". Ponte en contacto con nosotros para obtener los datos bancarios"}. Referencia: ${data.orderId}.`,
        );
      }
      clearCart();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Se ha producido un error.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-page-title">Mi carrito</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            {message && <p className="checkout-message">{message}</p>}
            <i className="fa-solid fa-basket-shopping empty-icon"></i>
            <h2>Tu carrito está vacío</h2>
            <p>Descubre nuestros productos y elige los que más te gusten.</p>
            <Link href="/boutique" className="btn-primary-cart">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <form className="cart-layout" onSubmit={checkout}>
            <div className="cart-items-section">
              <div className="cart-items-header">
                <span>Producto</span>
                <span>Precio</span>
                <span>Cantidad</span>
                <span>Total</span>
                <span></span>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <div className="cart-item-image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <p className="cart-item-category">{item.category}</p>
                      <h4 className="cart-item-title">{item.title}</h4>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    {item.price.toFixed(2).replace(".", ",")} €
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}{" "}
                    €
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
              <div className="cart-actions-bottom">
                <button type="button" className="btn-clear" onClick={clearCart}>
                  Vaciar el carrito
                </button>
                <Link href="/boutique" className="btn-continue">
                  <i className="fa-solid fa-arrow-left"></i> Seguir comprando
                </Link>
              </div>
              <section className="checkout-customer">
                <h2>Tus datos</h2>
                <div className="checkout-fields">
                  {(
                    [
                      ["firstName", "Nombre"],
                      ["lastName", "Apellidos"],
                      ["email", "Email"],
                      ["whatsapp", "Teléfono / WhatsApp"],
                      ["streetAddress", "Dirección de entrega"],
                      ["country", "País"],
                    ] as [keyof Customer, string][]
                  ).map(([field, label]) => (
                    <label key={field}>
                      {label}
                      <input
                        required
                        type={field === "email" ? "email" : "text"}
                        value={customer[field]}
                        onChange={(event) =>
                          updateCustomer(field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>
            </div>
            <div className="cart-summary-card">
              <h3>Resumen del pedido</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>
                  {shippingCost === 0
                    ? "Gratis"
                    : `${shippingCost.toFixed(2).replace(".", ",")} €`}
                </span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total (impuestos incluidos)</span>
                <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="payment-method"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />
                  Tarjeta bancaria (Stripe)
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment-method"
                    value="wero"
                    checked={paymentMethod === "wero"}
                    disabled={!weroDetails?.enabled}
                    onChange={() => setPaymentMethod("wero")}
                  />
                  Wero
                  {!weroDetails?.enabled && " (no disponible)"}
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment-method"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    disabled={!bankTransferDetails?.enabled}
                    onChange={() => setPaymentMethod("bank_transfer")}
                  />
                  Transferencia bancaria
                  {!bankTransferDetails?.enabled && " (no disponible)"}
                </label>
              </div>
              {paymentMethod === "wero" && weroDetails?.enabled ? (
                <div className="bank-transfer-details" role="status">
                  <strong>Datos de Wero</strong>
                  {weroDetails.recipientName && (
                    <p>
                      <span>Beneficiario</span> {weroDetails.recipientName}
                    </p>
                  )}
                  {weroDetails.phoneNumber && (
                    <p>
                      <span>Número</span> {weroDetails.phoneNumber}
                    </p>
                  )}
                  <p className="bank-transfer-reference">
                    Realiza el pago desde la aplicación Wero. El pedido quedará
                    pendiente de verificación.
                  </p>
                </div>
              ) : paymentMethod === "wero" ? (
                <p className="checkout-message">
                  {weroDetails === null
                    ? "Cargando los datos de Wero..."
                    : "El pago mediante Wero aún no está configurado. Ponte en contacto con nosotros para completar el pedido."}
                </p>
              ) : paymentMethod === "bank_transfer" &&
                bankTransferDetails?.enabled ? (
                <div className="bank-transfer-details" role="status">
                  <strong>Datos bancarios</strong>
                  {bankTransferDetails.accountName && (
                    <p>
                      <span>Beneficiario</span>{" "}
                      {bankTransferDetails.accountName}
                    </p>
                  )}
                  {bankTransferDetails.iban && (
                    <p>
                      <span>IBAN</span> {bankTransferDetails.iban}
                    </p>
                  )}
                  {bankTransferDetails.bic && (
                    <p>
                      <span>BIC</span> {bankTransferDetails.bic}
                    </p>
                  )}
                  <p className="bank-transfer-reference">
                    Indica la referencia del pedido al realizar la transferencia.
                    El pedido quedará pendiente de recibir los fondos.
                  </p>
                </div>
              ) : paymentMethod === "bank_transfer" ? (
                <p className="checkout-message">
                  {bankTransferDetails === null
                    ? "Cargando los datos bancarios..."
                    : "La transferencia bancaria aún no está configurada. Ponte en contacto con nosotros para completar el pedido."}
                </p>
              ) : null}
              {message && <p className="checkout-message">{message}</p>}
              <button
                className="btn-checkout"
                type="submit"
                disabled={
                  loading ||
                  (paymentMethod === "wero" && !weroDetails?.enabled) ||
                  (paymentMethod === "bank_transfer" &&
                    !bankTransferDetails?.enabled)
                }
              >
                {loading
                  ? "Procesando..."
                  : `Pedir con ${
                      paymentMethod === "stripe"
                        ? "Stripe"
                        : paymentMethod === "wero"
                          ? "Wero"
                          : "transferencia bancaria"
                    }`}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
