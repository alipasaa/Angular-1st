import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { FormsModule} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  filterByPriceGreaterThanEqual(price: string): void {
    this.productService.getProductsByPriceGreaterThanEqual(parseFloat(price)).subscribe(data => {
      this.products = data;
    });
  }

  filterByPriceLessThanEqual(price: string): void {
    this.productService.getProductsByPriceLessThanEqual(parseFloat(price)).subscribe(data => {
      this.products = data;
    });
  }

  filterByPriceBetween(minPrice: string, maxPrice: string): void {
    this.productService.getProductsByPriceBetween(parseFloat(minPrice), parseFloat(maxPrice)).subscribe(data => {
      this.products = data;
    });
  }
}