import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  selectedFilter: string = 'none';
  greaterPrice: number | null = null;
  lessPrice: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  selectedSortOrder: string = 'none'; 

  constructor(private productService: ProductService) {}

  onFilterTypeChange(): void {
    this.resetFilterValues();
  }

  resetFilterValues(): void {
    this.greaterPrice = null;
    this.lessPrice = null;
    this.minPrice = null;
    this.maxPrice = null;
  }

  filterByPriceGreaterThanEqual(): void {
    if (this.greaterPrice !== null) {
      this.productService.getProductsByPriceGreaterThanEqual(this.greaterPrice).subscribe(
        (data: Product[]) => {
          this.products = data; // Assign data to products array
          this.sortProducts();   // Call sortProducts without passing any arguments
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
  }

  filterByPriceLessThanEqual(): void {
    if (this.lessPrice !== null) {
      this.productService.getProductsByPriceLessThanEqual(this.lessPrice).subscribe(
        (data: Product[]) => {
          this.products = data; // Assign data to products array
          this.sortProducts();   // Call sortProducts without passing any arguments
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
  }

  filterByPriceBetween(): void {
    if (this.minPrice !== null && this.maxPrice !== null) {
      this.productService.getProductsByPriceBetween(this.minPrice, this.maxPrice).subscribe(
        (data: Product[]) => {
          this.products = data; // Assign data to products array
          this.sortProducts();   // Call sortProducts without passing any arguments
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
  }

  // Sort the products by price or alphabetically
  sortProducts(): void {
    this.products = this.sortLogic(this.products); // Sort the existing products array
  }

  // Sorting logic for both price and alphabetical sorting
  sortLogic(products: Product[]): Product[] {
    switch (this.selectedSortOrder) {
      case 'price-ascending':
        return products.sort((a, b) => a.retailShopPrice - b.retailShopPrice);
      case 'price-descending':
        return products.sort((a, b) => b.retailShopPrice - a.retailShopPrice);
      case 'alpha-ascending':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case 'alpha-descending':
        return products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  }
}
