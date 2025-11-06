import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarPerfilComponent } from './registrar-perfil/registrar-perfil.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import {Routes} from '@angular/router';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registrar', component: RegistrarPerfilComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
