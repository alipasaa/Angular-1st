import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    BrowserAnimationsModule, // Required for Angular Material components
    MatSlideToggleModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
