import { useEffect } from "react";
import { Header } from "./components/Header";
import { ProductCart } from "./components/ProductCart";
import { useStore } from "./store/store";

function App() {
  const { products, loading, error, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <span className="text-gray-600">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-9">
        {loading ? (
          <div className="flex items-center justify-center h-64 translate-y-30">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
