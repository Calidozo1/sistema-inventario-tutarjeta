import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilService } from '../core/services/perfil.service';

@Component({
  selector: 'app-registrar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-perfil.html',
  styleUrl: './registrar-perfil.css',
})
export class RegistrarPerfil {
  perfil = {
    nombre: '',
    cedula: '',
    correo: '',
    rol: 'usuario',
    contrasena: '',
    confirmacionContrasena: ''
  };
  errorMsg = '';
  exitoMsg = '';

  constructor(private perfilService: PerfilService, private router: Router) {}

  registrar() {
    this.perfilService.registrarPerfil(this.perfil).subscribe({
      next: () => {
        this.exitoMsg = 'Perfil registrado correctamente';
        this.errorMsg = '';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err: any) => {
        this.errorMsg = err.message;
        this.exitoMsg = '';
      }
    });
  }
}
