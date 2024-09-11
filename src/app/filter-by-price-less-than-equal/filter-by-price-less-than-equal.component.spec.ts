import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByPriceLessThanEqualComponent } from './filter-by-price-less-than-equal.component';

describe('FilterByPriceLessThanEqualComponent', () => {
  let component: FilterByPriceLessThanEqualComponent;
  let fixture: ComponentFixture<FilterByPriceLessThanEqualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByPriceLessThanEqualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByPriceLessThanEqualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
