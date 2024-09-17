import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  
  // Product array to store retrieved products
  products: Product[] = [];

  // Filters for the chips
  filters: string[] = ['Greater Than', 'Less Than']; // Predefined filters

  selectable = true;
  removable = true;

  // Remove filter chip
  removeFilter(filter: string): void {
    const index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  // State for filter type and input values
  selectedFilter: string = 'none';
  greaterPrice: number | null = null;
  lessPrice: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // Inject the ProductService
  constructor(private productService: ProductService) {}

  // Handle filter selection change
  onFilterTypeChange(): void {
    // Reset values when the filter type changes
    this.greaterPrice = null;
    this.lessPrice = null;
    this.minPrice = null;
    this.maxPrice = null;
  }

  // Filter by Greater Than or Equal
  filterByPriceGreaterThanEqual(): void {
    if (this.greaterPrice !== null) {
      this.productService.getProductsByPriceGreaterThanEqual(this.greaterPrice)
        .subscribe(
          (data: Product[]) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        );
    }
  }

  // Filter by Less Than or Equal
  filterByPriceLessThanEqual(): void {
    if (this.lessPrice !== null) {
      this.productService.getProductsByPriceLessThanEqual(this.lessPrice)
        .subscribe(
          (data: Product[]) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        );
    }
  }

  // Filter by Between
  filterByPriceBetween(): void {
    if (this.minPrice !== null && this.maxPrice !== null) {
      this.productService.getProductsByPriceBetween(this.minPrice, this.maxPrice)
        .subscribe(
          (data: Product[]) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        );
    }
  }
}
