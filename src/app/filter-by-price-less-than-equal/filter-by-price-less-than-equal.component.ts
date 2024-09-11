import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by-price-less-than-equal',
  templateUrl: './filter-by-price-less-than-equal.component.html',
  styleUrls: ['./filter-by-price-less-than-equal.component.css']
})
export class FilterByPriceLessThanEqualComponent {
  @Output() filter = new EventEmitter<number>();

  filterByPriceLessThanEqual(price: string): void {
    const priceValue = parseFloat(price);
    if (!isNaN(priceValue)) {
      this.filter.emit(priceValue);
    }
  }
}
