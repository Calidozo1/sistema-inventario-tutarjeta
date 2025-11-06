import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: []
})
export class DashboardComponent {
  perfil: any = JSON.parse(localStorage.getItem('perfilActivo') || '{}');

  constructor(private router: Router) {}

  verMiPerfil() { this.router.navigate(['/mi-perfil']); }
  registrarPerfil() { this.router.navigate(['/registrar-perfil']); }
  logout() {
    localStorage.removeItem('perfilActivo');
    this.router.navigate(['/login']);
  }
}
