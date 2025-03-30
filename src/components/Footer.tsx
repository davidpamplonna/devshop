import {   Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { TbBrandFacebook } from "react-icons/tb";


export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-12">
           <div className="container mx-auto px-4 py-8 w-full max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                
                <div>
                    <h3 className="text-lg font-semibold mb-4">Sobre a DevShop</h3>
                    <p className="text-gray-400 text-sm">Sua loja online de confiança para encontrar os melhores produtos com os melhores preços</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contato</h3>
                    <div className="space-y-2">
                        <a 
                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                        href="mailto:deveshop@outlook.com">
                            <Mail className="w-5 h-5 mr-2"  aria-label="Email"/>
                            deveshop@outlook.com
                        </a>
                        <a 
                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                        href="tel:551199999999">
                         <Phone className="w-5 h-5 mr-2" aria-label="Telefone"/>
                         (11) 99999-9999
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com/" className="text-gray-400 hover:text-white transition-colors duration-500">
                         <TbBrandFacebook  className="w-5 h-5" aria-label="Facebook"/>

                        </a>
                        <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white transition-colors duration-500">
                            <FaInstagram className="w-5 h-5" aria-label="Instagram" />

                        </a>
                        <a href="https://x.com/" className="text-gray-400 hover:text-white transition-colors duration-500">
                        <RiTwitterXFill className="w-5 h-5" aria-label="Twitter" />
                        </a>
                    </div>
                </div>  

            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} DevShop. Todos os direitos reservados.</p>
                
            </div>
           </div>
        </footer>
    );
}