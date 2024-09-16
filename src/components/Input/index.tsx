import styles from "./input.module.css"
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input
                className={styles.input}
                {...props}
        />
    )
}