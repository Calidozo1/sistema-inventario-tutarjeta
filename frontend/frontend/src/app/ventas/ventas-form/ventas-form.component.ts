import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { VentaService } from '../../core/services/venta.service';
import { TarjetaService } from '../../core/services/tarjeta.service';
import { Tarjeta } from '../../core/models/tarjeta.model';

@Component({
  selector: 'app-ventas-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './ventas-form.component.html',
  styleUrls: ['./ventas-form.component.css']
})
export class VentasFormComponent implements OnInit {
  ventaForm: FormGroup;
  tarjetasDisponibles: Tarjeta[] = [];
  tarjetasAsignadas: Tarjeta[] = [];
  cargando = false;
  cargandoTarjetas = true;
  empleadoId: number = 1; // TODO: reemplazar por el empleado logueado

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private tarjetaService: TarjetaService,
    private router: Router // ✅ inyectado correctamente
  ) {
    this.ventaForm = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      tarjetaId: ['', Validators.required],
      fechaVenta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('🔄 Cargando tarjetas disponibles...');
    this.cargarTarjetasDisponibles();
    this.cargarTarjetasAsignadas();
  }

  cargarTarjetasAsignadas(): void {
    this.tarjetaService.obtenerTarjetasAsignadas().subscribe(
      (data: Tarjeta[]) => {
        this.tarjetasAsignadas = data;
      },
      (error) => {
        console.error('❌ Error al cargar tarjetas asignadas:', error);
      }
    );
  }

  cargarTarjetasDisponibles(): void {
    console.log('🔄 Llamando a obtenerTarjetasDisponibles...');
    this.tarjetaService.obtenerTarjetasDisponibles().subscribe(
      (data: Tarjeta[]) => {
        this.tarjetasDisponibles = data;
        this.cargandoTarjetas = false;
        console.log('✅ Tarjetas disponibles:', data);
      },
      (error) => {
        this.cargandoTarjetas = false;
        console.error('❌ Error al cargar tarjetas disponibles:', error);
        alert('Error al cargar tarjetas disponibles');
      }
    );
  }

  onSubmit(): void {
    if (this.ventaForm.valid) {
      this.cargando = true;
      const ventaRequest = {
        nombreCliente: this.ventaForm.value.nombreCliente,
        tarjetaId: this.ventaForm.value.tarjetaId,
        empleadoId: this.empleadoId,
        fechaVenta: this.ventaForm.value.fechaVenta
      };

      console.log('Enviando venta:', ventaRequest);

      this.ventaService.registrarVenta(ventaRequest).subscribe(
        (response) => {
          console.log('✅ Venta registrada exitosamente:', response);
          this.cargando = false;
          alert('✅ Venta registrada exitosamente');
          this.router.navigate(['/ventas']);
        },
        (error) => {
          this.cargando = false;
          console.error('❌ Error al registrar venta:', error);
          const mensaje = error.error?.message || 'No se pudo registrar la venta';
          alert('❌ Error: ' + mensaje);
        }
      );
    }
  }

  async volver(): Promise<void> {
    try {
      const result = await this.router.navigate(['/dashboard']);
      if (result) {
        console.log('Navegación a ventas exitosa');
      } else {
        console.warn('No se navegó a ventas');
      }
    } catch (error: any) {
      console.error('Error al navegar a ventas:', error);
    }
  }
}
