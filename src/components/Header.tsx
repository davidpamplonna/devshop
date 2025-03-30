import { Search, ShoppingCart, Store } from "lucide-react";

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onCartClick: () => void;
    cartItemsCount: number;
}


export function Header({ searchQuery, setSearchQuery, onCartClick, cartItemsCount }: HeaderProps) {
    return (
        <header className="sticky inset-0 top-0 z-50 bg-white/80 backdrop-blur shadow-md">
            <section className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* <Logo /> */}
                    <div className="flex space-x-2 ">
                        <Store className="text-blue-600 w-7 h-7" />
                        <h1 className=" text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">DevShop</h1>
                    </div>
                    {/* seção search */}
                    <div className="flex-1 relative mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 text-md"
                            type="text" 
                            placeholder="Buscar produtos..." />
                        </div>
                    </div>
                    {/* seção carrinho */}
                    <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors" onClick={onCartClick}>
                        <ShoppingCart className="w-6 h-6" />
                        {cartItemsCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-[5px] py-[2px] text-xs font-bold leading-none text-white bg-red-500 rounded-full animate-bounce">
                            {cartItemsCount}
                            </span>
                        )}
                    </button>
                </div>
            </section>
        </header>
    )   
}