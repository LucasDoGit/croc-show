"use client"
import styles from './productForm.module.css'
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CategoriesProps, ProductProps } from '@/utils/types/Product';
import { Input } from '@/components/Input';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/services/firebaseConnection';

const editProductSchema = z.object({
    name: z.string().min(1, 'Dígite um nome válido para o produto.'),
    description: z.string().min(1, 'Dígite uma descrição para o produto.'),
    price: z.string().min(1, 'Digite o valor do produto.').refine((value) => {
        return /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/.test(value);
    }, {
        message: "Digite um preço válido."
    }),
    categoryId: z.string().min(1, 'Seleciona um categoria para o produto.')
})

export type EditProductSchema = z.infer<typeof editProductSchema>

interface ProductFormProps {
    product?: ProductProps;
}

export function ProductForm({product}: ProductFormProps) {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>('');
    const [categories, setCategories] = useState<CategoriesProps[]>([])

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<EditProductSchema>({
        resolver: zodResolver(editProductSchema),
        mode: "onChange"
    })

    useEffect(() => {
        async function handleCategories(){
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            const categoriesData = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            })) as CategoriesProps[];
            setCategories(categoriesData);
        }

        handleCategories()
    }, [])

    useEffect(() => {
        function getProduct(){
            if(!product) return;
    
            reset({
                name: product.name,
                description: product.description,
                categoryId: product.categoryId,
                price: product.price.toString(),
            })
    
            setImagePreview(product.image)
            setImage(null)
        }

        getProduct()
    }, [product, categories])

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === "image/jpeg" || image.type === "image/png") {
                const url = URL.createObjectURL(image)
                setImagePreview(url)
                setImage(image)
            } else {
                toast.error("A foto precisa estar no formato de JPEG ou PNG")
                return
            }
        }
    }

    async function handleCreateProduct(data: EditProductSchema) {

        if (!image) {
            toast.error("Por favor ínsira a imagem do produto!")
            return
        }

        const toastId = toast.loading('Cadastrando produto...');
        
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name: data.name.toUpperCase(),
                price: data.price,
                description: data.description,
                categoryId: data.categoryId,
                created: new Date(),
            })

            const imageRef = ref(storage, `products/${docRef.id}/foto`)
            const uploadTask = uploadBytesResumable(imageRef, image)

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error('Erro ao fazer upload da imagem:', error);
                    toast.error("Erro ao fazer upload da imagem")
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    await updateDoc(doc(db, 'products', docRef.id), {
                        imageUrl: downloadURL,
                    });

                    toast.success('Produto cadastrado com sucesso!', {
                        id: toastId
                    })
                    setImage(null)
                    setImagePreview(null)
                    reset()
                }
            )
        } catch (error) {
            console.log("Erro ao tentar cadastrar produto", error)
            toast.error("Erro ao cadastrar produto!", {
                id: toastId
            })
        }
    }

    async function handleSubmitForm(data: EditProductSchema){
        if(product){
            handleCreateProduct(data)
        } else {
            handleEditProduct(data)
        }
    }

    async function handleEditProduct(data: EditProductSchema) {
        console.log('teste')
        toast.success("Produto editado")
    }

    async function handleDeleteImage() {
        setImage(null)
        setImagePreview('')
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <div className={styles.contentContainer}>
                <div className={styles.productImage}>
                    {imagePreview ? (
                        <div className={styles.imageContainer}>
                            <Image
                                src={imagePreview}
                                alt={'Foto do produto'}
                                priority={true}
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw'
                                fill={true}
                            />
                            <button 
                                type='button' 
                                className={styles.buttonDelete}
                                onClick={handleDeleteImage}
                            >
                                <MdDelete size={24} color='#f34e26'/>
                            </button>
                        </div>
                    ) : (
                        <div className={styles.imageContainer}>
                            <button className={styles.buttonUpload} type='button'>
                                <div className={styles.iconUpload}>
                                    <FiUpload size={30} color="#000" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFile}
                                />
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <Input
                        type="text"
                        placeholder="nome"
                        name="name"
                        error={errors.name?.message}
                        register={register}
                    />
                    <div className={styles.inputContainer}>
                        <textarea
                            placeholder="descrição"
                            {...register("description")}
                        />
                        {errors.description && <p className={styles.messageError}>{errors.description.message}</p>}
                    </div>
                    <div className={styles.inputContainer}>
                        <select
                            className={styles.select}
                            {...register('categoryId')}
                        >
                            <option value="" className={styles.option}>Selecione uma categoria</option>
                            {categories.map(category => (
                                <option 
                                    key={category.id} 
                                    value={category.id}
                                    className={styles.option}
                                >
                                {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && <p className={styles.messageError}>{errors.categoryId.message}</p>}
                    </div>
                    <Input
                        type="text"
                        placeholder="preço"
                        name="price"
                        error={errors.price?.message}
                        register={register}
                        stylesInput={styles.inputPrice}
                        stylesError={styles.inputPriceError}
                    />
                </div>
            </div>
            <button type='submit' className={styles.buttonSubmit}>Salvar</button>
        </form>
    )
}