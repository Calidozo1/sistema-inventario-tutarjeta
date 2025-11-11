// frontend/frontend/src/app/app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';
import { ConsultarIncidenciaComponent} from "./consultar-incidencia/consultar-incidencia.component";

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
  },
  { path: 'registrar-incidencia', component: RegistrarIncidenciaComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
  {path : 'consultar-incidencia', component: ConsultarIncidenciaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
