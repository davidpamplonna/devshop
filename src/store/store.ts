import { create } from "zustand";
import { Product } from "../type";

// define a interface da aplicação
interface StoreState {
    products: Product[];
    loading: boolean;
    error: string | null;

// métados de manipulação dos estados
fetchProducts: () => Promise<void>;

}


// cria o estado global

export const useStore = create<StoreState>((set,get) => ({
    products: [],
    loading: true,
    error: null,



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



}));
