import { CircleCheckBig, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { CartItem } from "../type";
import { useStore } from "../store/store";
import { useState } from "react";


interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateCartItemQuantity: (productId: number, quantity: number) => void;
    onRemoveFromCart: (productId: number) => void;

}

export function CartModal({ isOpen, onClose, items, onUpdateCartItemQuantity, onRemoveFromCart}: CartModalProps) {

const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

const {clearCart, 
  
} = useStore()


const handleCheckout = () => {
  setIsCheckoutComplete(true);
  clearCart();
}

const handleClose = () =>{
  setIsCheckoutComplete(false)
  onClose()
}

 if(!isOpen) return null


 const totalFormatted = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(items.reduce((total, item) => total + item.price * item.quantity, 0));





  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-hidden">
        <div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Seu Carrinho
              </h2>
              <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={handleClose}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {isCheckoutComplete ? (
            <div className="text-center py-12">
              <CircleCheckBig className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <p className="text-gray-600 font-medium text-xl">Obrigado pela sua comprar!</p>
              <p className="text-gray-400 mt-2">Seu pedido foi processado com sucesso</p>
              <button 
              className="mt-6 px-6 py-3 bg-blue-600 text-white
              w-[300px] rounded-full hover:bg-blue-700 transition-colors"
              onClick={handleClose}>Fechar
              </button>
            </div>

          ) : items.length === 0 ?(
            <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 font-medium">Seu Carrinho está vazio</p>
            <p className="text-gray-400 mt-2">
              Adicione alguns produtos para começar
            </p>
          </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-6 pl-6">
                {items.map((item) => (
                <div key={item.id} className=" flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-white rounded-lg p-2" />
                 
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                    <p className="text-blue-600 font-bold mt-1">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => onUpdateCartItemQuantity(
                      item.id,
                      Math.max(0, item.quantity - 1)
                    )}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => onUpdateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                     <Plus className="h-4 w-4" />
                    </button>
                    <button
                    className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => onRemoveFromCart(item.id)}
                    >
                     <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  </div>
                ))}
                 <div className="mt-6 px-6 py-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold text-gray-600">Total:</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{totalFormatted}</span>
                </div>
                <button
                className="w-full bg-blue-600 text-white py-4
                rounded-lg hover:bg-blue-700 transition-colors button-primary"
                onClick={handleCheckout}
                >
                  Finalizar Comprar
                </button>
              </div>
              </div>
            </>
          )
          }
        </div>
      </div>
    </section>
  );
}
