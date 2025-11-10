import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  perfil: any = {}; // Inicializa vacío

  constructor(private router: Router) {
    // Simulamos la carga desde BD o desde tu servicio de login
    this.cargarPerfil();
  }

  cargarPerfil() {
    // Esto debe venir de tu servicio que hace login
    // Aquí solo un ejemplo temporal
    this.perfil = {
      nombre: 'Admin',
      rol: 'admin',
      gestionarEmpleados: true
    };
  }

  verMiPerfil() {
    this.router.navigate(['/mi-perfil']);
  }

  registrarPerfil() {
    this.router.navigate(['/registrar-perfil']);
  }

  gestionarEmpleados() {
    this.router.navigate(['/gestionar-empleados']);
  }

  gestionarTarjetas() {
    this.router.navigate(['/tarjetas']);
  }

  gestionarVentas() {
    this.router.navigate(['/ventas']);
  }

  logout() {
    // Lógica real de logout
    console.log('Cerrando sesión');
    this.router.navigate(['/login']);
  }
}
