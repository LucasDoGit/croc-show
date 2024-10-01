"use client"
import { useContext, useState } from 'react';
import styles from './product.module.css'
import Image from 'next/image'
import ImageEmpty from '@/../public/assets/produto-sem-foto-600px.jpg'
import { FaCartShopping } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

import { CartContext } from '@/context/cartContext';
import { priceToBrl } from '@/utils/functions/product';
import { ProductProps } from '@/utils/types/Product';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage'
import { db, storage } from '@/services/firebaseConnection';
import { ref } from 'firebase/storage';

interface ProductCartProps {
    product: ProductProps
}

export function ProductCard({ product }: ProductCartProps) {
    const [showModal, setShowModal] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { signed } = useContext(AuthContext);
    const router = useRouter()

    function handleAddCartItem(product: ProductProps) {
        addToCart(product)
        toast.success("Produto adicionado no carrinho")
    }

    function handleEdit(id: string) {
        router.push(`/product/${id}`);
    }

    async function handleDelete(product: ProductProps) {
        const toastInf = toast.loading('Excluíndo produto...');

        try {
            const docRef = doc(db, "products", product.id);
            const imageRef = ref(storage, product.image)

            await deleteDoc(docRef);

            await deleteObject(imageRef);

            toast.success('Produto excluído com sucesso!', {
                id: toastInf
            })

            setShowModal(false)
        } catch (error) {
            toast.error("Erro ao excluir produto", { 
                id: toastInf 
            })
            console.log('error: ', error)
            throw new Error("Erro ao excluir o produto")
        }
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.contentContainer}>

                <div className={styles.imageContainer}>
                    <Image
                        src={product.image || ImageEmpty}
                        alt={product.name}
                        priority={true}
                        quality={100}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw'
                        fill={true}
                    />
                </div>

                <div className={styles.productInfo}>

                    <strong className={styles.name}>{product.name}</strong>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.valueContainer}>
                        {signed ? (
                            <>
                                <strong className={styles.value}>
                                    {product.price.toLocaleString("pt-BR", {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </strong>
                                <div className={styles.containerButtons}>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        <MdModeEdit size={24} color='#20170E' />
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => {
                                            setShowModal(true)
                                        }}
                                    >
                                        <MdDelete size={24} color='#20170E' />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <strong className={styles.value}>
                                    {priceToBrl(product.price)}
                                </strong>
                                <button
                                    className={styles.button}
                                    onClick={() => handleAddCartItem(product)}
                                >
                                    <FaCartShopping size={24} color='#20170E' />
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <div
                    className={styles.containerModal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.textModal}>
                        <h2>EXCLUIR</h2>
                        <p>Tem certeza que deseja excluir o Produto?</p>
                    </div>
                    <div className={styles.buttonsModal}>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                        <button onClick={() => handleDelete(product)}>Excluir</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}