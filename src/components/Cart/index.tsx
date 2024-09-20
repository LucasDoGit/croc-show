"use client";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./cart.module.css";
import { useContext, useState } from "react";
import { CheckoutModal } from "./components/CheckoutModal";
import { CartContext } from "@/context/cartContext";

export function Cart() {
    const [showModal, setShowModal] = useState(false);
    const { cart } = useContext(CartContext)

    return (
        <>
            <div className={styles.cartContainer}>
                <button
                    className={styles.openCart}
                    onClick={() => setShowModal(!showModal)}
                >
                    <p>( {cart.length} ) Veja seu carrinho</p>
                    <FaShoppingCart size={24} color="#fff" />
                </button>
            </div>
            {showModal && (
                <div className={styles.modalContainer}>
                    <CheckoutModal onClose={() => setShowModal(false)}/>
                </div>
            )}
        </>
    );
}
