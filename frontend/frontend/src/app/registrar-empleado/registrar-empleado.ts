// ...existing code...
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../core/services/empleado.service';
import { EmpleadoRegistro } from '../core/models/empleado.model';

@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-empleado.html',
  styleUrl: './registrar-empleado.css'
})
export class RegistrarEmpleado {
  empleado: EmpleadoRegistro = { nombre: '', apellido: '', cedula: '', correo: '', rol: 'usuario' } as EmpleadoRegistro;
  errorMsg = '';
  exitoMsg = '';

  constructor(private empleadoService: EmpleadoService) {}

  registrar() {
    this.errorMsg = '';
    this.exitoMsg = '';
    this.empleadoService.registrarEmpleado(this.empleado).subscribe({
      next: (res) => {
        this.exitoMsg = res.mensaje || 'Empleado registrado';
        this.empleado = { nombre: '', apellido: '', cedula: '', correo: '', rol: 'usuario' } as EmpleadoRegistro;
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al registrar empleado';
      }
    });
  }
}

