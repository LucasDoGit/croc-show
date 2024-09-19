"use client";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./cart.module.css";
import { useState } from "react";
import { CheckoutModal } from "./components/CheckoutModal";

export function Cart() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={styles.cartContainer}>
                <button
                    className={styles.openCart}
                    onClick={() => setShowModal(!showModal)}
                >
                    <p>( 1 ) Veja seu carrinho</p>
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
