import Image from "next/image"
import Link from "next/link"
import styles from './header.module.css'
import { bebasNeue } from "@/app/fonts"

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link
                    href='/'
                >
                    <Image
                        className={styles.logoImg}
                        src="/assets/logo-v1.png"
                        alt="Logo da Croc show"
                        width={140}
                        height={140}
                    />
                </Link>
                <div className={styles.headerTitle}>
                    <h1 className={bebasNeue.className}>Lanches</h1>
                    <strong className={bebasNeue.className}>Delivery para toda curitiba</strong>
                    <span className={styles.openingHours}>Seg á Dom - 18:00 as 01:30</span>
                </div>
            </div>
        </header>
    )
}