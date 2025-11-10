
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { RegistrarPerfil } from './registrar-perfil/registrar-perfil';
import { MiPerfil } from './mi-perfil/mi-perfil';
import { RegistrarEmpleado } from './registrar-empleado/registrar-empleado';
import { ListarEmpleados } from './listar-empleados/listar-empleados';
import { GestionarEmpleados } from './gestionar-empleados/gestionar-empleados';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'registrar-perfil', component: RegistrarPerfil },
  { path: 'mi-perfil', component: MiPerfil },
  {
    path: 'gestionar-empleados',
    component: GestionarEmpleados,
    children: [
      { path: 'registrar', component: RegistrarEmpleado },
      { path: 'listar', component: ListarEmpleados }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
