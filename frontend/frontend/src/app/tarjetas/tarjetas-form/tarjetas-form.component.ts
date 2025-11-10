import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// ⭐ MATERIAL MODULES
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TarjetaService } from '../../core/services/tarjeta.service';
import { TarjetaRequest } from '../../core/models/tarjeta.model';

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

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.tarjetaForm.valid) {
      const tarjetaRequest: TarjetaRequest = {
        codigoUnico: this.tarjetaForm.value.codigoUnico,
        tipoTarjeta: this.tarjetaForm.value.tipoTarjeta,
      };

      this.tarjetaService.registrarTarjeta(tarjetaRequest).subscribe({
        next: async () => {
          alert('✅ Tarjeta registrada correctamente');
          await this.router.navigate(['/tarjetas']); // 👈 usamos await
        },
        error: (err) => {
          console.error('❌ Error al registrar tarjeta:', err);
          alert('Error al registrar la tarjeta');
        }
      });
    }
  }

  async cancelar(): Promise<void> {
    await this.router.navigate(['/tarjetas']); // 👈 usamos await
  }

}
