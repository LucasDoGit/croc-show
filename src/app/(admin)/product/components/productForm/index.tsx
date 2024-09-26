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
import { ChangeEvent, useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

const editCategorySchame = z.object({
    name: z.string().min(1, 'Dígite um nome válido para o produto.'),
    description: z.string().min(1, 'Dígite uma descrição para o produto.'),
    price: z.string().min(1, 'Digite o valor do produto.').refine((value) => {
        return /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/.test(value);
    }, {
        message: "Valor inválido"
    })
})

export type EditCategorySchame = z.infer<typeof editCategorySchame>

interface ProductFormProps {
    product: ProductProps
}

interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string;
}

export function ProductForm(){
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<EditCategorySchame>({
        resolver: zodResolver(editCategorySchame),
        mode: "onChange"
    })

    async function onSubmit(data: EditCategorySchame) {
        toast.success("produto cadastrado")
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === "image/jpeg" || image.type === "image/png") {
                const url = URL.createObjectURL(image)
                setImagePreview(url)
            } else {
                toast.error("A foto precisa estar no formato de JPEG ou PNG")
                return
            }
        }
    }

    // async function handleUpload(image: File) {
    //     const currentUid = user?.uid;
    //     const uidImage = uuidV4();

    //     const upload = ref(storage, `images/${currentUid}/${uidImage}`)

    //     uploadBytes(upload, image)
    //         .then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((downloadUrl) => {
    //                 const imageItem = {
    //                     name: uidImage,
    //                     uid: currentUid,
    //                     previewUrl: URL.createObjectURL(image),
    //                     url: downloadUrl,
    //                 }
    //                 toast.success("Imagem cadastradas com sucesso");
    //                 setCarImages((images) => [...images, imageItem])
    //             })
    //         })
    // }

    // async function handleDeleteImage(image: ImageItemProps) {
    //     const imagePath = `images/${image.uid}/${image.name}`

    //     const imageRef = ref(storage, imagePath);

    //     try {
    //         await deleteObject(imageRef)
    //         setCarImages(carImages.filter((car) => car.url !== image.url))
    //     } catch (err) {
    //         console.log("Erro ao deletar imagem")
    //     }
    // }

    async function handleUpload(){
        toast.success('Imagem carregada')
    }

    return(
        <form 
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.contentContainer}>
                <div className={styles.productImage}>
                    {imagePreview ? (
                        <div className={styles.imageContainer}>
                            <Image 
                            src={imagePreview} 
                            alt={'Foto do produto'}
                            fill={true}
                            />
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