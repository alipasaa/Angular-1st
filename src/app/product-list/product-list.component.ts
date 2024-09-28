import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  pagedProducts: Product[] = []; // This will contain only the products for the current page

  pageSize = 5; // Default page size
  currentPage = 0; // Current page index
  totalProducts = 0; // Total number of products
  //displayedColumns: string[] = ['title', 'retailShopPrice']; // Table columns

  selectedFilter: string = 'none';
  greaterPrice: number | null = null;
  lessPrice: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedSortOrder: string = 'none'; 

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // If needed, we can initialize by fetching products with a default filter
    console.log('Component initialized'); // Log to check initialization
  }

  updatePagedProducts() {
    console.log('Updating paged products');
    console.log('Current page:', this.currentPage, 'Page size:', this.pageSize);
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
    console.log('Paged Products:', this.pagedProducts);
    }

  onPageChange(event: PageEvent) {
    console.log('Page change event:', event);    this.pageSize = event.pageSize;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  onFilterTypeChange(): void {
    console.log('Filter type changed:', this.selectedFilter);
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
      console.log('Sending price_gte:', this.greaterPrice); // Debugging the sent value
      this.productService.getProductsByPriceGreaterThanEqual(this.greaterPrice).subscribe(
        (data: Product[]) => {
          console.log('Received products:', data); // Debugging received products
          this.products = data;
          this.totalProducts = this.products.length;
          this.sortProducts();   
          this.updatePagedProducts();
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
  }
  
  filterByPriceLessThanEqual(): void {
    if (this.lessPrice !== null) {
      console.log('Sending price_lte:', this.lessPrice); // Debugging the sent value
      this.productService.getProductsByPriceLessThanEqual(this.lessPrice).subscribe(
        (data: Product[]) => {
          console.log('Received products:', data); // Debugging received products
          this.products = data;
          this.totalProducts = this.products.length;
          this.sortProducts();   
          this.updatePagedProducts();
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
  }
  
  filterByPriceBetween(): void {
    if (this.minPrice !== null && this.maxPrice !== null) {
      console.log('Sending price_gte:', this.minPrice, 'and price_lte:', this.maxPrice); // Debugging the sent values
      this.productService.getProductsByPriceBetween(this.minPrice, this.maxPrice).subscribe(
        (data: Product[]) => {
          console.log('Received products:', data); // Debugging received products
          this.products = data;
          this.totalProducts = this.products.length;
          this.sortProducts();   
          this.updatePagedProducts();
        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );
    }
  }
  
  
  

  // Sort the products by price or alphabetically
  sortProducts(): void {
    this.products = this.sortLogic(this.products);
    this.updatePagedProducts(); // Ensure we update the paged products after sorting
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
