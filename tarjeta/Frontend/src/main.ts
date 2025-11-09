import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TarjetaListComponent } from './app/components/tarjeta-list/tarjeta-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarjetaListComponent],
  template: `<app-tarjeta-list></app-tarjeta-list>`
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([])
  ]
});
