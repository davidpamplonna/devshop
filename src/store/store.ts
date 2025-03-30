import { create } from "zustand";
import { Product,CartItem } from "../type";

// Interface do estado da store

interface StoreState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedProduct : Product | null;
  isCartOpen: boolean;
  cartItems: CartItem[];


  // métodos para manipular o estado
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
}


export const useStore = create<StoreState>((set) => ({

  // estado inicial da store
  products: [],
  loading: true,
  error: null,
  searchQuery: '',
  selectedProduct: null,
  isCartOpen: false,
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),


  fetchProducts: async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error ("Falha ao carregar produtos");
      const data = await response.json();
      set({products: data, loading: false});    
    } catch (err){
      set({
        error: err instanceof Error ? err.message: 'Error ao carregar produtos',
        loading: false,
      })
    }
  },

  //métados para manipular o estado
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedProduct: (product: Product | null) => set({ selectedProduct: product }),
  setIsCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),

  // função para adicionar um produto ao carrinho
  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cartItems.find((item) => item.id === product.id);
  // verifica se o produto já existe no carrinho, se existir, atualiza a quantidade, se não, adiciona o produto ao carrinho
      const updatedCart = existingProduct
        ? state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...product, quantity: 1 }];
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },
  
// função para atualizar a quantidade do item no carrinho
  updateCartItemQuantity: (productId, quantity) => {
    set((state) => {
      const updatedCart = quantity === 0
        ? state.cartItems.filter((item) => item.id !== productId)
        : state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },
  
    // função para remover um item do carrinho
  removeFromCart: (productId) => {
    set((state) => {
      const updatedCart = state.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cartItems');
    set({ cartItems: [] });
  }
  



}));