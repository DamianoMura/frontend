import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductSection.css';

const API_BASE = 'http://localhost:3000';

/**
 * ProductSection component
 * - Renders a filtered list of products in a responsive grid
 * - Limited number of items per section
 */
const ProductSection = ({ title, filter, maxItems = 6 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/products?filter=${filter}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <div className="ps-section">
      <h2 className="ps-title">{title}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="ps-grid">
          {products.slice(0, maxItems).map((p) => (
            <div key={p.product_id} className="ps-grid-item">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;









