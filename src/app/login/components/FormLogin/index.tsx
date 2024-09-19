"use client"
import styles from './formlogin.module.css'
import { Input } from '@/components/Input'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginUserSchema = z.object({
    email: z.string().email("Insira um email válido").min(1, "O campo e-mail é obrigatório"),
    password: z.string().min(1, "O campo senha é obrigatório")
})

type LoginUserSchema = z.infer<typeof loginUserSchema>

export function FormLogin() {

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginUserSchema>({
        resolver: zodResolver(loginUserSchema),
        mode: "onChange"
    })

    function onSubmit(data: LoginUserSchema) {
        console.log(data)
        
        // signInWithEmailAndPassword(auth, data.email, data.password)
        //     .then((user) => {
        //         console.log(user)
        //         toast.success("Logado com sucesso!")
        //         navigate("/", { replace: true })
        //     })
        //     .catch((error) => {
        //         console.log("Erro ao fazer login", error);
        //         toast.error("Erro ao fazer login");
        //     })
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