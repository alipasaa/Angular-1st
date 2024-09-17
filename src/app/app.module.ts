import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  { path: '', component: ProductListComponent },  // Define routes here
  // Add more routes if needed
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFilterComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,      
    MatOptionModule,      
    MatFormFieldModule,   
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatChipsModule,
    MatIconModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
