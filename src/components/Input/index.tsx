import { InputHTMLAttributes } from "react";
import styles from "./input.module.css"
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ type, placeholder, name, register, rules, error, ...props}: InputProps){
    return(
        <div>
            <input
                className={styles.input}
                placeholder={placeholder}
                type={type}
                {...register(name, rules)}
                id={name}
                {...props}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}