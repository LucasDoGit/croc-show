"use client"
import styles from './productForm.module.css'
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CategoriesProps, ProductProps } from '@/utils/types/Product';
import { Input } from '@/components/Input';

import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/services/firebaseConnection';
import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const productSchema = z.object({
    name: z.string().min(1, 'Dígite um nome válido para o produto.'),
    description: z.string().min(1, 'Dígite uma descrição para o produto.'),
    price: z.string().min(1, 'Digite o valor do produto.').refine((value) => {
        return /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/.test(value);
    }, {
        message: "Digite um preço válido."
    }),
    categoryId: z.string().min(1, 'Seleciona um categoria para o produto.'),
    image: z.union([
        z.any()
            .refine(file => file !== undefined, 'Você deve selecionar uma imagem')
            .refine(file => file !== null, 'Você deve selecionar uma imagem')
            .refine(file => file && file.size <= MAX_FILE_SIZE, `O tamanho máximo da imagem é ${(MAX_FILE_SIZE / 1000000).toFixed(2)}MB`)
            .refine(file => file && ACCEPTED_IMAGE_TYPES.includes(file?.type), 'Formato de imagem não suportado'),
        z.string()
        .url("URL inválida")
        .optional(),
    ])
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
    product?: ProductProps;
}

export function ProductForm({ product }: ProductFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>('');
    const [categories, setCategories] = useState<CategoriesProps[]>([])

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: "onChange"
    })

    useEffect(() => {
        async function handleCategories() {
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
        function getProduct() {
            if (!product) return;

            reset({
                name: product.name,
                description: product.description,
                categoryId: product.categoryId,
                price: product.price.toString(),
                image: product.image
            })

            setImagePreview(product.image)
        }

        getProduct()
    }, [product, categories])

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            setValue("image", image)

            const objectURL = URL.createObjectURL(image);
            setImagePreview(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        } else {
            setImagePreview(null);
        }
    }

    async function handleCreateProduct(data: ProductFormData) {

        if(!data.image) {
            toast.error("O produto deve ter uma imagem!")
            return;
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

            const imageRef = ref(storage, `products/${docRef.id}/${crypto.randomUUID()}`)
            const uploadTask = uploadBytesResumable(imageRef, data.image)

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

    async function handleEditProduct(data: ProductFormData) {
        
        if(!data.image || data.image === null){
            toast.error("O produto deve ter uma imagem!")
            return;
        }

        if(!product) return;

        const toastId = toast.loading('Editando produto...');

        try {
            const productRef = doc(db, "products", product.id);
            
            await setDoc(productRef, {
                name: data.name.toUpperCase(),
                price: data.price,
                description: data.description,
                categoryId: data.categoryId,
            })

            if(!(data.image !instanceof File)){
                return
            } 

            const imageRef = ref(storage, `products/${product.id}/${crypto.randomUUID()}`)
            const uploadTask = uploadBytesResumable(imageRef, data.image)

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error('Erro ao fazer upload da imagem:', error);
                    toast.error("Erro ao fazer upload da imagem")
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    await updateDoc(doc(db, 'products', product.id), {
                        imageUrl: downloadURL,
                    });

                    toast.success('Produto editado com sucesso!', {
                        id: toastId
                    })
                }
            )
        } catch (error) {
            console.log("Erro ao tentar cadastrar produto", error)
            toast.error("Erro ao cadastrar produto!", {
                id: toastId
            })
        }
        
    }

    async function handleDeleteImage() {
        setImagePreview('')
        setValue('image', null)

        if(product){
            try {
                const imageRef = ref(storage, product.image);
            
                await deleteObject(imageRef);

                const productRef = doc(db, "products", product.id);
                await updateDoc(productRef, {
                    imageUrl: null,
                });

                toast.success('imagem apagada com sucesso!')
            } catch (error) {
                console.error("Erro ao apagar a imagem:", error);
                toast.error('Erro ao apagar imagem')
            }
        }
    }

    async function onSubmitHandler(data: ProductFormData) {
        if (product) {
            handleEditProduct(data)
        } else {
            handleCreateProduct(data)
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmitHandler)}
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
                                <MdDelete size={24} color='#f34e26' />
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
                                    onChange={handleImageChange}
                                />
                            </button>
                        </div>
                    )}
                    {errors.image && <p className={styles.messageError}>{errors.image.message?.toString()}</p>}
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
