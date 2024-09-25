"use client"
import { useContext } from 'react';
import styles from './product.module.css'
import Image from 'next/image'
import { FaCartShopping } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

import { CartContext } from '@/context/cartContext';
import { priceToBrl } from '@/utils/functions/product';
import { ProductProps } from '@/utils/types/Product';
import { AuthContext } from '@/context/AuthContext';

interface ProductCartProps {
    product: ProductProps
}

export function ProductCard({ product }: ProductCartProps) {
    const { addToCart } = useContext(CartContext);
    const { signed } = useContext(AuthContext);

    function handleAddCartItem(product: ProductProps) {
        addToCart(product)
        toast.success("Produto adicionado no carrinho")
    }

    function handleEdit() {
        toast.success("Produto editado com sucesso!");
    }

    function handleDelete() {
        toast.success("Produto excluído com sucesso!");
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.contentContainer}>

                <Image
                    className={styles.productImg}
                    src={product.image}
                    alt={product.name}
                    width={168}
                    height={147}
                    quality={100}
                    priority={true}
                />

                <div className={styles.productInfo}>

                    <strong className={styles.name}>{product.name}</strong>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.valueContainer}>
                        {signed ? (
                            <>
                                <strong className={styles.value}>
                                    {priceToBrl(product.price)}
                                </strong>
                                <div className={styles.containerButtons}>
                                    <button
                                        className={styles.button}
                                        onClick={handleEdit}
                                    >
                                        <MdModeEdit size={24} color='#20170E' />
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={handleDelete}
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
        </div>
    )
}