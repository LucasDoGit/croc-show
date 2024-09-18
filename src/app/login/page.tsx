import Image from "next/image";
import imageLogin from '../../../public/homem-cozinhando.png'
import styles from './login.module.css'
import { Metadata } from "next";
import { FormLogin } from "./components/FormLogin";

export const metadata: Metadata = {
    title: "Croc Show - Login",
    description: "Cardáplio online, pedidos direto ao whatsapp",
};

export default function Login(){
    return(
        <div className={styles.container}>
            <section className={styles.left}>
                
                <FormLogin />
            </section>

            <section className={styles.right}>
                <Image 
                    className={styles.imageLogin}
                    src={imageLogin}
                    quality={100}
                    alt="Homem cozinhando"
                />
                <h2>Transforme a forma como você vende!</h2>
                <p>
                    Plataforma de cardáplio online que permite você cadastrar seus produtos de maneira fácil e rápida. Receba seus pedidos diretamente pelo Whatsapp, falicilitando a comunicação com seus clientes e agilizando o processo de vendas.
                </p>
            </section>
        </div>
    )
}