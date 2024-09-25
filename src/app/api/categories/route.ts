import { db } from '@/services/firebaseConnection';
import { CategoriesProps } from '@/utils/types/Product';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categoriesCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoriesCollection);
        const categories = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }));

    return NextResponse.json(categories);
    } catch (error) {
        console.log("Erro ao buscar categorias", error)
        return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 })
    }
}