import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/Cart';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [CartService, UserService]
})
export class NavbarComponent implements OnInit {
  userId = "2"

  categories: string[] = [];
  isMouseOver: boolean = false;
  categoryProducts: Product[] | any = [];
  categoryName: string = '';

  isMenuOpenedDesktop: boolean = false;
  isMenuOpenedMobile: boolean = false;
  searchTextDesktop = ""
  searchTextMobile = ""
  searchListDesktop: Product[] = []
  searchListMobile: Product[] = []
  products: Product[] = []
  showSearchOnMobile = false

  cart: Cart[] = []
  totalPrice: number = 0
  cartProductsNumber = 0
  userName = "Guest"
  testnumber = 0

  @Input() cartProducts: Product[] = []

  constructor(private httpClient: HttpClient,
    private router: Router,
    public cartService: CartService,
    private userService: UserService,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.request()
    this.userId = this.userService.getUserId()
    this.userName = this.userService.getUserName()

    this.getCategories()
  }

  searchFeatureDesktop() {
    this.searchTextDesktop = (<HTMLInputElement>document.getElementById("searchBoxDesktop")).value;
    if (this.searchTextDesktop.length >= 3) {
      this.searchListDesktop = this.products
      this.searchListDesktop = this.searchListDesktop.filter((obj) => { return obj.title.toLocaleLowerCase().includes(this.searchTextDesktop.toLowerCase()) }).splice(0, 5)
      this.isMenuOpenedDesktop = true
    } else {
      this.searchListDesktop = []
      this.isMenuOpenedDesktop = false
    }
  }

  searchFeatureMobile() {
    this.searchTextMobile = (<HTMLInputElement>document.getElementById("searchBoxMobile")).value;
    if (this.searchTextMobile.length >= 3) {
      this.searchListMobile = this.products
      this.searchListMobile = this.searchListMobile.filter((obj) => { return obj.title.toLocaleLowerCase().includes(this.searchTextMobile.toLowerCase()) }).splice(0, 5)
      this.isMenuOpenedMobile = true
    } else {
      this.searchListMobile = []
      this.isMenuOpenedMobile = false
    }
  }

  request() {
    this.httpClient.get<any>('https://fakestoreapi.com/products').subscribe(
      response => {
        this.products = response;
      }
    )
  }

  onMobileSearch() {
    this.showSearchOnMobile = !this.showSearchOnMobile
  }

  getUser() {
    this.httpClient.get<any>('https://fakestoreapi.com/users/' + this.userId).subscribe(
      response => {
        if (response.name.firstname != null) {
          this.userName = response.name.firstname
        }
      })
  }

  singleProductRefreshPage(id: number) {
    this.router.navigate(['products/' + id])
      .then(() => {
        window.location.reload()
      })
  }

  productListRefreshPage(text: string) {
    this.router.navigate(['/products/search/' + text])
      .then(() => {
        window.location.reload()
      })
  }

  logOut() {
    localStorage.removeItem("user")
  }

  toggleButton() {
    this.isMouseOver = !this.isMouseOver;
  }

  filterCategory(e: any) {
    console.log(e.fromElement.innerText);
    const categoryName = e.fromElement.innerText;
    this.categoryName = categoryName;
    this.httpClient.get<Product[]>(`https://fakestoreapi.com/products/category/${categoryName}`).subscribe(results => {
      console.log(results);
      this.categoryProducts = results;
    })
  }

  getCategories() {
    this.productsService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  hideCategories() {
    this.categoryProducts = []
  }

}