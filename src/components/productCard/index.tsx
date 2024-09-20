"use client"
import Image from 'next/image'
import styles from './product.module.css'
import { ProductProps } from '@/utils/types/product';
import { FaCartShopping } from "react-icons/fa6";
import { bebasNeue, robotoSlab } from '@/app/fonts';
import { CartContext } from '@/context/cartContext';
import { useContext } from 'react';
import { priceToBrl } from '@/utils/functions/product';

interface ProductCartProps {
    data: ProductProps
}

export function ProductCard({data}: ProductCartProps) {
    const { addToCart } = useContext(CartContext)

    function handleAddCartItem(product: ProductProps) {
        addToCart(product)
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.contentContainer}>

                <Image
                    className={styles.productImg}
                    src={data.image}
                    alt={data.name}
                    width={168}
                    height={147}
                    quality={100}
                    priority={true}
                />

                <div className={styles.productInfo}>
                    
                    <strong className={`${bebasNeue.className} ${styles.name}`}>{data.name}</strong>
                    <p className={`${robotoSlab.className} ${styles.description}`}>{data.description}</p>
                    
                    <div className={styles.valueContainer}>
                        <strong className={styles.value}>
                            {priceToBrl(data.price)}
                        </strong>
                        <button 
                            className={styles.button}
                            onClick={() => handleAddCartItem(data)}
                        >
                            <FaCartShopping size={24} color='#20170E' />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}