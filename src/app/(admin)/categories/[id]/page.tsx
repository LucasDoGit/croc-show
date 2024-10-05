import styles from './category.module.css'
import Link from "next/link";
import { Container } from "@/components/Container";
import { Header } from "@/components/Headerr";
import { CategoryForm } from './components/CategoryForm';
import { CategoriesProps } from "@/utils/types/Product";
import { FaLessThan } from "react-icons/fa";

import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { convertDateFirebase } from '@/utils/functions/product';

interface categorieDetailProps {
    params: {
        id: string;
    }
}

async function getCategorie(id: string){
    try {
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const category: CategoriesProps = {
                id: id,
                name: docSnap.data().name,
                created: convertDateFirebase(docSnap.data().created)
            }

            return category;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Erro ao buscar categorias", error)
        throw new Error("Erro ao buscar categoria")
    }
}

export default async function Categories({ params }: categorieDetailProps){
    const category: CategoriesProps | null = await getCategorie(params.id);

    if(!category) {
        return(
            <Container>
            <Header/>
            <div className={styles.title}>
                <Link href={"/"}>
                    <FaLessThan size={24} color='#fff'/>
                </Link>
                <h2>Editar categoria: </h2>
            </div>
            <h2>Categoria não encontrada!</h2>
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
                <h2>Editar categoria: {category?.name}</h2>
            </div>
            <CategoryForm category={category} />
        </Container>
    )
}