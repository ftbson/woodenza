"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./AnalyticsConsent.css";

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    fetch("/api/analytics", { method: "POST", keepalive: true }).then(
      (response) => {
        if (!response.ok)
          throw new Error("La visite n'a pas pu être enregistrée.");
      },
    ).catch((error: unknown) => {
      console.error("Erreur lors de l'envoi des statistiques :", error);
    });
  }, [pathname]);

  const dismissNotice = () => {
    setShowNotice(false);
  };

  if (!showNotice) {
    return null;
  }

  return (
    <aside className="analytics-consent" aria-label="Información de privacidad">
      <div>
        <strong>Estadísticas de visitas</strong>
        <p>
          Contamos las páginas consultadas y agrupamos las visitas por país
          aproximado cuando está disponible. No guardamos direcciones IP ni
          identificamos visitantes.{" "}
          <Link href="/politique-de-confidentialite">
            Más información sobre privacidad
          </Link>
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" onClick={dismissNotice}>
          Entendido
        </button>
      </div>
    </aside>
  );
}
