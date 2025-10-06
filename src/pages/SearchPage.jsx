// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import '../styles/SearchPage.css';
import ProductCard from '../components/ProductCard';

const API_BASE = 'http://localhost:3000';

/**
 * SearchPage component
 * - Allows searching and sorting products
 * - Displays results using ProductCard components
 */
const SearchPage = () => {
  const [query, setQuery] = useState(''); // Search query
  const [sort, setSort] = useState('name'); // Sort option
  const [products, setProducts] = useState([]); // Array of products
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission for search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products?search=${query}&sort=${sort}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  return (
    <main className="container py-3">
      {/* Search Form */}
      <form className="search-page-form mb-4" onSubmit={handleSearch}>
        <input
          className="form-control mb-2"
          type="search"
          placeholder="Search product..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className="form-select mb-2"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="recent">Recent</option>
        </select>
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {/* Search Results */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results-row row">
          {products.map(p => (
            <div key={p.product_id} className="col-md-4 mb-4">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SearchPage;
