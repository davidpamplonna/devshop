import { create } from "zustand";
import { Product } from "../type";

// define a interface da aplicação
interface StoreState {
    products: Product[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    selectProduct: Product | null;
    isOpenCart: boolean

// métados de manipulação dos estados
fetchProducts: () => Promise<void>;
setSearchQuery: (query: string) => void;
setSelectProduct: (product: Product | null) => void
setIsCartOpen: (isOpen: boolean) => void
}


// cria o estado global

export const useStore = create<StoreState>((set,get) => ({
    products: [],
    loading: true,
    error: null,
    searchQuery: ' ',
    selectProduct: null,
    isOpenCart: false,


    fetchProducts: async () => {
       try{
        const response = await fetch('https://fakestoreapi.com/products');
        if(!response.ok) throw new Error('Erro ao carregar os produtos');
        const data = await response.json();
        set({products: data, loading: false, error: null})
       } catch (err){
        set({
            error: err instanceof Error ? err.message : 'Erro ao carregar os produtos',
            loading: false
        })
       }
    },

    setSearchQuery: (query) => set({searchQuery: query}),
    setSelectProduct: (product) => set({selectProduct: product}),
    setIsCartOpen: (isOpen) => set({isOpenCart: isOpen})


}));
