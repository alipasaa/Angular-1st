import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Output() filterBetween = new EventEmitter<{ min: number, max: number }>();
  @Output() filterGreaterThanEqual = new EventEmitter<number>();
  @Output() filterLessThanEqual = new EventEmitter<number>();

  onFilterBetween(minPrice: string, maxPrice: string): void {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min) && !isNaN(max)) {
      this.filterBetween.emit({ min, max });
    }
  }

  onFilterGreaterThanEqual(price: string): void {
    const priceValue = parseFloat(price);
    if (!isNaN(priceValue)) {
      this.filterGreaterThanEqual.emit(priceValue);
    }
  }

  onFilterLessThanEqual(price: string): void {
    const priceValue = parseFloat(price);
    if (!isNaN(priceValue)) {
      this.filterLessThanEqual.emit(priceValue);
    }
  }
}
