import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProductsByPriceGreaterThanEqual(price: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/price/greater-than-equal/${price}`);
  }

  getProductsByPriceLessThanEqual(price: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/price/less-than-equal/${price}`);
  }

  getProductsByPriceBetween(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/price/between?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }
}
