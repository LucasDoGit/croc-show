import { InputHTMLAttributes } from "react";
import styles from "./input.module.css"
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import PropTypes from 'prop-types'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
    stylesInput?: string;
    stylesError?: string;
}

export function Input({ type, placeholder, name, register, rules, stylesInput, stylesError, error, ...props}: InputProps){
    const inputClassName = `${styles.input} ${stylesInput || ''}`
    const errorClassName = `${styles.error} ${stylesError || ''}`

    return(
        <div className={styles.containerInput}>
            <input
                className={inputClassName}
                placeholder={placeholder}
                type={type}
                {...register(name, rules)}
                id={name}
                {...props}
            />
            {error && <p className={errorClassName}>{error}</p>}
        </div>
    )
}