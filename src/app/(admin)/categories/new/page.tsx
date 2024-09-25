"use client"
import styles from './newcategory.module.css'
import { addDoc, collection } from 'firebase/firestore'
import { Container } from '@/components/Container'
import { FaLessThan } from "react-icons/fa6";

import { db } from '@/services/firebaseConnection'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Input'
import Link from 'next/link';
import { Header } from '@/components/Header';
import toast from 'react-hot-toast';

const newCategorySchame = z.object({
    name: z.string().min(1, 'Digite um nome válido para categoria'),
})

type NewCategorySchame = z.infer<typeof newCategorySchame>

export default function newCategory() {

    const { register, handleSubmit, formState: { errors }, } = useForm<NewCategorySchame>({
        resolver: zodResolver(newCategorySchame),
        mode: "onChange"
    })

    async function onSubmit(data: NewCategorySchame) {
        addDoc(collection(db, "categories"), {
            name: data.name,
            created: new Date(),
        })
        .then(() => {
            toast.success("Categoria cadastrada!")
        })
        .catch((err) => {
            console.log("Erro ao cadastrar categoria", err)
            toast.error("Erro ao cadastrar categoria!")
        })
    }

    return (
        <Container>
            <Header/>
            <div className={styles.title}>
                <Link href={"/"}>
                    <FaLessThan size={24} color='#fff'/>
                </Link>
                <h2>Cadastrar Categoria</h2>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.categoryForm}
            >  
                <label>Nome da nova categoria</label>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    error={errors.name?.message}
                    register={register}
                />
                <button type='submit' className={styles.buttonSubmit}>Salvar</button>
            </form>
        </Container>
    )
}