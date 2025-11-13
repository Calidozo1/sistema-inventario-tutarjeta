// typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IncidenciaService } from '../services/incidencia.service';
import { Router } from '@angular/router';
import { TarjetaService, TarjetaDTO } from '../services/tarjeta.service';

@Component({
  selector: 'app-registrar-incidencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-incidencia.component.html',
  styleUrls: ['./registrar-incidencia.component.css']
})
export class RegistrarIncidenciaComponent {
  form: FormGroup;
  tarjetas: TarjetaDTO[] = [];

  constructor(private fb: FormBuilder, private incidenciaService: IncidenciaService, private router: Router, private tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      fechaIncidencia: ['', Validators.required],
      tipoIncidencia: ['', Validators.required],
      estadoIncidencia: ['', Validators.required],
      cedulaCliente: ['', Validators.required],
      comentarios: ['']
    });
  }

  ngOnInit(): void {
    this.tarjetaService.getTarjetas().subscribe({
      next: data => this.tarjetas = data,
      error: err => console.error('Error cargando tarjetas', err)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Preparar payload: si la fecha viene como string "YYYY-MM-DD" es compatible con LocalDate en backend
      const payload = {
        ...this.form.value,
        // opcional: agregar usuario si hay en app (por ahora no se provee)
      };

      this.incidenciaService.registrarIncidencia(payload).subscribe({
        next: () => {
          alert('Incidencia registrada exitosamente');
          // navegar de regreso al dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => alert('Error: ' + (err?.error?.message ?? err?.message ?? JSON.stringify(err)))
      });
    } else {
      alert('Complete los campos obligatorios');
    }
  }
}
