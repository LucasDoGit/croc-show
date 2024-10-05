import styles from './products.module.css'
import { Container } from "@/components/Container";
import { Header } from "@/components/Headerr";
import { db } from "@/services/firebaseConnection";
import { ProductProps } from "@/utils/types/Product";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { FaLessThan } from "react-icons/fa";
import { ProductForm } from '../components/productForm';

async function getProduct(id: string){
    try {
        const docRef = doc(db, "products", id);
        const snapshot = await getDoc(docRef);

        if(snapshot.exists()){
            const product: ProductProps = {
                id: id,
                name: snapshot.data().name,
                categoryId: snapshot.data().categoryId,
                description: snapshot.data().description,
                price: snapshot.data().price,
                image: snapshot.data().imageUrl
            }

            return product;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Erro ao buscar categorias", error)
        throw new Error("Erro ao buscar categoria")
    }
}

interface ProductDetailProps {
    params: {
        id: string;
    }
}

export default async function Product({ params }: ProductDetailProps){
    const product: ProductProps | null = await getProduct(params.id);

    if(!product) {
        return(
            <Container>
            <Header/>
            <div className={styles.title}>
                <Link href={"/"}>
                    <FaLessThan size={24} color='#fff'/>
                </Link>
                <h2>Editar produto: </h2>
            </div>
            <h2>Produto não encontrado!</h2>
        </Container> 
        )
    }
    
    return(
        <Container>
            <Header/>
            <div className={styles.title}>
                <Link href={"/"}>
                    <FaLessThan size={24} color='#fff'/>
                </Link>
                <h2>Editar produto</h2>
            </div>
            <ProductForm product={product} />
        </Container>
    )
}