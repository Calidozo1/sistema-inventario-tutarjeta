import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilService } from '../core/services/perfil.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  errorMsg = '';

  constructor(private router: Router, private perfilService: PerfilService) {}

  login() {
    this.perfilService.consultarPerfilPorCedula(this.usuario).subscribe({
      next: (perfil: any) => {
        if (perfil && perfil.contrasena === this.contrasena) {
          localStorage.setItem('perfilActivo', JSON.stringify(perfil));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMsg = 'Contraseña incorrecta';
        }
      },
      error: () => {
        this.errorMsg = 'Usuario no encontrado';
      }
    });
  }
}
