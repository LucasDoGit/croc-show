
export interface AddressProps {
    logradouro: string;
    bairro: string;
    localidade: string;
    numero: string;
    complemento?: string;
}

export interface DataProps {
    logradouro: string;
    bairro: string;
    localidade: string;
    erro?: boolean;
}