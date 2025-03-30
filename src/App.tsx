import { useEffect } from "react";
import { Header } from "./components/Header";
import { ProductCart } from "./components/ProductCart";
import { useStore } from "./store/store";
import { ProductModal } from "./components/ProductModal";
import { CartModal } from "./components/CartModal";
import { Footer } from "./components/Footer";

function App() {
  const { products, loading, error, searchQuery, setSearchQuery, selectedProduct, setSelectedProduct, isCartOpen, setIsCartOpen, cartItems, fetchProducts, addToCart, removeFromCart, updateCartItemQuantity,  } = useStore();

  useEffect(() => {
    fetchProducts();
  });

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

  // função para pesquisar
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase())

)

  return (
    <div className="">
      <Header
      cartItemsCount={cartItems.length}
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      onCartClick={() => setIsCartOpen(true)}
      />
      <main className="container mx-auto px-4 py-9  ">
        {loading ? (
          <div className="flex items-center justify-center translate-y-10 h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCart
              IsIncart={cartItems.some((item) => item.id === product.id)}
              OnRemoveFromCart={removeFromCart}
              onddToProduct={addToCart}
               key={product.id} 
               product={product} 
               onProductClick={setSelectedProduct}
               />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <ProductModal
      onAddToCart={addToCart}
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
      />
      <CartModal
        onRemoveFromCart={removeFromCart}
        onUpdateCartItemQuantity={updateCartItemQuantity}
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;
