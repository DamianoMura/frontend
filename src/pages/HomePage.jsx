
import ProductSection from '../components/ProductSection';

const HomePage = () => {
  return (
    <main className="container py-3">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="card text-center bg-dark text-light shadow">
            <div className="card-body">
              <h1 className="card-title">Benvenuto su DotNerdNest</h1>
              <p className="card-text">Il tuo rifugio per ogni innovazione</p>
            </div>
          </div>
        </div>
      </div>

      <ProductSection title="Ultimi arrivi" filter="latest" scrollable />
      <ProductSection title="Più venduti" filter="popular" scrollable />
    </main>
  );
};

export default HomePage;

