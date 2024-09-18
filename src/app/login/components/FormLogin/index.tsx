"use client"
import { useState } from 'react';
import styles from './formlogin.module.css'
import { Input } from '@/components/Input'

export function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className={styles.formLogin}>
            <h1>Minha Conta</h1>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
            />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
            />

            <button type="submit">Acessar</button>
        </form>
    )
}