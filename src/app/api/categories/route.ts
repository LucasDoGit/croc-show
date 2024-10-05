import { db } from '@/services/firebaseConnection';
import { fetchCategories } from '@/utils/functions/firebaseFunctions';
import { CategoriesProps } from '@/utils/types/Product';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories: CategoriesProps[] = await fetchCategories();
    
        return NextResponse.json(categories);
    } catch (error) {
        console.log("Erro ao buscar categorias", error);
        return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 });
    }
}