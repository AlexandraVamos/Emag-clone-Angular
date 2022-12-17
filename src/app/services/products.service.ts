import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  products: Product[] = [];

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products', { headers: this.authService.reqHeader });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }
}