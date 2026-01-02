import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../core/services/empleado.service';
import { AuthService } from '../core/services/auth.service';
import { Empleado } from '../core/models/empleado.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listar-empleados.html',
  styleUrl: './listar-empleados.css'
})
export class ListarEmpleados implements OnInit {
  empleados: Empleado[] = [];
  errorMsg = '';
  esAdmin: boolean = false;

  edicionForm: FormGroup;
  editandoId: number | null = null;

  constructor(
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.edicionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      rol: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.cargarEmpleados();
    this.authService.isAdmin$().subscribe(isAdmin => this.esAdmin = isAdmin);
  }

  cargarEmpleados() {
    this.empleadoService.obtenerTodos().subscribe({
      next: (data) => this.empleados = data,
      error: () => this.errorMsg = 'Error al cargar empleados'
    });
  }

  iniciarEdicion(empleado: Empleado) {
    this.editandoId = empleado.id;
    this.edicionForm.setValue({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      rol: empleado.rol,
      correo: empleado.correo
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(id: number) {
    if (this.edicionForm.invalid) return;

    this.empleadoService.actualizarEmpleado(id, this.edicionForm.value).subscribe({
      next: (actualizado) => {
        const index = this.empleados.findIndex(e => e.id === id);
        if (index !== -1) {
          this.empleados[index] = actualizado;
        }
        this.cancelarEdicion();
        alert('Empleado actualizado correctamente.');
      },
      error: (err) => alert('Error al actualizar empleado: ' + (err.error?.error || err.message))
    });
  }

  eliminarEmpleado(id: number) {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(e => e.id !== id);
          alert('Empleado eliminado correctamente.');
        },
        error: (err) => alert('Error al eliminar empleado.')
      });
    }
  }
}
