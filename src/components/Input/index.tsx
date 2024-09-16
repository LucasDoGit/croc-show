import styles from "./input.module.css"

interface InputProps{
    type: string;
    placeholder: string;
}

export function Input({ type, placeholder }: InputProps){
    return(
        <input
                className={styles.input}
                placeholder={placeholder}
                type={type}
        />
    )
}