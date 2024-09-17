"use client"
import { FormEvent, useEffect, useState } from "react";
import styles from './formMultStep.module.css'
import { CartItem } from '@/components/Cart/components/CartItem'
import { Input } from "@/components/Input";
import { DataProps } from "@/utils/types/address"
import { CartItemProps } from "@/utils/types/product";
import { AddressProps } from "@/utils/types/address"

interface FormData {
    cartItem: CartItemProps[];
    address: AddressProps;
}

export function FormMultStep() {
    const [step, setStep] = useState(1);
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const [formData, setFormData] = useState<FormData>();

    async function fetchAddress() {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data: DataProps = await res.json();

            if (data.erro) {
                console.log("Endereço não encontrado")
            } else {
                setLogradouro(data.logradouro || '');
                setBairro(data.bairro || '')
                setLocalidade(data.localidade || '')
            }
        } catch (error) {
            console.log("failed to fetch data ", error)
        }
    }

    useEffect(() => {
        if (cep.length === 8) {
            fetchAddress()
        }
    }, [cep])

    function handleOrder(event: FormEvent) {
        event.preventDefault();

        console.log(step)

        switch (step) {
            case 1:
                handleNext()
                break;
            case 2:
                handleNext();
                break;
            case 3: 
                alert("finalizado");
            default:
                setStep(1)
                break;
        }
    }

    function handleNext() {
        if (step === 3) return;
        setStep((prevStep) => prevStep + 1);
    };

    function handlePrev() {
        if (step === 1) return;
        setStep((prevStep) => prevStep - 1);
    };


    return (
        <form>
            <h1>Meu Carrinho</h1>

            {step === 1 && (
                <div className={styles.cartItens}>
                    <CartItem />
                </div>
            )}

            {step === 2 && (
                <div className={styles.formContainer}>
                    <div className={styles.inputContainer}>
                        <label>Digite seu CEP:</label>
                        <Input type="text"
                            placeholder="Digite o seu cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            maxLength={8}
                            required
                        />
                    </div>
                    <div className={styles.groupInput}>
                        <div className={styles.inputContainer}>
                            <label>Rua/Logradouro</label>
                            <Input
                                type="text"
                                placeholder="Rua..."
                                value={logradouro}
                                onChange={(e) => setLogradouro(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Número</label>
                            <Input
                                type="text"
                                placeholder="Número..."
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.groupInput}>
                        <div className={styles.inputContainer}>
                            <label>Cidade</label>
                            <Input
                                type="text"
                                placeholder="Cidade..."
                                value={localidade}
                                onChange={(e) => setLocalidade(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Bairro</label>
                            <Input
                                type="text"
                                placeholder="Bairro..."
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Complementos</label>
                        <Input
                            type="text"
                            placeholder="Complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Observações do Pedido</label>
                        <textarea
                            placeholder="Tirar cebola..."
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <p className={styles.cartValue}>
                Total: <strong>R$ 18,90</strong>
            </p>
            <div className={styles.cartButtons}>
                <button onClick={handlePrev} disabled={step === 1}>
                    Voltar
                </button>
                <button type="submit" onClick={handleOrder}>
                    {step === 3 ? "Finalizar" : "Avançar"}
                </button>
            </div>
        </form>
    )
}