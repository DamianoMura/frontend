// src/components/DisclaimerModal.jsx
import React, { useState } from "react";
import "../styles/DisclaimerModal.css";

function DisclaimerModal() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="disclaimer-overlay" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="disclaimer-modal">
        <div className="disclaimer-header">
          <span className="disclaimer-badge">⚠ Demo Project</span>
          <h2 id="disclaimer-title" className="disclaimer-title">NerdNest</h2>
        </div>

        <div className="disclaimer-body">
          {/* ENGLISH */}
          <section className="disclaimer-section">
            <h3 className="disclaimer-lang">🇬🇧 English</h3>
            <p>
              This website is a <strong>demo project</strong> developed for educational
              purposes by a Boolean web developement student team (Team 3). NerdNest is a fictional
              e-commerce platform for tech products.
            </p>
            <p>
              <strong>No real transactions are processed.</strong> Any orders placed, payment
              details entered, and personal data submitted are not stored permanently and will
              not be used for any commercial purpose.
            </p>
            <p>
              All products, prices, and content shown are fictional and intended solely for
              demonstration.
            </p>
          </section>

          <hr className="disclaimer-divider" />

          {/* ITALIAN */}
          <section className="disclaimer-section">
            <h3 className="disclaimer-lang">🇮🇹 Italiano</h3>
            <p>
              Questo sito è un <strong>progetto dimostrativo</strong> sviluppato a scopo
              didattico da un team del percorso studi di BOOLEAN web developement (Team 3). NerdNest è una piattaforma
              e-commerce fittizia dedicata a prodotti tecnologici.
            </p>
            <p>
              <strong>Nessuna transazione reale viene elaborata.</strong> Gli ordini effettuati,
              i dati di pagamento inseriti e le informazioni personali fornite non vengono
              conservati in modo permanente né utilizzati a fini commerciali.
            </p>
            <p>
              Tutti i prodotti, i prezzi e i contenuti visualizzati sono fittizi e destinati
              esclusivamente a scopo dimostrativo.
            </p>
          </section>
        </div>

        <div className="disclaimer-footer">
          <button className="btn disclaimer-btn" onClick={() => setVisible(false)}>
            Ho capito / I understand
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisclaimerModal;
