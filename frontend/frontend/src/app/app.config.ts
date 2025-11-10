import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'tarjetas', loadComponent: () => import('./tarjetas/tarjetas-list/tarjetas-list.component').then(m => m.TarjetasListComponent) },
      { path: 'tarjetas/nueva', loadComponent: () => import('./tarjetas/tarjetas-form/tarjetas-form.component').then(m => m.TarjetasFormComponent) },
      { path: 'ventas', loadComponent: () => import('./ventas/ventas-list/ventas-list.component').then(m => m.VentasListComponent) },
      { path: 'ventas/nueva', loadComponent: () => import('./ventas/ventas-form/ventas-form.component').then(m => m.VentasFormComponent) },
    ]),
    provideAnimations(),
    provideHttpClient()
  ]
};
