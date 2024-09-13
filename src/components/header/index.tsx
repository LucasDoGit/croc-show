import Image from "next/image"
import logoImg from '../../../public/logo-v1.png'
import styles from './header.module.css'
import { bebasNeue } from "@/app/fonts"

export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Image 
                    className={styles.logoImg}
                    src={logoImg}
                    alt="Logo da Croc show"
                    width={140}
                    height={140}
                />
                <div className={styles.headerTitle}>
                    <h1 className={bebasNeue.className}>Lanches</h1>
                    <strong className={bebasNeue.className}>Delivery para toda curitiba</strong>
                    <span className={styles.openingHours}>Seg á Dom - 18:00 as 01:30</span>
                </div>
            </div>
        </header>
    )
}