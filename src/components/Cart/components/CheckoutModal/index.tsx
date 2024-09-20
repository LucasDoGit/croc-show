"use client"
import styles from './checkoutmodal.module.css'
import { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { CartItem } from '../CartItem';
import { Input } from '@/components/Input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataProps } from '@/utils/types/address';

import { CartContext } from '@/context/cartContext';
import { priceToBrl } from '@/utils/functions/product';

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
    const [address, setAddress] = useState("")
    const { total, cart, clearCart } = useContext(CartContext)

    const { register, handleSubmit, setValue, getValues, formState: { errors }, } = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        mode: "onChange"
    })

    function onSubmit(data: AddressSchema) {
        setAddress(
            `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.localidade}`
        )
        setStep(2)
    }

    async function handleCepCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const cep = e.target.value;

        if (cep.length === 8) {
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

        const cartItems = cart.map((item) => {
            return(
                `${item.name}, Quantidade: ${item.quantity} (${priceToBrl(item.total)})`
            )
        }).join(" ")
        
        const message = encodeURIComponent(cartItems)
        const phone = "41996546683"

        window.open(`https://wa.me/${phone}?text=Novo pedido: ${message} Endereco: ${address} Observações: ${getValues('observacoes')}`, "_black")
        
        setStep(0)
        clearCart()
        onClose()
    }

    if (cart.length === 0) {
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
                <div className={styles.cartEmpty}>
                    <strong>Ops! seu carrinho está vázio</strong>
                    <p>Adicione deliciosos pasteis ao seu carrinho! 😊</p>
                </div>
            </div>
        )
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
                    
                    {
                        cart.map((item) => (
                            <CartItem data={item} />
                        ))
                    }

                    <div className={styles.valueTotal}>
                        <p>Total: <strong>{total}</strong></p>
                    </div>
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
                <div className={styles.orderContainer}>
                    <h2>Confirme o seu pedido:</h2>
                    <hr />
                    {cart.map((item) => (
                        <div 
                            className={styles.orderItem}
                            key={item.id}
                        >
                            <p>{`x${item.quantity} ${item.name} (${priceToBrl(item.price)}) - ${priceToBrl(item.total)}`}</p>
                        </div>
                    ))}
                    <hr />
                    <div className={styles.orderInfo}>
                        <p><strong>Endereço de entrega: </strong>{address}</p>
                        <p><strong>Observações: </strong>{getValues('observacoes')}</p>
                    </div>
                    <div className={styles.valueTotal}>
                        <p>Total: <strong>{total}</strong></p>
                    </div>
                    <div className={styles.containerButtons}>
                        <button
                            onClick={() => setStep(1)}
                            className={styles.buttonPrev}
                        >
                            Voltar
                        </button>
                        <button
                            onClick={checkoutOrder}
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