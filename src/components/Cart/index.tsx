"use client";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./cart.module.css";
import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Item } from "./components/item";
import { FormAdress } from "./components/FormAdress";

export function Cart() {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);

    function handleOrder(event: FormEvent) {
        event.preventDefault();

        if (step === 1) setStep(step + 1);

        if (step === 2) {
            alert("Finalizado");
        }
    }

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
                    <form className={styles.formCart}>
                        <div className={styles.headerModal}>
                            <h1>Meu Carrinho</h1>
                            <button
                                className={styles.closeModal}
                                onClick={() => setShowModal(!showModal)}
                            >
                                <IoClose size={28} color="#000" />
                            </button>
                        </div>

                        {step === 1 && (
                            <div className={styles.cartItens}>
                                <Item />
                            </div>
                        )}

                        {step === 2 && (
                            <FormAdress />
                        )}
                        
                        <p className={styles.cartValue}>
                            Total: <strong>R$ 18,90</strong>
                        </p>
                        <div className={styles.cartButtons}>
                            <button onClick={() => setStep(step - 1)} disabled={step === 1}>
                                Voltar
                            </button>
                            <button type="submit" onClick={handleOrder}>
                                {step === 1 ? "Avançar" : "Finalizar"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
