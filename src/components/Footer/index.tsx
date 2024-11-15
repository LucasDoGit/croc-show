import styles from "./footer.module.css";
import Image from "next/image";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <Image
                    className={styles.logoImg}
                    src="/assets/logo-v2.png"
                    width={120}
                    height={43}
                    priority={true}
                    quality={100}
                    alt="Logo da Croc Show"
                />
                <div className={styles.social}>
                    <a
                        href="https://www.facebook.com/people/Croc-Show/61565406185016/?locale=pt_BR"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebookSquare size={38} color="#FFB700" />
                    </a>
                    <a
                        href="https://www.instagram.com/croc_show/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaSquareInstagram size={38} color="#FFB700" />
                    </a>
                    <a
                        href="https://api.whatsapp.com/send/?phone=41998473283&text&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaWhatsappSquare size={38} color="#FFB700" />
                    </a>
                </div>
                <div className={styles.contato}>
                    <p>CNJP: 57.576.695/0001-71</p>
                </div>
            </div>
            <div className={styles.developer}>
                <p>
                    Desenvolvido por{" "}
                    <a
                        href="https://github.com/LucasDoGit"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Lucas Timoteo
                    </a>
                </p>
            </div>
        </footer>
    );
}
