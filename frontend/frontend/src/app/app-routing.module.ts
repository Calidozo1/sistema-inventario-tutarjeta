
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ListarEmpleados } from './listar-empleados/listar-empleados';

const routes: Routes = [
  // TARJETAS
  {
    path: 'tarjetas',
    loadComponent: () =>
      import('./tarjetas/tarjetas-list/tarjetas-list.component').then(m => m.TarjetasListComponent),
  },
  {
    path: 'tarjetas/nueva',
    loadComponent: () =>
      import('./tarjetas/tarjetas-form/tarjetas-form.component').then(m => m.TarjetasFormComponent),
  },

  // VENTAS
  {
    path: 'ventas',
    loadComponent: () =>
      import('./ventas/ventas-list/ventas-list.component').then(m => m.VentasListComponent),
  },
  {
    path: 'ventas/nueva',
    loadComponent: () =>
      import('./ventas/ventas-form/ventas-form.component').then(m => m.VentasFormComponent),
  },

  // EMPLEADOS
  {
    path: 'gestionar-empleados',
    loadComponent: () =>
      import('./gestionar-empleados/gestionar-empleados').then(m => m.GestionarEmpleados),
    children: [
      {
        path: 'registrar',
        loadComponent: () =>
          import('./registrar-empleado/registrar-empleado').then(m => m.RegistrarEmpleado),
      },
      {
        path: 'listar',
        loadComponent: () =>
          import('./listar-empleados/listar-empleados').then(m => m.ListarEmpleados),
      },
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
    ],
  },

  // PERFIL
  { path: 'mi-perfil', component: MiPerfilComponent },

  // ADMIN - REGISTRAR PERFIL
  {
    path: 'registrar-perfil',
    loadComponent: () =>
      import('./registrar-perfil/registrar-perfil.component').then(m => m.RegistrarPerfilComponent),
  },

  // LOGIN / DASHBOARD
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },
  { path: 'dashboard', component: DashboardComponent },

  // CUALQUIER RUTA DESCONOCIDA
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
