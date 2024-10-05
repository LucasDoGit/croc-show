import styles from './page.module.css'
import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { ProductList } from '@/components/ProductList';
import { ProductProps, CategoriesProps } from "@/utils/types/Product";

export interface DataProps {
  category: string;
  products: ProductProps[];
}

async function getData() {
  try {
    // if (typeof window === 'undefined') {
    //   console.log("Skipping fetch during build time.");
    //   return [];
    // }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const productsData = await fetch(`${baseUrl}/api/products`, {next: {revalidate: 60}});
      
    return productsData.json()
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products data");
  }
};

async function getCategories(){
  try {
    // if (typeof window === 'undefined') {
    //   console.log("Skipping fetch during build time.");
    //   return [];
    // }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const categories = await fetch(`${baseUrl}/api/categories`, {next: { revalidate: 320 }});
      
    return categories.json()
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data categories");
  }
}

export default async function Home() {
  const data: DataProps[] = await getData();
  const categories: CategoriesProps[] = await getCategories();

  return (
    <div>
      <Container>
        <Header />
        <Navbar data={categories} />

        {!data ? (
          <div>
            <h2>Ops, nenhum produto encontrado!</h2>
          </div>
        ) : (
          <div>
            {data.map((productList) => (
              <ProductList key={productList.category} category={productList.category} products={productList.products}/>
            ))}  
          </div>
        )}

        <hr className={styles.line}/>
        <Footer />
      </Container>
      <Cart />
    </div>
  );
}

