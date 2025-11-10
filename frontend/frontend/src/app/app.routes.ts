import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { RegistrarPerfil } from './registrar-perfil/registrar-perfil';
import { MiPerfil } from './mi-perfil/mi-perfil';
import { RegistrarIncidenciaComponent } from './registrar-incidencia/registrar-incidencia.component';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'registrar-perfil', component: RegistrarPerfil },
  { path: 'mi-perfil', component: MiPerfil },
  { path: 'registrar-incidencia', component: RegistrarIncidenciaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
