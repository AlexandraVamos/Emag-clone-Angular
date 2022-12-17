import { Geolocation } from "./Geolocation";
import { Street } from "./Street";

export interface Address {
    city: string;
    street: Street;
    number: number;
    zipcode: number;
    geolocation: Geolocation;
}