import { fetchCategories, fetchProducts } from "@/utils/functions/firebaseFunctions";
import { CategoriesProps, ProductProps } from "@/utils/types/Product";
import { NextResponse } from "next/server";

type GroupedProducts = {
    category: string;
    products: ProductProps[];
}[];

export async function GET(){
    try {
        const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

        const groupedProducts: GroupedProducts = categories.map((category: CategoriesProps) => {
            return {
            category: category.name,
            products: products.filter((product: ProductProps) => product.categoryId === category.id),
            };
        });

        return NextResponse.json(groupedProducts, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate' } });
    } catch (error) {
        console.log("Erro ao buscar produtos", error)
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
    }
};