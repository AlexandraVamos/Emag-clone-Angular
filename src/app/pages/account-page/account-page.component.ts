import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  providers: [CartService, UserService]
})
export class AccountPageComponent implements OnInit {
  userId: string = "-1"
  userName = "Guest"
  cartProducts: Product[] = []

  user: User = {
    id: 0,
    email: '',
    username: '',
    password: '',
    name: { firstname: '', lastname: '' },
    address: { city: '', street: { number: 0, name: '' }, number: 0, zipcode: 0, geolocation: { lat: 0, long: 0 } },
    phone: 0
  }

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId()
    this.getUser()
    this.userId = this.userService.getUserId()
    this.cartProducts = this.cartService.getCartProducts(this.userId)
  }

  id: any = "account"
  tabChange(ids: any) {
    this.id = ids;
  }

  getUser() {
    this.httpClient.get<any>('https://fakestoreapi.com/users/' + this.userId).subscribe(
      response => {
        if (response.name.firstname != null) {
          this.user = response
          this.userName = response.name.firstname
        }
      })
  }
}
