import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { PerfilService } from '../core/services/perfil.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, ReactiveFormsModule],
  templateUrl: './mi-perfil.html',
  styleUrls: ['./mi-perfil.css']
})
export class MiPerfilComponent implements OnInit, OnDestroy {
  perfil: any = null;
  private sub: Subscription | null = null;
  edicionForm: FormGroup;
  editando: boolean = false;

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private fb: FormBuilder
  ) {
    this.edicionForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [''],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [''] // Opcional
    });
  }

  ngOnInit() {
    this.sub = this.authService.perfil$().subscribe(p => {
      this.perfil = p;
      if (p) {
        this.edicionForm.patchValue({
          nombre: p.nombre,
          telefono: p.telefono,
          correo: p.correo
        });
      }
    });
  }

  iniciarEdicion() {
    this.editando = true;
  }

  cancelarEdicion() {
    this.editando = false;
    if (this.perfil) {
      this.edicionForm.patchValue({
        nombre: this.perfil.nombre,
        telefono: this.perfil.telefono,
        correo: this.perfil.correo,
        contrasena: ''
      });
    }
  }

  guardarEdicion() {
    if (this.edicionForm.invalid) {
      alert('Por favor complete los campos requeridos correctamente.');
      return;
    }

    const datosActualizados = this.edicionForm.value;
    // Si la contraseña está vacía, no enviarla
    if (!datosActualizados.contrasena) {
      delete datosActualizados.contrasena;
    }

    this.perfilService.actualizarPerfil(this.perfil.id, datosActualizados).subscribe({
      next: (actualizado) => {
        this.perfil = { ...this.perfil, ...actualizado };
        this.authService.actualizarPerfilLocal(actualizado); // Método hipotético para actualizar estado local
        this.editando = false;
        alert('Perfil actualizado correctamente.');
      },
      error: (err) => {
        alert('Error al actualizar el perfil: ' + (err.error?.error || err.message));
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
