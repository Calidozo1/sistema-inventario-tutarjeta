import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// ⭐ MATERIAL MODULES
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// ⭐ SERVICIOS
import { TarjetaService } from '../../core/services/tarjeta.service';

@Component({
  selector: 'app-tarjetas-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tarjetas-form.component.html',
  styleUrls: ['./tarjetas-form.component.css']
})
export class TarjetasFormComponent implements OnInit {
  tarjetaForm: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private tarjetaService: TarjetaService,
    private router: Router
  ) {
    this.tarjetaForm = this.fb.group({
      codigoUnico: ['', [Validators.required, Validators.minLength(3)]],
      tipoTarjeta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.tarjetaForm.valid) {
      this.cargando = true;

      const tarjetaRequest = {
        codigoUnico: this.tarjetaForm.value.codigoUnico,
        tipoTarjeta: this.tarjetaForm.value.tipoTarjeta
      };

      console.log('Enviando tarjeta:', tarjetaRequest);

      this.tarjetaService.registrarTarjeta(tarjetaRequest).subscribe(
        (response) => {
          console.log('Tarjeta registrada exitosamente:', response);
          this.cargando = false;
          alert('✅ Tarjeta registrada exitosamente');
          this.router.navigate(['/tarjetas']);
        },
        (error) => {
          this.cargando = false;
          console.error('Error al registrar tarjeta:', error);
          const mensaje = error.error?.message || 'No se pudo registrar la tarjeta';
          alert('❌ Error: ' + mensaje);
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/tarjetas']);
  }
}
