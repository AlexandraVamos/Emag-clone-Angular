import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/Cart';
import { Product } from 'src/app/interfaces/Product';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  providers: [CartService, UserService]
})
export class CartPageComponent implements OnInit {
  userId = "-1"

  products: Product[] = []
  cart: Cart[] = []
  cartProducts: Product[] = []
  totalPrice: number = 0
  cartProductsNumber = 0

  constructor(private httpClient: HttpClient, private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId()
    this.request()
  }


  request() {
    this.httpClient.get<any>('https://fakestoreapi.com/products').subscribe(
      response => {
        this.products = response;
        this.getUserCart()
      })
  }

  getUserCart() {
    if (this.cartService.getCart(this.userId) != null && this.cartService.getCart(this.userId).product) {
      this.cart.push(this.cartService.getCart(this.userId))
    }
    else this.cart = this.cartService.getCart(this.userId)
    if (this.cart) {
      for (let i = 0; i < this.cart.length; i++) {
        this.cartProducts.push(this.cart[i].product)
        this.totalPrice += this.cart[i].product.price * this.cart[i].quantity
        this.cartProductsNumber += this.cart[i].quantity
      }
    }
  }

  addObject(id: number) {
    let index = this.cart.findIndex((element) => element.product.id == id)
    let quantity = parseInt((<HTMLInputElement>document.getElementById("quantity" + id)).value);
    if (quantity < 5) {
      this.cart[index].quantity = quantity + 1
      this.totalPrice += this.cart[index].product.price
      this.cartProductsNumber += 1
    }
    localStorage.setItem(this.userId, JSON.stringify(this.cart))
  }

  substractObject(id: number) {
    let index = this.cart.findIndex((element) => element.product.id == id)
    let quantity = parseInt((<HTMLInputElement>document.getElementById("quantity" + id)).value);
    if (quantity >= 1) this.cart[index].quantity = quantity - 1
    this.totalPrice -= this.cart[index].product.price
    this.cartProductsNumber -= 1
    if (quantity == 1) this.removeobject(id)
    localStorage.setItem(this.userId, JSON.stringify(this.cart))
  }

  removeobject(id: number) {
    let index = this.cart.findIndex((element) => element.product.id == id)
    if (index >= 0) {
      this.cart.splice(index, 1)
      this.cartProducts = []
      this.totalPrice = this.cartProductsNumber = 0
      this.cart.forEach(element => {
        this.cartProducts.push(element.product)
        this.totalPrice += element.product.price * element.quantity
        this.cartProductsNumber += element.quantity
      });
      localStorage.setItem(this.userId, JSON.stringify(this.cart))
    }
  }

  addManually(id: number) {
    let index = this.cart.findIndex((element) => element.product.id == id)
    if (index >= 0) {
      this.cart[index].quantity = parseInt((<HTMLInputElement>document.getElementById("quantity" + id)).value);
      this.cartProducts = []
      this.totalPrice = this.cartProductsNumber = 0
      this.cart.forEach(element => {
        this.cartProducts.push(element.product)
        this.totalPrice += element.product.price * element.quantity
        this.cartProductsNumber += element.quantity
      });
      localStorage.setItem(this.userId, JSON.stringify(this.cart))
    }
  }
}