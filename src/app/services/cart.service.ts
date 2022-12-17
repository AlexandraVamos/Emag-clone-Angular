import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/Product';
import { Cart } from '../interfaces/Cart';

@Injectable()
export class CartService {

    constructor(private httpClient: HttpClient) { }

    products: Product[] = []
    cart: Cart[] = []
    cartProducts: Product[] = []

    totalPrice: number = 0
    cartProductsNumber = 0

    getCart(id: string) {
        if (localStorage.getItem(id)) {
            return JSON.parse(localStorage.getItem(id) ?? "")
        }
        return null
    }

    getCartLength(id: string) {
        let totalProducts = 0
        if (localStorage.getItem(id) == null) return 0
        else {
            if (JSON.parse(localStorage.getItem(id) ?? "").quantity != undefined) {
                return JSON.parse(localStorage.getItem(id) ?? "").quantity
            }
            else {
                for (let i = 0; i < JSON.parse(localStorage.getItem(id) ?? "").length; i++) {
                    totalProducts += JSON.parse(localStorage.getItem(id) ?? "")[i].quantity
                }
                return totalProducts
            }
        }
    }

    request() {
        this.httpClient.get<any>('https://fakestoreapi.com/products').subscribe(
            response => {
                this.products = response
            })
        return this.products
    }

    getCartProducts(id: string) {
        this.cartProducts = []
        this.cart = []

        if (this.getCart(id) != null && this.getCart(id).product)
            this.cart.push(this.getCart(id))
        else this.cart = this.getCart(id)
        if (this.cart)
            for (let i = 0; i < this.cart.length; i++)
                this.cartProducts.push(this.cart[i].product)

        return this.cartProducts
    }

    getCartPrice(id: string) {
        let totalPrice = 0
        if (localStorage.getItem(id) == null) return 0
        else {
            if (JSON.parse(localStorage.getItem(id) ?? "").quantity != undefined) {
                return JSON.parse(localStorage.getItem(id) ?? "").quantity * JSON.parse(localStorage.getItem(id) ?? "").product.price
            }
            else {
                for (let i = 0; i < JSON.parse(localStorage.getItem(id) ?? "").length; i++) {
                    totalPrice += JSON.parse(localStorage.getItem(id) ?? "")[i].quantity * JSON.parse(localStorage.getItem(id) ?? "")[i].product.price
                }
                return totalPrice
            }
        }
    }
}