"use client"
import styles from './productList.module.css'
import { ProductCard } from './components/productCard'
import { ProductProps } from '@/utils/types/Product'
import { IoAddCircle } from 'react-icons/io5'
import { AuthContext } from '@/context/AuthContext'
import { useContext, useEffect } from 'react'
import Link from 'next/link'

interface ProductListProps {
    category: string;
    products: ProductProps[]
}

export function ProductList({ products, category }: ProductListProps) {
    const { signed } = useContext(AuthContext);

    return (
        <>
            <h2 className={styles.menuTitle}>{category}</h2>
            <section className={styles.menuGrid} id={`${category}`}>
                {products.length === 0 ? (
                    <>
                        {signed ? (
                            <Link href="/product/new" className={styles.linkAddItem}>
                                <IoAddCircle size={32} color="#FFB700" />
                            </Link>
                        ) : (
                            <h2>Ops...não temos estes produtos</h2>
                        )}
                    </>
                ) : (
                    <>
                        {products.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                        {signed && (
                            <Link href="/product/new" className={styles.linkAddItem}>
                                <IoAddCircle size={32} color="#FFB700" />
                            </Link>
                        )}
                    </>
                )}
            </section>
        </>
    )
}