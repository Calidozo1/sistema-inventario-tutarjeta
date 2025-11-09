// typescript
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IncidenciaService } from '../services/incidencia.service';

@Component({
  selector: 'app-registrar-incidencia',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './registrar-incidencia.component.html'
})
export class RegistrarIncidenciaComponent {
  mensaje = '';
  formulario: FormGroup;
  incidencia: any;

  constructor(private fb: FormBuilder, private servicio: IncidenciaService) {
    this.formulario = this.fb.group({
      fechaIncidencia: ['', Validators.required],
      tipoIncidencia: ['', Validators.required],
      estadoIncidencia: ['', Validators.required],
      cedulaCliente: ['', Validators.required],
      comentarios: ['']
    });
  }

  registrar() {
    if (this.formulario.invalid) {
      this.mensaje = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.servicio.registrarIncidencia(this.formulario.value).subscribe({
      next: () => this.mensaje = 'Incidencia registrada exitosamente ✅',
      error: err => this.mensaje = 'Error: ' + err.error
    });
  }

  onSubmit() {

  }
}
