import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByPriceBetweenComponent } from './filter-by-price-between.component';

describe('FilterByPriceBetweenComponent', () => {
  let component: FilterByPriceBetweenComponent;
  let fixture: ComponentFixture<FilterByPriceBetweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByPriceBetweenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByPriceBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
