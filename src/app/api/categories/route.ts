import { db } from '@/services/firebaseConnection';
import { CategoriesProps } from '@/utils/types/Product';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
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

    return NextResponse.json(listCategories);
    } catch (error) {
        console.log("Erro ao buscar categorias", error)
        return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 })
    }
}