import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by-price-greater-than-equal',
  templateUrl: './filter-by-price-greater-than-equal.component.html',
  styleUrls: ['./filter-by-price-greater-than-equal.component.css']
})
export class FilterByPriceGreaterThanEqualComponent {
  @Output() filter = new EventEmitter<number>();

  filterByPriceGreaterThanEqual(price: string): void {
    const priceValue = parseFloat(price);
    if (!isNaN(priceValue)) {
      this.filter.emit(priceValue);
    }
  }
}
