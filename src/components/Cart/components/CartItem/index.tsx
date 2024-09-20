"use client"
import { CartProps } from '@/utils/types/product';
import styles from './item.module.css'
import { MdAddBox } from "react-icons/md";
import { TbSquareMinusFilled } from "react-icons/tb";

import { CartContext } from '@/context/cartContext';
import { useContext } from 'react';

interface CartItemProps {
    data: CartProps
}

export function CartItem({data}: CartItemProps){
    const { addToCart, removeFromCart } = useContext(CartContext);

    return(
        <div className={styles.item}>
            <div className={styles.itemInfo}>
                <p className={styles.itemName}>{data.name}</p>
                <p>Quantidade: {data.quantity}</p>
                <p className={styles.itemValue}>
                    {data.price.toLocaleString("pt-BR", {
                        style: 'currency',
                        currency: "BRL"
                    })}
                    <strong> (un)</strong>
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button
                    onClick={() => addToCart(data)}
                >
                    <MdAddBox size={34} color="#54CC0A" />
                </button>
                <button
                    onClick={() => removeFromCart(data)}
                >
                    <TbSquareMinusFilled size={34} color="#f34e26" />
                </button>
            </div>
        </div>
    )
}