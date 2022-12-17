import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  @Input()
  productItem!: Product;

  constructor(private router: Router, library: FaIconLibrary) { library.addIconPacks(fas); }


  ngOnInit(): void {

  }

  redirectToProductDetail(id: number) {
    this.router.navigateByUrl(`/products/${id}`);
  }

}
