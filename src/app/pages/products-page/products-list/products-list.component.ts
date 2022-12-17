import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filters: string[] = ["Sort By:", "Default", "Name Ascending", "Name Descending", "Price Low-High", "Price High-Low"];
  selectedValue = 'Sort By:';

  text = ""
  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params['text'])
        this.text = params['text']
    })
  }

  ngOnInit() {
    if (this.text == "")
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.products = products;
        console.log(products);
      });
    else
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.products = products.filter((obj) => { return obj.title.toLocaleLowerCase().includes(this.text.toLowerCase()) });
        console.log(products);
      });
  }

  filterSelect() {
    console.log(this.filterSelect);
  }

  printVal(filters: string) {
    switch (filters) {
      case "Default": this.products.sort((a, b) => a.id > b.id ? 1 : -1)
        break;
      case "Name Ascending": this.products.sort((a, b) => a.title > b.title ? 1 : -1);
        break;

      case "Name Descending": this.products.sort((a, b) => b.title > a.title ? 1 : -1);
        break;

      case "Price Low-High": this.products.sort((a, b) => a.price - b.price);
        break;

      case "Price High-Low": this.products.sort((a, b) => b.price - a.price);
        break;
    }

  }
}


