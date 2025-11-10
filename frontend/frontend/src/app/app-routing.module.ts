import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { VentasListComponent } from './ventas/ventas-list/ventas-list.component';
import { VentasFormComponent } from './ventas/ventas-form/ventas-form.component';

const routes: Routes = [
  // TARJETAS
  { path: 'tarjetas', loadComponent: () => import('./tarjetas/tarjetas-list/tarjetas-list.component').then(m => m.TarjetasListComponent) },
  { path: 'tarjetas/nueva', loadComponent: () => import('./tarjetas/tarjetas-form/tarjetas-form.component').then(m => m.TarjetasFormComponent) },

  // VENTAS
  { path: 'ventas', loadComponent: () => import('./ventas/ventas-list/ventas-list.component').then(m => m.VentasListComponent) },   // LISTA DE VENTAS
  { path: 'ventas/nueva', loadComponent: () => import('./ventas/ventas-form/ventas-form.component').then(m => m.VentasFormComponent) }, // FORMULARIO DE NUEVA VENTA

  // LOGIN / DASHBOARD
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },

  // RUTA POR DEFECTO PARA VENTAS (alternativa, por si cargas componentes directos)
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
