import styles from './page.module.css'
import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { ProductList } from '@/components/ProductList';
import { ProductProps, CategoriesProps } from "@/utils/types/Product";
import { db } from '@/services/firebaseConnection';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { convertDateFirebase } from '@/utils/functions/product';

interface DataProps {
  category: string;
  products: ProductProps[];
}

async function getProductsFromFirebase() {
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
    console.log(error);
    throw new Error("Failed to fetch products data");
  }
};

async function getCategoriesFromFirebase(){
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    let listCategories: CategoriesProps[] = [];

    snapshot.forEach(doc => {
        listCategories.push({
            id: doc.id,
            name: doc.data().name,
            created: convertDateFirebase(doc.data().created),
        })
    })

    return listCategories
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
}

export default async function Home() {
  const products: ProductProps[] = await getProductsFromFirebase();
  const categories: CategoriesProps[] = await getCategoriesFromFirebase();

  if(categories.length === 0){
    return(
      <div>
        <h1>Ainda não possuímos produtos cadastrados, entre novamente mais tarde!</h1>
      </div>
    )
  }

  const data: DataProps[] = categories.map((category) => {
    return {
      category: category.name,
      products: products.filter((product) => product.categoryId === category.id),
      };
  });

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

