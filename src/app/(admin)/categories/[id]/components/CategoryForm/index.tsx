"use client"
import styles from './categoryForm.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Input } from '@/components/Input';
import { CategoriesProps } from '@/utils/types/Product';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { useEffect } from 'react';

const editCategorySchame = z.object({
    name: z.string().min(1, 'Digite um nome válido para categoria'),
})

export type EditCategorySchame = z.infer<typeof editCategorySchame>

interface CategoryFormProps {
    category: CategoriesProps
}

export function CategoryForm({ category }: CategoryFormProps){

    async function onSubmit(data: EditCategorySchame) {
        try {
            const docRef = doc(db, "categories", category.id);
            
            await updateDoc(docRef, {
                name: data.name,
            }).then(() => {
                toast.success("Categoria atualizada")
            }).catch((err) => toast.error("Erro ao atualizar categoria", err))

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar a categoria")
        }
    }

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<EditCategorySchame>({
        resolver: zodResolver(editCategorySchame),
        mode: "onChange"
    })

    useEffect(() => {
        reset(category)
    }, [category])

    return(
        <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.categoryForm}
            >  
                <label>Nome da categoria</label>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    error={errors.name?.message}
                    register={register}
                />
                <button type='submit' className={styles.buttonSubmit}>Salvar</button>
        </form>
    )
}