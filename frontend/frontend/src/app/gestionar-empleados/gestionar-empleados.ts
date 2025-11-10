import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestionar-empleados.html',
  styleUrl: './gestionar-empleados.css'
})
export class GestionarEmpleados {
  constructor(private router: Router) {}

  irRegistrar() { this.router.navigate(['/gestionar-empleados/registrar']); }
  irListar() { this.router.navigate(['/gestionar-empleados/listar']); }
}

