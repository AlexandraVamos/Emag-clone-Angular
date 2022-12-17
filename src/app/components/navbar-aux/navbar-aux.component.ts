import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-navbar-aux',
  templateUrl: './navbar-aux.component.html',
  styleUrls: ['./navbar-aux.component.scss']
})
export class NavbarAuxComponent implements OnInit {

  categories: string[] = [];
  isMouseOver: boolean =false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
      console.log(categories);
    })
  }

  toggleButton(){
    this.isMouseOver = !this.isMouseOver;
  }

  filterProducts(){

  }

}