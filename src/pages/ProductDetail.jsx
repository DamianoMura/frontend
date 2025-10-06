// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

// Context
import { useCart } from '../context/CartContext';

// Cart summary component
import CartSummary from '../components/CartSummary';

/**
 * ProductDetail page component
 * - Fetches product details based on URL parameter
 * - Allows adding/removing the product from cart
 * - Displays product image, description, price, brand, and cart summary
 */
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart();

  // Fetch product data from backend on mount or when id changes
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  // Check if product is already in cart
  const inCart = cart.some(item => item.product_id === product.product_id);

  // Safely format price
  const displayPrice = !isNaN(Number(product.price)) ? Number(product.price).toFixed(2) : "0.00";

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img
            src={`http://localhost:3000/images/${product.image_url}`} // backend-provided image
            alt={product.name}
            className="product-detail-img img-fluid"
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {displayPrice} €</p>
          <p>Brand: {product.brand}</p>

          {/* Add/Remove Cart Button */}
          <div className="my-3">
            {!inCart ? (
              <button
                className="btn btn-success"
                onClick={() => addToCart(product)}
                title="Add to cart"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(product.product_id)}
                title="Remove from cart"
              >
                <FontAwesomeIcon icon={faCartArrowDown} />
              </button>
            )}
          </div>

          {/* Cart Summary */}
          <div className="mt-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
