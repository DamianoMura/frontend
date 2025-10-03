import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title, filter, scrollable = false }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/products?filter=${filter}`)
      .then(res => res.json())
      .then(setProducts);
  }, [filter]);

  return (
    <section className="mb-5">
      {title && <h2 className=" text-center text-dark mb-3">{title}</h2>}
      <div className={scrollable ? 'overflow-auto' : ''}>
        <div className={scrollable ? 'd-flex flex-row gap-4' : 'row'}>
          {products.map(p => (
            <div key={p.product_id} className={scrollable ? '' : 'col-md-4'}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

