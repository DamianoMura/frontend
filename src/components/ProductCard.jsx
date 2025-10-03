import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (

  <div className="product-card">
    <img src={product.image_url} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.price}</p>
    <Link to={`/products/${product.product_id}`}>Dettaglio</Link>
  </div>
);

export default ProductCard;
