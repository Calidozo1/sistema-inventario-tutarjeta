import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../core/services/perfil.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  perfil: any = null; // Inicializa a null

  constructor(private router: Router, private perfilService: PerfilService) {
    // Dejar la carga para ngOnInit
  }

  ngOnInit() {
    // Intentar obtener perfil del localStorage
    const perfilJson = localStorage.getItem('perfilActivo');
    if (perfilJson) {
      try {
        this.perfil = JSON.parse(perfilJson);
      } catch (e) {
        console.error('Error parseando perfilActivo:', e);
        this.perfil = null;
      }
    }

    // Si no hay perfil en localStorage, intentar obtenerlo del backend (opcional)
    if (!this.perfil) {
      // Redirigir a login si no hay perfil
      this.router.navigate(['/login']);
    }
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
    localStorage.removeItem('perfilActivo');
    console.log('Cerrando sesión');
    this.router.navigate(['/login']);
  }

  registrarIncidencia(): void {
    this.router.navigate(['/registrar-incidencia']);
  }
  consultarIncidencia(): void {
    this.router.navigate(['/consultar-incidencia']);
  }
}
