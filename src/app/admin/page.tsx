// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import "./admin.css";

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  stripeSessionId?: string | null;
  createdAt: string;
}

interface WeroSettings {
  recipientName: string;
  phoneNumber: string;
  enabled: boolean;
}

interface BankTransferSettings {
  accountName: string;
  iban: string;
  bic: string;
  enabled: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [weroSettings, setWeroSettings] = useState<WeroSettings>({
    recipientName: "",
    phoneNumber: "",
    enabled: false,
  });
  const [savingWero, setSavingWero] = useState(false);
  const [weroMessage, setWeroMessage] = useState("");
  const [bankTransferSettings, setBankTransferSettings] =
    useState<BankTransferSettings>({
      accountName: "",
      iban: "",
      bic: "",
      enabled: false,
    });
  const [savingBankTransfer, setSavingBankTransfer] = useState(false);
  const [bankTransferMessage, setBankTransferMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/check")
      .then((response) => {
        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
        fetch("/api/orders")
          .then(async (ordersResponse) => {
            if (ordersResponse.ok) setOrders(await ordersResponse.json());
          })
          .catch(() => undefined);
        fetch("/api/admin/wero")
          .then(async (settingsResponse) => {
            if (settingsResponse.ok)
              setWeroSettings(await settingsResponse.json());
          })
          .catch(() =>
            setWeroMessage("Impossible de charger le paramétrage Wero."),
          );
        fetch("/api/admin/bank-transfer")
          .then(async (settingsResponse) => {
            if (settingsResponse.ok)
              setBankTransferSettings(await settingsResponse.json());
            else
              setBankTransferMessage(
                "Impossible de charger les coordonnées bancaires.",
              );
          })
          .catch(() =>
            setBankTransferMessage(
              "Impossible de charger les coordonnées bancaires.",
            ),
          );
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadOrders();
        loadWeroSettings();
        loadBankTransferSettings();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Échec de la connexion");
      }
    } catch {
      setLoginError("Une erreur est survenue.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des commandes :", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadWeroSettings = async () => {
    try {
      const response = await fetch("/api/admin/wero");
      if (response.ok) setWeroSettings(await response.json());
    } catch {
      setWeroMessage("Impossible de charger le paramétrage Wero.");
    }
  };

  const loadBankTransferSettings = async () => {
    try {
      const response = await fetch("/api/admin/bank-transfer");
      if (!response.ok)
        throw new Error("Impossible de charger les coordonnées bancaires.");
      setBankTransferSettings(await response.json());
    } catch (error) {
      setBankTransferMessage(
        error instanceof Error
          ? error.message
          : "Impossible de charger les coordonnées bancaires.",
      );
    }
  };

  const saveBankTransferSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingBankTransfer(true);
    setBankTransferMessage("");
    try {
      const response = await fetch("/api/admin/bank-transfer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankTransferSettings),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Enregistrement impossible.");
      setBankTransferSettings(data);
      setBankTransferMessage("Coordonnées bancaires enregistrées.");
    } catch (error) {
      setBankTransferMessage(
        error instanceof Error ? error.message : "Enregistrement impossible.",
      );
    } finally {
      setSavingBankTransfer(false);
    }
  };

  const saveWeroSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingWero(true);
    setWeroMessage("");
    try {
      const response = await fetch("/api/admin/wero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weroSettings),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Enregistrement impossible.");
      setWeroSettings(data);
      setWeroMessage("Coordonnées Wero enregistrées.");
    } catch (error) {
      setWeroMessage(
        error instanceof Error ? error.message : "Enregistrement impossible.",
      );
    } finally {
      setSavingWero(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="admin-loading">
        <p>Chargement...</p>
      </div>
    );
  }

  // ÉCRAN DE CONNEXION
  if (!isAuthenticated) {
    return (
      <main className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <i className="fa-solid fa-lock admin-login-icon"></i>
            <h1 className="admin-login-title">Connexion Admin</h1>
            <p className="admin-login-subtitle">Administration Woodenza</p>
          </div>

          {loginError && <div className="admin-login-error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="username">Nom d&apos;utilisateur</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="admin-btn-primary">
              Se connecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TABLEAU DE BORD ADMIN
  return (
    <main className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-header-title">Commandes</h1>
          <p className="admin-header-desc">
            Aperçu de toutes les commandes clients reçues
          </p>
        </div>

        <button onClick={handleLogout} className="admin-btn-logout">
          <i className="fa-solid fa-right-from-bracket"></i> Se déconnecter
        </button>
      </div>

      <section className="admin-payment-settings">
        <h2>Paramétrage du paiement Wero</h2>
        <form onSubmit={saveWeroSettings}>
          <label>
            Nom du bénéficiaire
            <input
              required={weroSettings.enabled}
              value={weroSettings.recipientName}
              onChange={(event) =>
                setWeroSettings((current) => ({
                  ...current,
                  recipientName: event.target.value,
                }))
              }
              maxLength={120}
            />
          </label>
          <label>
            Numéro Wero
            <input
              required={weroSettings.enabled}
              value={weroSettings.phoneNumber}
              onChange={(event) =>
                setWeroSettings((current) => ({
                  ...current,
                  phoneNumber: event.target.value,
                }))
              }
              maxLength={40}
            />
          </label>
          <label className="admin-wero-enabled">
            <input
              type="checkbox"
              checked={weroSettings.enabled}
              onChange={(event) =>
                setWeroSettings((current) => ({
                  ...current,
                  enabled: event.target.checked,
                }))
              }
            />
            Activer Wero au paiement
          </label>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={savingWero}
          >
            {savingWero ? "Enregistrement..." : "Enregistrer Wero"}
          </button>
        </form>
        {weroMessage && <p className="admin-wero-message">{weroMessage}</p>}
      </section>

      <section className="admin-payment-settings">
        <h2>Paramétrage du virement bancaire</h2>
        <form onSubmit={saveBankTransferSettings}>
          <label>
            Nom du bénéficiaire
            <input
              required={bankTransferSettings.enabled}
              value={bankTransferSettings.accountName}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  accountName: event.target.value,
                }))
              }
              maxLength={120}
            />
          </label>
          <label>
            IBAN
            <input
              required={bankTransferSettings.enabled}
              value={bankTransferSettings.iban}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  iban: event.target.value,
                }))
              }
              maxLength={34}
              autoComplete="off"
            />
          </label>
          <label>
            BIC (facultatif)
            <input
              value={bankTransferSettings.bic}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  bic: event.target.value,
                }))
              }
              maxLength={11}
              autoComplete="off"
            />
          </label>
          <label className="admin-wero-enabled">
            <input
              type="checkbox"
              checked={bankTransferSettings.enabled}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  enabled: event.target.checked,
                }))
              }
            />
            Activer le virement bancaire au paiement
          </label>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={savingBankTransfer}
          >
            {savingBankTransfer
              ? "Enregistrement..."
              : "Enregistrer le virement"}
          </button>
        </form>
        {bankTransferMessage && (
          <p className="admin-wero-message" role="status">
            {bankTransferMessage}
          </p>
        )}
      </section>

      {loadingOrders ? (
        <p className="admin-loading">Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <div className="admin-empty-state">Aucune commande disponible.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>N° de commande</th>
                <th>Client</th>
                <th>Adresse de livraison</th>
                <th>Contact</th>
                <th>Montant total</th>
                <th>Paiement</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-order-id">{order.id}</td>
                  <td>
                    <strong>
                      {order.firstName} {order.lastName}
                    </strong>
                    <br />
                    <span className="admin-customer-sub">{order.country}</span>
                  </td>
                  <td>{order.streetAddress}</td>
                  <td>
                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-whatsapp-link"
                    >
                      <i className="fa-brands fa-whatsapp"></i> {order.whatsapp}
                    </a>
                    <br />
                    <span className="admin-customer-sub">{order.email}</span>
                  </td>
                  <td className="admin-price">
                    € {order.grandTotal.toFixed(2)}
                  </td>
                  <td>
                    <strong>
                      {order.paymentMethod === "wero"
                        ? "Wero"
                        : order.paymentMethod === "stripe"
                          ? "Stripe"
                          : "Virement"}
                    </strong>
                    <br />
                    <span
                      className={`admin-badge admin-badge-${order.paymentStatus}`}
                    >
                      {order.paymentStatus === "paid" ? "Payé" : "En attente"}
                    </span>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("fr-CH")}
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge-${order.status}`}>
                      {order.status === "pending" ? "En attente" : order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
