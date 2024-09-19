"use client"
import styles from './checkoutmodal.module.css'
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { CartItem } from '../CartItem';
import { Input } from '@/components/Input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataProps } from '@/utils/types/address';

interface CheckoutModalProps {
    onClose: () => void;
}

const addressSchema = z.object({
    cep: z.string().min(1, "CEP é obrigatório"),
    logradouro: z.string().min(1, "Endereço é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),
    localidade: z.string().min(1, "Cidade é obrigatório"),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    complemento: z.string(),
    observacoes: z.string()
})

type AddressSchema = z.infer<typeof addressSchema>

export function CheckoutModal({ onClose }: CheckoutModalProps) {
    const [step, setStep] = useState(0);

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        mode: "onChange"
    })

    function onSubmit(data: AddressSchema) {
        console.log(data)
        setStep(2)
    }

    async function handleCepCodeChange(e: React.ChangeEvent<HTMLInputElement>){
        const cep = e.target.value

        if(cep.length === 8){
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                const data: DataProps = await res.json();
    
                if (data.erro) {
                    console.log(data.erro)
                } else {
                    setValue("logradouro", data.logradouro)
                    setValue("bairro", data.bairro)    
                    setValue("localidade", data.localidade)        
                }
            } catch (error) {
                console.log("failed to fetch data ", error)
            }
        }
    }

    function checkoutOrder() {
        const message = encodeURIComponent("")
        const phone = "41996546683"

        window.open(`https://wa.me/${phone}?text=Observações: ${message} Endereco: ${""}`, "_black")
    }

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h1>Meu carrinho</h1>
                <button
                    className={styles.btnCloseModal}
                    onClick={onClose}
                >
                    <IoClose size={28} color="#000" />
                </button>
            </div>

            {step === 0 && (
                <div className={styles.listProducts}>
                    <CartItem />
                    <div className={styles.btnListProducts}>
                        <button
                            className={styles.buttonNext}
                            onClick={() => setStep(1)}
                        >
                            Avançar
                        </button>
                    </div>
                </div>
            )}

            {step === 1 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formContainer}>
                        <div className={styles.inputContainer}>
                            <label>Digite seu CEP:</label>
                            <Input
                                type='text'
                                placeholder='Digite seu CEP'
                                name='cep'
                                error={errors.cep?.message}
                                register={register}
                                onBlur={handleCepCodeChange}
                                maxLength={8}
                            />
                        </div>
                        <div className={styles.groupInput}>
                            <div className={styles.inputContainer}>
                                <label>Rua/Logradouro</label>
                                <Input
                                    type='text'
                                    placeholder='Digite a rua'
                                    name='logradouro'
                                    error={errors.logradouro?.message}
                                    register={register}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Número</label>
                                <Input
                                    type='text'
                                    placeholder='Digite o número'
                                    name='numero'
                                    error={errors.numero?.message}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className={styles.groupInput}>
                            <div className={styles.inputContainer}>
                                <label>Cidade</label>
                                <Input
                                    type='text'
                                    placeholder='Digite a cidade'
                                    name='localidade'
                                    error={errors.localidade?.message}
                                    register={register}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label>Bairro</label>
                                <Input
                                    type='text'
                                    placeholder='Digite o bairro'
                                    name='bairro'
                                    error={errors.bairro?.message}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Complementos</label>
                            <Input
                                type='text'
                                placeholder='Complementos'
                                name='complemento'
                                register={register}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Observações do Pedido</label>
                            <textarea
                                placeholder="Tirar cebola..."
                                {...register('observacoes')}
                            />
                        </div>
                    </div>
                    <div className={styles.containerButtons}>
                        <button
                            type='button'
                            onClick={() => setStep(0)}
                            className={styles.buttonPrev}
                        >
                            Voltar
                        </button>
                        <button
                            type='submit'
                            className={styles.buttonNext}
                        >
                            Avançar
                        </button>
                    </div>
                </form>
            )}


            {step === 2 && (
                <div className={styles.detailContainer}>
                    <h2>Confirme o seu pedido</h2>
                    <p>item 1</p>
                    <div>
                        <p><strong>Endereço de entrega: </strong></p>
                        <p><strong>Observações: </strong></p>
                    </div>
                    <div className={styles.containerButtons}>
                        <button
                            onClick={() => setStep(1)}
                            className={styles.buttonPrev}
                        >
                            Voltar
                        </button>
                        <button
                            onClick={() => setStep(0)}
                            className={styles.buttonNext}
                        >
                            Avançar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}