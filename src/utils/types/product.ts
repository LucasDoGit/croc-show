
export interface ProductProps {
    id: number,
    name: string,
    description: string,
    categoryId: string;
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

export interface CategoriesProps {
    id: string;
    name: string;
    created: string;
}