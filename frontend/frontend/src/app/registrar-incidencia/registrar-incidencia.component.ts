
// typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IncidenciaService } from '../services/incidencia.service';

@Component({
  selector: 'app-registrar-incidencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-incidencia.component.html',
  styleUrls: ['./registrar-incidencia.component.css']
})
export class RegistrarIncidenciaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private incidenciaService: IncidenciaService) {
    this.form = this.fb.group({
      fechaIncidencia: ['', Validators.required],
      tipoIncidencia: ['', Validators.required],
      estadoIncidencia: ['', Validators.required],
      cedulaCliente: ['', Validators.required],
      comentarios: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.incidenciaService.registrarIncidencia(this.form.value).subscribe({
        next: () => alert('Incidencia registrada exitosamente'),
        error: (err: any) => alert('Error: ' + (err?.error?.message ?? err?.message ?? JSON.stringify(err)))
      });
    } else {
      alert('Complete los campos obligatorios');
    }
  }
}
