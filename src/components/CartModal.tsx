import { ShoppingBag, X } from "lucide-react";
import { CartItem } from "../type";


interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
}

export function CartModal({ isOpen, onClose, items }: CartModalProps) {
 if(!isOpen) return null


  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-hidden">
        <div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Seu Carrinho
              </h2>
              <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 font-medium">Seu Carrinho está vazio</p>
            <p className="text-gray-400 mt-2">
              Adicione alguns produtos para começar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
