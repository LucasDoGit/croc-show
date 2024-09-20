"use client"
import styles from './formlogin.module.css';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConnection';

const loginUserSchema = z.object({
    email: z.string().email("Insira um email válido").min(1, "O campo e-mail é obrigatório"),
    password: z.string().min(1, "O campo senha é obrigatório")
})

type LoginUserSchema = z.infer<typeof loginUserSchema>

export function FormLogin() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginUserSchema>({
        resolver: zodResolver(loginUserSchema),
        mode: "onChange"
    })

    async function onSubmit(data: LoginUserSchema) {
        
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                toast.loading("Logado com sucesso, redirecionado...", {duration: 4000})
                router.push("/")
            })
            .catch((error) => {
                console.log("Erro ao fazer login", error);
                toast.error("Erro ao fazer login");
            })
    }

    return (
        <form 
            className={styles.formLogin}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>Minha Conta</h1>
            <Input
                type="email"
                placeholder="Digite o seu e-mail"
                name="email"
                error={errors.email?.message}
                register={register}
            />
            <Input
                type="password"
                placeholder="Digite sua senha"
                name="password"
                error={errors.password?.message}
                register={register}
            />

            <button type="submit">Acessar</button>
        </form>
    )
}