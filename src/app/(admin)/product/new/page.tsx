import { Container } from '@/components/Container'
import styles from './newproduct.module.css'
import { FaLessThan } from 'react-icons/fa'
import { Header } from '@/components/Headerr'
import Link from 'next/link'
import { ProductForm } from '../components/productForm'

export default function newProduct(){
    return(
        <Container>
            <Header/>
            <div className={styles.title}>
                <Link href={"/"}>
                    <FaLessThan size={24} color='#fff'/>
                </Link>
                <h2>Cadastrar produto</h2>
            </div>
            <ProductForm />
        </Container>
    )
}