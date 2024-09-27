import { db } from "@/services/firebaseConnection";
import { CategoriesProps, ProductProps } from "@/utils/types/Product";
import { collection, getDocs } from "firebase/firestore";

const fetchCategories = async (): Promise<CategoriesProps[]> => {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    return categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as CategoriesProps[];
};

// Função para buscar os produtos
const fetchProducts = async (): Promise<ProductProps[]> => {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    return productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as unknown as ProductProps[];
};

// Função principal para buscar produtos e categorias e agrupar
const fetchData = async () => {
    // Executa as consultas em paralelo para otimizar o tempo de resposta
    const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()]);

    // Agrupa os produtos por categoria
    const productsByCategory = categories.map(category => ({
        ...category,
        products: products.filter(product => product.categoryId === category.id),
    }));

    return productsByCategory;
};