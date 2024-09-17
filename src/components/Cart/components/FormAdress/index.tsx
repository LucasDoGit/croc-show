"use client"
import { useEffect, useState } from 'react'
import styles from './adressForm.module.css'
import { Input } from '@/components/Input'

interface DataProps {
    logradouro: string;
    bairro: string;
    localidade: string;
    erro?: boolean;
}

export function FormAdress() {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [observacoes, setObservacoes] = useState('');

    async function fetchAddress(){
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data: DataProps = await res.json();
                                
            if(data.erro){
                console.log("Endereço não encontrado")
            } else {
                setLogradouro(data.logradouro || '');
                setBairro(data.bairro || '')
                setLocalidade(data.localidade || '')
            }
        } catch (error) {
            console.log("failed to fetch data ", error)
        }
    } 

    useEffect(() => {
        if (cep.length === 8) {
            fetchAddress()
        }
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
                    required
                />
            </div>
            <div className={styles.groupInput}>
                <div className={styles.inputContainer}>
                    <label>Rua/Logradouro</label>
                    <Input 
                        type="text" 
                        placeholder="Rua..."   
                        value={logradouro}
                        onChange={(e) => setLogradouro(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Número</label>
                    <Input 
                        type="text" 
                        placeholder="Número..."
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className={styles.groupInput}>
                <div className={styles.inputContainer}>
                    <label>Cidade</label>
                    <Input 
                        type="text" 
                        placeholder="Cidade..."  
                        value={localidade}
                        onChange={(e) => setLocalidade(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Bairro</label>
                    <Input 
                        type="text" 
                        placeholder="Bairro..."  
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label>Complementos</label>
                <Input 
                    type="text" 
                    placeholder="Complemento"  
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label>Observações do Pedido</label>
                <textarea 
                    placeholder="Tirar cebola..."
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />
            </div>
        </div>
    )
}