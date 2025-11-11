import { Component, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../core/services/perfil.service';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnDestroy {
  perfil: any = null; // Inicializa a null
  private sub: Subscription | null = null;

  // permisos derivados
  isAdmin = false;
  isEmpleado = false;
  canManageEmpleados = false;
  canManageTarjetas = false;
  canManageVentas = false;
  canManageIncidencias = false;

  constructor(private router: Router, private perfilService: PerfilService, private authService: AuthService) {
    // Dejar la carga para ngOnInit
  }

  ngOnInit() {
    // Suscribirse al perfil desde AuthService (que consulta la BD)
    this.sub = this.authService.perfil$().subscribe(perfil => {
      this.perfil = perfil;
      this.computePermissions();
      if (!this.perfil) {
        this.router.navigate(['/login']);
      }
    });
  }

  private normalizeRole(r: any): string {
    return (r || '').toString().trim().toLowerCase();
  }

  private hasRoleAlias(role: any, aliases: string[]): boolean {
    const r = this.normalizeRole(role);
    return aliases.some(a => a.toLowerCase() === r);
  }

  private computePermissions() {
    const rol = this.perfil?.rol;
    // Aceptar variantes comunes de nombre de rol
    this.isAdmin = this.hasRoleAlias(rol, ['admin', 'administrador', 'administrator']);
    this.isEmpleado = this.hasRoleAlias(rol, ['empleado', 'employee', 'usuario', 'user']);

    // gestionarEmpleados también permite ciertas acciones (según backend)
    this.canManageEmpleados = this.isAdmin || !!this.perfil?.gestionarEmpleados;

    // Las acciones de ventas, tarjetas e incidencias las pueden hacer admin y empleado
    this.canManageTarjetas = this.isAdmin || this.isEmpleado;
    this.canManageVentas = this.isAdmin || this.isEmpleado;
    this.canManageIncidencias = this.isAdmin || this.isEmpleado;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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
    // Limpiar state de auth
    this.authService.clear();
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
