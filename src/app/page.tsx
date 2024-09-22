import styles from './page.module.css'

import { Container } from "@/components/Container";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";

import { ProductProps } from "@/utils/types/Product";

const pasteis: ProductProps[] = [
  {
    "id": 1,
    "name": "Pastel de Carne",
    "price": 5.00,
    "description": "Suculenta carne moída temperada com especiarias, envolta em uma massa crocante e dourada. Uma explosão de sabor a cada mordida!",
    "image": "https://www.sabornamesa.com.br/media/k2/items/cache/271fec0ea09281bfe067f8ddbe3d041e_XL.jpg"
  },
  {
    "id": 2,
    "name": "Pastel de Queijo",
    "price": 4.50,
    "description": "Queijo derretido e cremoso, envolto em uma massa crocante. Perfeito para os amantes de queijo!",
    "image": "https://www.sabornamesa.com.br/media/k2/items/cache/271fec0ea09281bfe067f8ddbe3d041e_XL.jpg"
  },
  {
    "id": 3,
    "name": "Pastel de Frango",
    "price": 5.50,
    "description": "Frango desfiado e temperado, combinado com um toque de requeijão, tudo dentro de uma massa crocante. Uma delícia irresistível!",
    "image": "https://www.sabornamesa.com.br/media/k2/items/cache/271fec0ea09281bfe067f8ddbe3d041e_XL.jpg"
  },
  {
    "id": 4,
    "name": "Pastel de Palmito",
    "price": 6.00,
    "description": "Palmito fresco e macio, temperado com ervas finas, envolto em uma massa crocante. Um pastel leve e saboroso!",
    "image": "https://www.sabornamesa.com.br/media/k2/items/cache/271fec0ea09281bfe067f8ddbe3d041e_XL.jpg"
  }
];

export default function Home() {
  return (
    <div>
      <Container>
        <Header />
        <Navbar />

        <h2 className={styles.menuTitle}>Pasteis</h2>

        <section className={styles.menuGrid}>
          {pasteis.map((item) => (
            <ProductCard data={item} key={item.id}/>
          ))}
        </section>

        <h2 className={styles.menuTitle}>Drinks</h2>

        <section className={styles.menuGrid}>
          {pasteis.map((item) => (
            <ProductCard data={item} key={item.id}/>
          ))}
        </section>

        <hr className={styles.line}/>
        <Footer />
      </Container>
      <Cart />
    </div>
  );
}
