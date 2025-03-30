import { ShoppingCart, X } from "lucide-react";
import { Product } from "../type";
import { FaStar } from "react-icons/fa";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {product.title}
            </h2>
            <button className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
            >
              <X className="w-6 h-6" aria-label="Fechar"/>
            </button>
          </div>
          {/* imagem do produto */}
          <div className="mt-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full h-auto max-h-[300px] object-contain"
                />
              </div>
            </div>
            {/* detalhes do produto */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <FaStar className="text-yellow-500" aria-label="Estrela"/>
                {product.rating?.rate !== undefined && (
                  <span className="text-sm font-medium">
                    {product.rating.rate.toFixed(1)}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-6 leagding-relaxed">
                {product.description}
              </p>
              <div className="mb-8 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <button className="w-full bg-blue-600 rounded-xl text-white py-4 flex items-center justify-center gap-4 hover:bg-blue-700 transition-colors buttom-primary mt-4"
              onClick={() => {onAddToCart(product); onClose()}}
                
              >
                <ShoppingCart className="w-5 h-5" aria-label="Carrinho"/>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
