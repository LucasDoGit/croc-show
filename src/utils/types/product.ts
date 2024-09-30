import { z } from "zod";

export interface ProductProps {
    id: string,
    name: string,
    description: string,
    categoryId: string;
    price: number,
    image: string
}

export interface CartProps {
    id: string;
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
