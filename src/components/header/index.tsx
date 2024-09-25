import Image from "next/image"
import Link from "next/link"
import styles from './header.module.css'

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
                        priority={true}
                        width={140}
                        height={140}
                    />
                </Link>
                <div className={styles.headerTitle}>
                    <h1>Lanches</h1>
                    <strong>Delivery para toda curitiba</strong>
                    <span className={styles.openingHours}>Seg á Dom - 18:00 as 01:30</span>
                </div>
            </div>
        </header>
    )
}