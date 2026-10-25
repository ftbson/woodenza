"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import "./AnalyticsConsent.css";

type ConsentChoice = "unknown" | "accepted" | "rejected";
const CONSENT_KEY = "woodenza-analytics-consent";
const CONSENT_CHANGE_EVENT = "woodenza-consent-change";

function subscribeToConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  };
}

function getConsentSnapshot(): ConsentChoice {
  try {
    const savedChoice = window.localStorage.getItem(CONSENT_KEY);
    return savedChoice === "accepted" || savedChoice === "rejected"
      ? savedChoice
      : "unknown";
  } catch {
    return "unknown";
  }
}

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => "unknown",
  );
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (consent !== "accepted") return;

    fetch("/api/analytics", { method: "POST", keepalive: true }).then(
      (response) => {
        if (!response.ok)
          throw new Error("La visite n'a pas pu être enregistrée.");
      },
    ).catch((error: unknown) => {
      console.error("Erreur lors de l'envoi des statistiques :", error);
    });
  }, [consent, pathname]);

  const chooseConsent = (choice: Exclude<ConsentChoice, "unknown">) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
      setShowSettings(false);
    } catch (error) {
      console.error("Impossible d'enregistrer le choix de confidentialité :", error);
    }
  };

  if (consent !== "unknown" && !showSettings) {
    return (
      <button
        type="button"
        className="analytics-privacy-button"
        onClick={() => setShowSettings(true)}
      >
        Privacidad
      </button>
    );
  }

  return (
    <aside className="analytics-consent" aria-label="Choix de confidentialité">
      <div>
        <strong>Estadísticas anónimas</strong>
        <p>
          Si aceptas, contaremos las páginas consultadas y el país aproximado
          cuando esté disponible. No guardamos direcciones IP ni identificamos
          visitantes.{" "}
          <Link href="/politique-de-confidentialite">
            Más información
          </Link>
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" onClick={() => chooseConsent("rejected")}>
          Rechazar
        </button>
        <button
          type="button"
          className="analytics-consent-accept"
          onClick={() => chooseConsent("accepted")}
        >
          Aceptar estadísticas
        </button>
      </div>
    </aside>
  );
}
