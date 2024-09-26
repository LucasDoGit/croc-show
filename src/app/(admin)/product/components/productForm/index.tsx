"use client"
import styles from './productForm.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Input } from '@/components/Input';
import { CategoriesProps, ProductProps } from '@/utils/types/Product';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';

const editCategorySchame = z.object({
    name: z.string().min(1, 'Dígite um nome válido para o produto.'),
    description: z.string().min(1, 'Dígite uma descrição para o produto.'),
    price: z.string().min(1, 'Digite o valor do produto.'),
})

export type EditCategorySchame = z.infer<typeof editCategorySchame>

interface ProductFormProps {
    product: ProductProps
}

export function ProductForm(){

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<EditCategorySchame>({
        resolver: zodResolver(editCategorySchame),
        mode: "onChange"
    })

    return(
        <form className={styles.form}>
            <div className={styles.contentContainer}>
                <div className={styles.imageContainer}>
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000" />
                    </div> 
                    <input
                        type="file"
                        accept="image/*"
                        onChange={() => toast.success('imagem adicionada')}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <Input
                            type="text"
                            placeholder="nome"
                            name="name"
                            error={errors.name?.message}
                            register={register}
                    />
                    <Input
                            type="text"
                            placeholder="descrição"
                            name="descricao"
                            error={errors.description?.message}
                            register={register}
                    />
                    <Input
                            type="text"
                            placeholder="preço"
                            name="price"
                            error={errors.price?.message}
                            register={register}
                    />
                </div>
            </div>
            <button type='submit' className={styles.buttonSubmit}>Salvar</button>
        </form>
    )
}