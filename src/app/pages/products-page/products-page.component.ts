import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  providers: [CartService, UserService]
})
export class ProductsPageComponent implements OnInit {

  userId = "2"
  cartProducts: Product[] = []

  images = [
    {
      imageSrc:
        'assets/images/emag1.webp',
      imageAlt: 'emag-logo',
    },
    {
      imageSrc:
        'assets/images/emag2.webp',
      imageAlt: 'emag-logo',
    },
    {
      imageSrc:
        'assets/images/emag4.webp',
      imageAlt: 'emag-logo',
    },
    {
      imageSrc:
        'assets/images/emag1.webp',
      imageAlt: 'emag-logo',
    },
    {
      imageSrc:
        'assets/images/emag2.webp',
      imageAlt: 'emag-logo',
    },
  ]

  text = ""
  constructor(private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService) {
    activatedRoute.params.subscribe((params) => {
      if (params['text'])
        this.text = params['text']
    })
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId()
    this.cartProducts = this.cartService.getCartProducts(this.userId)
    if (this.text != "") {
      console.log(this.text)
    }
  }

}

