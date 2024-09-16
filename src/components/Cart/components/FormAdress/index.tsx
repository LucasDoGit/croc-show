"use client"
import { useEffect, useState } from 'react'
import styles from './adressForm.module.css'
import { Input } from '@/components/Input'

interface DataProps {
    logradouro: String;
    bairro: String;
    localidade: String;
    uf: String;
}

export function FormAdress() {
    const [cep, setCep] = useState('')
    const [address, setAddress] = useState<DataProps>()

    useEffect(() => {

        async function handleCepSearch(){
            if (cep.length === 8) {
                console.log("true")
                try {
                    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    const resultData: DataProps = await res.json();
                    
                    setAddress(resultData)
                    console.log(address)
                } catch (error) {
                    console.log("failed to fetch data ", error)
                }
            }
        } 

        handleCepSearch()
    }, [cep])

    return (
        <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
                <label>Digite seu CEP:</label>
                <Input type="text" 
                    placeholder="Digite o seu cep" 
                    value={cep} 
                    onChange={(e) => setCep(e.target.value)} 
                    maxLength={8}
                />
            </div>
            <div className={styles.groupInput}>
                <div className={styles.inputContainer}>
                    <label>Rua/Logradouro</label>
                    <Input type="text" placeholder="Rua..."   />
                </div>
                <div className={styles.inputContainer}>
                    <label>Número</label>
                    <Input type="text" placeholder="Número..."  />
                </div>
            </div>
            <div className={styles.groupInput}>
                <div className={styles.inputContainer}>
                    <label>Cidade</label>
                    <Input type="text" placeholder="Cidade..."  />
                </div>
                <div className={styles.inputContainer}>
                    <label>Bairro</label>
                    <Input type="text" placeholder="Bairro..."  />
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>Complementos</label>
                <Input type="text" placeholder="Complemento"  />
            </div>
            <div className={styles.inputContainer}>
                <label>Observações</label>
                <textarea placeholder="Observações"  />
            </div>
        </div>
    )
}