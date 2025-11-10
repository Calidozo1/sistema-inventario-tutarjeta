// frontend/frontend/src/app/app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'consultar-incidencia',
    loadComponent: () =>
      import('./consultar-incidencia/consultar-incidencia.component')
        .then(m => m.ConsultarIncidenciaComponent)
  },
  { path: 'registrar-incidencia', component: RegistrarIncidenciaComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
