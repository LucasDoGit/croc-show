import Link from 'next/link'
import styles from './navbar.module.css'

export function Navbar(){
    return(
        <nav className={styles.navbar}>
            <li>
                <Link href="/">PASTEIS</Link>
            </li>
            <li>
                <Link href="/">COXINHAS</Link>
            </li>
            {/* <li>
                <Link href="/">BEBIDAS</Link>
            </li> */}
        </nav>
    )
}