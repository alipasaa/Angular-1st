import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByPriceGreaterThanEqualComponent } from './filter-by-price-greater-than-equal.component';

describe('FilterByPriceGreaterThanEqualComponent', () => {
  let component: FilterByPriceGreaterThanEqualComponent;
  let fixture: ComponentFixture<FilterByPriceGreaterThanEqualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByPriceGreaterThanEqualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByPriceGreaterThanEqualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
