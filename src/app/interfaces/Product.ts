import { Rating } from "./Rating";

export interface Product {
    id: number;
    category: string;
    description: string;
    price: number;
    title: string;
    image: string;
    rating: Rating;
}
