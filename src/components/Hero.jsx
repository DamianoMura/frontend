// src/components/Hero.jsx
import React from 'react'

export default function Hero({title="Benvenuto", subtitle="Scopri i nostri prodotti", cta="Scopri"}) {
  return (
    <section className="hero" role="region" aria-label="Hero">
      <div className="container hero-inner">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-sub">{subtitle}</p>
        <a className="hero-cta" href="#products" aria-label="Vai ai prodotti">{cta}</a>
      </div>
    </section>
  )
}
