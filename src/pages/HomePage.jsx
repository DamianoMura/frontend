import React from 'react';
import '../styles/HomePage.css';
import ProductSection from '../components/ProductSection';

const HomePage = () => {
  return (
    <main className="hn-main">
      {/* Hero Section */}
      <section className="hn-hero">
        <div className="hn-hero-content">
          <h1 className="hn-hero-title">Welcome to DotNerdNest</h1>
          <p className="hn-hero-subtitle">Tech, innovation, and comfort for your setup</p>
          <a href="/products" className="hn-hero-btn btn btn-primary">Explore Products</a>
        </div>
      </section>

      {/* Sections side by side */}
      <section className="hn-sections-container">
        <div className="hn-section-column">
          <ProductSection title="Latest Arrivals" filter="latest" maxItems={9} />
        </div>
        <div className="hn-section-column">
          <ProductSection title="Best Sellers" filter="popular" maxItems={9} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;







