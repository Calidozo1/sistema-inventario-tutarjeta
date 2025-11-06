import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-registrar-perfil',
  templateUrl: './registrar-perfil.component.html',
  standalone: true,
  imports: []
})
export class RegistrarPerfilComponent {
  perfil = {
    nombre: '', cedula: '', correo: '', rol: 'usuario',
    contrasena: '', confirmacionContrasena: ''
  };
  errorMsg = '';
  exitoMsg = '';

  constructor(private perfilService: PerfilService, private router: Router) {}

  registrar() {
    this.perfilService.registrarPerfil(this.perfil).subscribe({
      next: () => {
        this.exitoMsg = 'Perfil registrado correctamente';
        this.errorMsg = '';
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: err => {
        this.errorMsg = err.message;
        this.exitoMsg = '';
      }
    });
  }
}
