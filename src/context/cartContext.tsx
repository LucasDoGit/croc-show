"use client"
import { ReactNode, createContext, useState } from 'react'
import { CartProps, ProductProps } from '@/utils/types/product';

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextData {
    cart: CartProps[];
    cartQuantity: number;
    addToCart: (newItem: ProductProps) => void;
    removeFromCart: (item: CartProps) => void;
    clearCart: () => void;
    total: string;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    function addToCart(newItem: ProductProps) {
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        if(indexItem !== -1){
            let cartList = cart;

            cartList[indexItem].quantity += 1;
            cartList[indexItem].total = cartList[indexItem].quantity * cartList[indexItem].price;
            
            setCart(cartList)
            totalResultCart(cartList)
            return
        }

        const data = {
            ...newItem,
            quantity: 1,
            total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])
    };

    function removeFromCart(item: CartProps) {
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

    function totalResultCart(items: CartProps[]){
        let myCart = items;
        let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0);

        const resultFormated = result.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        setTotal(resultFormated)
    }

    function clearCart() {
        setCart([]);
        totalResultCart([])
    };

    return(
        <CartContext.Provider
            value={{
                cart,
                cartQuantity: cart.length,
                total,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )   
}

export default CartProvider;

