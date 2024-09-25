"use client"
import styles from './productList.module.css'
import { ProductCard } from './components/productCard'
import { ProductProps } from '@/utils/types/Product'
import { IoAddCircle } from 'react-icons/io5'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import Link from 'next/link'

interface ProductListProps {
    products: ProductProps[]
}

export function ProductList({ products }: ProductListProps){
    const { signed } = useContext(AuthContext);

    return(
        <section className={styles.menuGrid}>
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
            {signed && (
                <Link href="/product/new" className={styles.linkAddItem}>
                    <IoAddCircle size={32} color="#FFB700"/>
                </Link>
            )}
        </section>
    )
}