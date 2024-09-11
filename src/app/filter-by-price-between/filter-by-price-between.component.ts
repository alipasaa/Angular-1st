import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by-price-between',
  templateUrl: './filter-by-price-between.component.html',
  styleUrls: ['./filter-by-price-between.component.css']
})
export class FilterByPriceBetweenComponent {
  @Output() filter = new EventEmitter<{ minPrice: number, maxPrice: number }>();

  filterByPriceBetween(minPrice: string, maxPrice: string): void {
    const minPriceValue = parseFloat(minPrice);
    const maxPriceValue = parseFloat(maxPrice);
    if (!isNaN(minPriceValue) && !isNaN(maxPriceValue)) {
      this.filter.emit({ minPrice: minPriceValue, maxPrice: maxPriceValue });
    }
  }
}
