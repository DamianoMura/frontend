// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Layouts
import DefaultLayout from './layouts/DefaultLayout';

// Context Providers
import { CartProvider } from './context/CartContext';

/**
 * Main App component
 * - Wraps the application in the CartProvider for global cart state
 * - Uses BrowserRouter to handle routing
 * - All routes are wrapped inside DefaultLayout
 */
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* DefaultLayout wraps all pages to provide consistent header/footer */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

