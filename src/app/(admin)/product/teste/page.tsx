"use client"

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB em bytes 
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço deve ser um número positivo").transform((val) => Number(val)),
  image: z.any()
        .refine(file => file !== undefined, 'Você deve selecionar uma imagem')
        .refine(file => file && file.size <= MAX_FILE_SIZE, `O tamanho máximo do arquivo é 5MB.`)
        .refine(file => file && ACCEPTED_IMAGE_TYPES.includes(file?.type), 'Formato de imagem não suportado'),
});

type FormData = z.infer<typeof schema>;

export default function ImageUploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Dados do formulário:', data);
    // Aqui você pode enviar os dados para a API
  };

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

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Nome"
        {...register('name')}
      />
      {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
      
      <input
        type="number"
        placeholder="Preço"
        {...register('price', { valueAsNumber: true })}
      />
      {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {errors.image && <span style={{ color: 'red' }}>{errors.image.message?.toString()}</span>}
      
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
      )}
      <button type="submit">Enviar</button>
    </form>
    </>
  );
};
