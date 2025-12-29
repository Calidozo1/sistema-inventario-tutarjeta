import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../core/services/incidencia.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Incidencia } from '../core/models/incidencia.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-consultar-incidencia',
  standalone: true,
  templateUrl: './consultar-incidencia.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  styleUrls: ['./consultar-incidencia.component.css']
})
export class ConsultarIncidenciaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  filtrosForm: FormGroup;
  edicionForm: FormGroup;
  editandoId: number | null = null;
  canManageIncidencias: boolean = true;
  esAdmin: boolean = true; // Simula el rol de administrador

  constructor(private incidenciaService: IncidenciaService, private fb: FormBuilder, private router: Router) {
    this.filtrosForm = this.fb.group({
      tipoIncidencia: [''],
      fechaDesde: [''],
      fechaHasta: ['']
    });

    this.edicionForm = this.fb.group({
      estadoIncidencia: ['', Validators.required],
      comentarios: ['']
    });
  }

  ngOnInit() {
    this.listarIncidencias();
  }

  registrarIncidencia(): void {
    this.router.navigate(['/registrar-incidencia']);
  }

  volverAlDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  listarIncidencias() {
    const { tipoIncidencia, fechaDesde, fechaHasta } = this.filtrosForm.value;
    this.incidenciaService.consultarIncidencias(tipoIncidencia, fechaDesde, fechaHasta)
      .subscribe({
        next: data => this.incidencias = data,
        error: err => alert('Error al consultar incidencias')
      });
  }

  iniciarEdicion(incidencia: Incidencia) {
    this.editandoId = incidencia.id;
    this.edicionForm.setValue({
      estadoIncidencia: incidencia.estadoIncidencia,
      comentarios: incidencia.comentarios
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(id: number) {
    if (this.edicionForm.invalid) {
      alert('El estado no puede estar vacío.');
      return;
    }

    this.incidenciaService.actualizarIncidencia(id, this.edicionForm.value).subscribe({
      next: (actualizada) => {
        const index = this.incidencias.findIndex(i => i.id === id);
        if (index !== -1) {
          this.incidencias[index] = actualizada;
        }
        this.cancelarEdicion();
      },
      error: (err) => {
        if (err.status === 403) {
          alert('No tiene permisos para modificar una incidencia cerrada.');
        } else {
          alert('Error al actualizar la incidencia.');
        }
      }
    });
  }

  eliminarIncidencia(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta incidencia?')) {
      this.incidenciaService.eliminarIncidencia(id).subscribe({
        next: () => {
          this.incidencias = this.incidencias.filter(i => i.id !== id);
          alert('Incidencia eliminada correctamente.');
        },
        error: (err) => {
          alert('Error al eliminar la incidencia.');
        }
      });
    }
  }
}
