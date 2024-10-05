import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { CategoriesProps, ProductProps } from "../types/Product";
import { db } from "@/services/firebaseConnection";

export async function fetchProducts(): Promise<ProductProps[]> {
    try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, orderBy('name', 'asc'))
        const snapshot = await getDocs(q)
        let listProduct: ProductProps[] = [];

        snapshot.forEach(doc => {
            listProduct.push({
                id: doc.id,
                name: doc.data().name,
                description:  doc.data().description,
                categoryId:  doc.data().categoryId,
                price:  parseFloat(doc.data().price),
                image:  doc.data().imageUrl,
            })
        })

        return listProduct;
    } catch (error) {
        console.log('Erro ao buscar produtos', error)
        return []
    }
}

export async function fetchCategories(): Promise<CategoriesProps[]> {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, orderBy('name', 'asc'))
        const snapshot = await getDocs(q)
        let listCategories: CategoriesProps[] = [];

        snapshot.forEach(doc => {
            listCategories.push({
                id: doc.id,
                name: doc.data().name,
                created: doc.data().created,
            })
        })

        return listCategories
    } catch (error) {
        console.log('Erro ao buscar categorias', error)
        return []
    }
}