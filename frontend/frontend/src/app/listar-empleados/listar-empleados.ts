// ...existing code...
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../core/services/empleado.service';
import { Empleado } from '../core/models/empleado.model';

@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-empleados.html',
  styleUrl: './listar-empleados.css'
})
export class ListarEmpleados {
  empleados: Empleado[] = [];
  errorMsg = '';

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.obtenerTodos().subscribe({
      next: (data) => this.empleados = data,
      error: () => this.errorMsg = 'Error al cargar empleados'
    });
  }
}

