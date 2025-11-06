import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: []
})
export class LoginComponent {
  usuario = '';  // cedula o correo
  contrasena = '';
  errorMsg = '';

  constructor(private router: Router, private perfilService: PerfilService) {}

  login() {
    this.perfilService.consultarPerfilPorCedula(this.usuario).subscribe({
      next: perfil => {
        if (perfil && perfil.contrasena === this.contrasena) {
          localStorage.setItem('perfilActivo', JSON.stringify(perfil));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMsg = 'Contraseña incorrecta';
        }
      },
      error: () => { this.errorMsg = 'Usuario no encontrado'; }
    });
