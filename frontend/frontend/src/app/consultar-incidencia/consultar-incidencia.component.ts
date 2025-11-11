import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../services/incidencia.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Incidencia } from '../models/incidencia.model';

@Component({
  selector: 'app-consultar-incidencia',
  templateUrl: './consultar-incidencia.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./consultar-incidencia.component.css']
})
export class ConsultarIncidenciaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  filtrosForm: FormGroup;

  constructor(private incidenciaService: IncidenciaService, private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      tipoIncidencia: [''],
      fechaDesde: [''],
      fechaHasta: ['']
    });
  }

  ngOnInit() {
    this.listarIncidencias();
  }

  listarIncidencias() {
    const { tipoIncidencia, fechaDesde, fechaHasta } = this.filtrosForm.value;
    this.incidenciaService.consultarIncidencias(tipoIncidencia, fechaDesde, fechaHasta)
      .subscribe({
        next: data => this.incidencias = data,
        error: err => alert('Error al consultar incidencias')
      });
  }
}
