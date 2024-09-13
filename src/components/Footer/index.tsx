import styles from './footer.module.css'
import logoImg from '../../../public/logo-v2.png'
import Image from 'next/image'
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";


export function Footer(){
    return(
        <footer className={styles.footer}>
            <hr className={styles.line}/>
            <div className={styles.footerContainer}>
                <Image
                    className={styles.logoImg}
                    src={logoImg}
                    width={120}
                    height={43}
                    priority={true}
                    quality={100}
                    alt="Logo da Croc Show"
                />
                <div className={styles.social}>
                    <FaFacebookSquare size={38} color='#FFB700'/>
                    <FaSquareInstagram size={38} color='#FFB700'/>
                    <FaLinkedin size={38} color='#FFB700'/>
                </div>
                <div className={styles.contato}>
                    <p>CNJP: 73.687.477/0001-60</p>
                </div>
            </div>
            <div className={styles.developer}>
                <p>Desenvolvido por Lucas Timoteo</p>
            </div>
        </footer>
    )
}