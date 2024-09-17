"use client"
import { ReactNode, createContext, useState } from 'react'
import { Address } from '@/utils/types/address';
import { CartItem } from '@/utils/types/product';

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextData {
    cart: CartItem[];
    cartQuantity: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
    total: string;
    address: Address;
    addAddress: (address: Address) => void;
}

const initialAddress: Address = {
    logradouro: '',
    bairro: '',
    localidade: '',
    numero: '',
    complemento: '',
};

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [address, setAddress] = useState<Address>(initialAddress)
    const [total, setTotal] = useState("")

    function addToCart(item: CartItem) {
        const indexItem = cart.findIndex(item => item.id === item.id)

        if(indexItem !== -1){
            let cartList = cart;

            cartList[indexItem].quantity += 1;
            cartList[indexItem].total = cartList[indexItem].quantity * cartList[indexItem].price;
            
            setCart(cartList)
            totalResultCart(cartList)
            return
        }

        const newItem = {
            ...item,
            amount: 1,
            total: item.price
        }

        setCart(products => [...products, newItem])
        totalResultCart([...cart, newItem])
    };

    function removeFromCart(item: CartItem) {
        const indexItem = cart.findIndex(removeItem => removeItem.id === item.id)

        if(cart[indexItem]?.quantity > 1){
            let cartList = cart;

            cartList[indexItem].quantity = cartList[indexItem].quantity -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList)
            totalResultCart(cartList)
            return
        }

        const removeItem = cart.filter(removeItem => removeItem.id !== item.id)
        setCart(removeItem);
        totalResultCart(removeItem)
    };

    function totalResultCart(items: CartItem[]){
        let myCart = items;
        let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0);

        const resultFormated = result.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        setTotal(resultFormated)
    }

    function clearCart() {
        setCart([]);
        totalResultCart([])
    };

    function addAddress(address: Address){
        setAddress(address)
    }

    return(
        <CartContext.Provider
            value={{
                address,
                cart,
                cartQuantity: cart.length,
                total,
                addToCart,
                removeFromCart,
                clearCart,
                addAddress
            }}
        >
            {children}
        </CartContext.Provider>
    )   
}

export default CartProvider;

