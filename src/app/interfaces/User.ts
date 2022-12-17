import { Address } from "./Address";
import { Name } from "./Name";

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    address: Address;
    phone: number;
}