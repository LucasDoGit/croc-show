
export interface ProductProps {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string
}

export interface CartProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
    description: string;
    image: string
}