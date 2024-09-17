
export interface ProductProps {
    id: number,
    name: string;
    description: string;
    value: number;
    image: string;
}

export interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
}