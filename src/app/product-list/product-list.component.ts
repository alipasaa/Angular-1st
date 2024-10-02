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
  pagedProducts: Product[] = [];
  pageSize = 5; // Default page size
  currentPage = 0; // Current page index
  totalProducts = 0; // Total number of products
  isLoading = false; // Controls the loading spinner

  selectedFilter: string = 'none';
  greaterPrice: number | null = null;
  lessPrice: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedSortOrder: string = 'none';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Initialize the component
  }

  applySelectedFilter(): void {
    if (this.selectedFilter === 'greater') {
      this.filterByPriceGreaterThanEqual();
    } else if (this.selectedFilter === 'less') {
      this.filterByPriceLessThanEqual();
    } else if (this.selectedFilter === 'between') {
      this.filterByPriceBetween();
    }
  }

  isPriceValid(): boolean {
    if (this.selectedFilter === 'greater' && this.greaterPrice != null && this.greaterPrice > 0) {
      return true;
    }
    if (this.selectedFilter === 'less' && this.lessPrice != null && this.lessPrice > 0) {
      return true;
    }
    if (this.selectedFilter === 'between' && this.minPrice != null && this.maxPrice != null && this.minPrice > 0 && this.maxPrice > 0) {
      return true;
    }
    return false;
  }
    
  fetchProductsByGreaterThanEqual() {
    this.isLoading = true; // Start the spinner
    this.productService.getProductsByPriceGreaterThanEqual(this.greaterPrice!).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.totalProducts = this.products.length;
        this.updatePagedProducts();
        this.isLoading = false; // Stop the spinner
      },
      (error) => {
        console.error('Error fetching products', error);
        this.isLoading = false; // Stop the spinner even on error
      }
    );
  }

  fetchProductsByLessThanEqual() {
    this.isLoading = true; // Start the spinner
    this.productService.getProductsByPriceLessThanEqual(this.lessPrice!).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.totalProducts = this.products.length;
        this.updatePagedProducts();
        this.isLoading = false; // Stop the spinner
      },
      (error) => {
        console.error('Error fetching products', error);
        this.isLoading = false; // Stop the spinner even on error
      }
    );
  }

  fetchProductsByPriceBetween() {
    this.isLoading = true; // Start the spinner
    this.productService.getProductsByPriceBetween(this.minPrice!, this.maxPrice!).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.totalProducts = this.products.length;
        this.updatePagedProducts();
        this.isLoading = false; // Stop the spinner
      },
      (error) => {
        console.error('Error fetching products', error);
        this.isLoading = false; // Stop the spinner even on error
      }
    );
  }

  updatePagedProducts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedProducts();
  }

  filterByPriceGreaterThanEqual(): void {
    this.fetchProductsByGreaterThanEqual(); 
  }

  filterByPriceLessThanEqual(): void {
    this.fetchProductsByLessThanEqual(); 
  }

  filterByPriceBetween(): void {
    this.fetchProductsByPriceBetween(); 
  }

  sortProducts(): void {
    this.products = this.sortLogic(this.products);
    this.updatePagedProducts();
  }

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

  onFilterTypeChange(): void {
    this.resetFilterValues(); // Handle filter change
  }

  resetFilterValues(): void {
    this.greaterPrice = null;
    this.lessPrice = null;
    this.minPrice = null;
    this.maxPrice = null;
  }
}
