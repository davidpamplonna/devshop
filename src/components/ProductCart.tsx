import { ShoppingCart, Trash2 } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Product } from "../type";

interface ProductCartProps {
  product: Product;
  onProductClick: (product: Product) => void;
  IsIncart: boolean;
  onddToProduct: (product: Product) => void;
  OnRemoveFromCart: (product: number) => void;
}

export function ProductCart({ product, onProductClick, IsIncart, onddToProduct, OnRemoveFromCart }: ProductCartProps) {


  // função para renderizar as estrelas
  const renderStar = () => {
    const Stars = [];
    const rating = Math.round(product.rating.rate);

    for (let i = 1; i <= 5; i++) {
      Stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" aria-label="Estrela"/>
        ) : (
          <FaRegStar className="text-gray-300" aria-label="Estrela Vazia"/>
        )
      );
    }
    return Stars;
  };


  // função para adicionar ou remover do carrinho

  const handleCartClick = (e: React.MouseEvent) => {
      e.stopPropagation(); 
      if(IsIncart){
        OnRemoveFromCart (product.id);
      } else {
        onddToProduct(product);
      }
  }


  return (
    <section className="bg-white px-3 py-3 rounded-2xl overflow-hidden card-hover">
      <div className="aspect-square overflow-hidden cursor-pointer relative-group">
        <img
          onClick={() => onProductClick(product)}
          className="w-full h-full object-contain py-5"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            {renderStar()}
            <span className="text-gray-600">({product.rating.count})</span>
          </div>
          <span className="text-blue-700 font-bold text-lg">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <p className="line-clamp-2 text-gray-600 text-sm mb-4">
          {product.description}
        </p>
        <button 
        onClick={handleCartClick}
        className={`bg-blue-600 w-full text-bold text-white hover:bg-blue-700 transition-all duration-400 py-4 rounded-xl flex items-center justify-center gap-3
        ${IsIncart ?
          'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }
        `}>

         {IsIncart ? (
          <>
          <Trash2 className="w-5 h-5" aria-label="Remover"/>
          <span className="sm:hidden md:inline">Remover do carrinho</span>
          </>
         ) :(
          <>
           <ShoppingCart className="w-5 h-5" aria-label="Adicionar"/>
           <span>Adicionar ao carrinho</span>
          </>
         
         )}
         
        </button>
      </div>
    </section>
  );
}
