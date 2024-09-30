import { db } from "@/services/firebaseConnection";
import { CategoriesProps, ProductProps } from "@/utils/types/Product";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextResponse } from "next/server";


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
}

export async function GET(){
    try {
        const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

        const groupedProducts = categories.map((category) => {
            return {
            category: category.name,
            products: products.filter((product) => product.categoryId === category.id),
            };
        });

        return NextResponse.json(groupedProducts)
    } catch (error) {
        console.log("Erro ao buscar produtos", error)
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
    }
};