import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import {RegistrarIncidenciaComponent} from './registrar-incidencia/registrar-incidencia.component';
import { ConsultarIncidenciaComponent } from './consultar-incidencia/consultar-incidencia.component';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'registrar-incidencia', component: RegistrarIncidenciaComponent },
  { path: 'consultar-incidencia', component: ConsultarIncidenciaComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
