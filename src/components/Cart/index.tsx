"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import styles from "./cart.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi"

import { CheckoutModal } from "./components/CheckoutModal";
import { CartContext } from "@/context/cartContext";
import { AuthContext } from "@/context/AuthContext"

export function Cart() {

    const { signed } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const { cartQuantity } = useContext(CartContext);

    if (signed) {
        return (
            <div className={styles.cartContainer}>
                <div className={styles.admin_container}>
                    <strong className={styles.admin_title}>ADMINISTRADOR</strong>
                    <Link href="/login">
                        <div className={styles.btn_logout}>
                            <p>SAIR</p>
                            <FiLogIn size={24} color='#fff' />
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.cartContainer}>
                <button
                    className={styles.openCart}
                    onClick={() => setShowModal(!showModal)}
                >
                    <p>( {cartQuantity} ) Veja seu carrinho</p>
                    <FaShoppingCart size={24} color="#fff" />
                </button>
            </div>
            {showModal && (
                <div className={styles.modalContainer}>
                    <CheckoutModal onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    );
}
