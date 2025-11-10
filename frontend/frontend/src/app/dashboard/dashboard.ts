import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  perfil: any = JSON.parse(localStorage.getItem('perfilActivo') || '{}');

  constructor(public router: Router) {}

  verMiPerfil() {
    this.router.navigate(['/mi-perfil']);
  }

  registrarPerfil() {
    this.router.navigate(['/registrar-perfil']);
  }

  logout() {
    localStorage.removeItem('perfilActivo');
    this.router.navigate(['/login']);
  }

  gestionarEmpleados() {
    this.router.navigate(['/gestionar-empleados']);
  }
}
