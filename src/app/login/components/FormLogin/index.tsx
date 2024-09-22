"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import styles from './formlogin.module.css';
import { Input } from '@/components/Input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/services/firebaseConnection';
import { FirebaseError } from 'firebase/app';

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

    async function fetchLogin(data: LoginUserSchema) {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
        return userCredential;
    }

    async function onSubmit(data: LoginUserSchema) {
        toast.promise(
            fetchLogin(data).then(() => {
                router.push("/");
            }),
            {
                loading: 'Fazendo login...',
                success: 'Login bem-sucedido!',
                error: 'Erro ao fazer login'
            }
        ).catch((error) => {
            if (error instanceof FirebaseError) {
                const errorMessage = mapFirebaseError(error.code);
                toast.error(errorMessage);
            }
        })
    }

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout();
    }, [])

    function mapFirebaseError(code: string) {
        switch (code) {
            case 'auth/invalid-credential':
                return 'Email ou senha incorretos. Verifique os campos digitados'
            case 'auth/user-not-found':
                return 'Usuário não encontrado. Verifique o email.';
            case 'auth/wrong-password':
                return 'Senha incorreta. Tente novamente.';
            case 'auth/invalid-email':
                return 'Email inválido. Verifique o formato do email.';
            case 'auth/user-disabled':
                return 'Esta conta foi desativada. Entre em contato com o suporte.';
            case 'auth/too-many-requests':
                return 'Várias tentativas de acesso. Aguarde 2 minutos para acessar novamente.'
            default:
                return 'Erro ao fazer login. Tente novamente.';
        }
    };

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