import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterByPriceBetweenComponent } from './filter-by-price-between/filter-by-price-between.component';
import { FilterByPriceGreaterThanEqualComponent } from './filter-by-price-greater-than-equal/filter-by-price-greater-than-equal.component';
import { FilterByPriceLessThanEqualComponent } from './filter-by-price-less-than-equal/filter-by-price-less-than-equal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button'; 


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    FilterByPriceBetweenComponent,
    FilterByPriceGreaterThanEqualComponent,
    FilterByPriceLessThanEqualComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Import RouterModule and configure routes
    MatButtonModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync() // Enable fetch API for HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
