import { fetchCategories } from "@/utils/functions/firebaseFunctions";
import { CategoriesProps } from "@/utils/types/Product";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const categories = await fetchCategories();

        const data: CategoriesProps[] = categories

        return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=320, stale-while-revalidate' } });
    } catch (error) {
        console.log("Erro ao buscar produtos", error)
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
    }
};