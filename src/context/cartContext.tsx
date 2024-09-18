"use client"
import { ReactNode, createContext, useState } from 'react'
import { CartItemProps } from '@/utils/types/product';

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextData {
    cart: CartItemProps[];
    cartQuantity: number;
    addToCart: (item: CartItemProps) => void;
    removeFromCart: (item: CartItemProps) => void;
    clearCart: () => void;
    total: string;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartItemProps[]>([])
    const [total, setTotal] = useState("")

    function addToCart(item: CartItemProps) {
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

    function removeFromCart(item: CartItemProps) {
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

    function totalResultCart(items: CartItemProps[]){
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

