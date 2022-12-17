import { HttpClient } from '@angular/common/http';
import { Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/Cart';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss'],
  providers: [CartService, UserService]
})
export class SingleProductPageComponent implements OnInit {

  users: User[] = [];
  user: any = {};

  product: Product = {
    id: 0,
    category: '',
    description: '',
    price: 0,
    title: '',
    image: '',
    rating: { rate: 0, count: 0, }
  }
  userId: string = "-1"

  productsFromSameCategory: Product[] = []
  isInCart: boolean = false
  cart: Cart[] = []

  nr: number = 0

  category: String = ""
  images: String[] = []
  image: String = ""
  cartProducts: Product[] = []

  constructor(private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.nr = parseInt(params['id'])
    })
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId()
    this.request();
    this.cartVerify()
    this.cartProducts = this.cartService.getCartProducts(this.userId)
  }

  request() {
    this.httpClient.get<any>('https://fakestoreapi.com/products/' + this.nr).subscribe(
      response => {
        this.product = response;

        //add six img in array
        this.category = this.product.category
        this.addImages()
        this.image = this.images[0]
        this.getAllProductsFromCategory(this.category)
      }
    )
  }

  addImages() {
    for (let i = 0; i < 6; i++) {
      this.images.push(this.product.image)
    }
  }

  cartVerify() {
    let cart: Cart[] = this.cartService.getCart(this.userId)

    if (this.cartService.getCart(this.userId) && this.cartService.getCart(this.userId).length == undefined && this.nr == this.cartService.getCart(this.userId).product.id) {
      this.isInCart = true
      return 1
    }
    if (cart)
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product.id == this.nr) {
          this.isInCart = true
          return i
        }
      }
    return 0
  }

  changeImage(imgIndex: number) {
    this.image = this.images[imgIndex]
  }

  addToCart(product: Product, title: string) {
    if (!this.isInCart) {
      let newItem = { 'product': product, 'quantity': 1 }
      if (this.cartService.getCart(this.userId)) {
        if (this.cartService.getCart(this.userId).length != undefined) {
          this.cart = []
          this.cartService.getCart(this.userId).forEach((element: Cart) => {
            this.cart.push(element)
          });
          this.cart.push(newItem)
          localStorage.setItem(this.userId, JSON.stringify(this.cart))
        } else {
          this.cart.push(this.cartService.getCart(this.userId))
          this.cart.push(newItem)
          localStorage.setItem(this.userId, JSON.stringify(this.cart))
        }
      } else localStorage.setItem(this.userId, JSON.stringify(newItem))
    } else {
      let cart: Cart[] = this.cartService.getCart(this.userId)
      if (cart.length != undefined) cart.splice(this.cartVerify(), 1)
      else localStorage.removeItem(this.userId)
      if (cart.length > 0) localStorage.setItem(this.userId, JSON.stringify(cart))
      else localStorage.removeItem(this.userId)
    }

    this.cartProducts = this.cartService.getCartProducts(this.userId)
    this.isInCart = !this.isInCart
  }

  getAllProductsFromCategory(category: String) {
    this.httpClient.get<any>('https://fakestoreapi.com/products/category/' + category).subscribe(
      response => {
        this.productsFromSameCategory = response;
        let index = 0
        for (let i = 0; i < this.productsFromSameCategory.length; i++) {
          if (this.productsFromSameCategory[i].id == this.nr) {
            index = this.productsFromSameCategory.indexOf(this.productsFromSameCategory[i])
          }
        }
        this.productsFromSameCategory.splice(index, 1)
      }
    )
  }

  refreshPage(id: number) {
    this.router.navigate(['/products/' + id], this.user)
      .then(() => {
        window.location.reload()
      })
  }
}