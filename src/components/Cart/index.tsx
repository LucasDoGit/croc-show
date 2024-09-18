"use client";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./cart.module.css";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FormMultStep } from "./components/FormMultStep";

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
                    <div className={styles.container}>
                        <button
                                    className={styles.closeModal}
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    <IoClose size={28} color="#000" />
                        </button>
                        <FormMultStep />
                    </div>
                </div>
            )}
        </>
    );
}
