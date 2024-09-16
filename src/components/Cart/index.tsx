"use client";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./cart.module.css";
import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/Input";
import { Item } from "./components/item";

export function Cart() {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(2);

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
                            <div className={styles.formContainer}>
                                <div className={styles.inputContainer}>
                                    <label>Digite seu CEP:</label>
                                    <Input type="text" placeholder="Digite o seu cep" />
                                </div>
                                <div className={styles.groupInput}>
                                    <div className={styles.inputContainer}>
                                        <label>Rua/Logradouro</label>
                                        <Input type="text" placeholder="Rua..." />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label>Número</label>
                                        <Input type="text" placeholder="Número..." />
                                    </div>
                                </div>
                                <div className={styles.groupInput}>
                                    <div className={styles.inputContainer}>
                                        <label>Cidade</label>
                                        <Input type="text" placeholder="Cidade..." />
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <label>Bairro</label>
                                        <Input type="text" placeholder="Bairro..." />
                                    </div>
                                </div>
                                <div className={styles.inputContainer}>
                                    <label>Complementos</label>
                                    <Input type="text" placeholder="Complemento" />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label>Observações</label>
                                    <textarea placeholder="Observações" />
                                </div>
                            </div>
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
