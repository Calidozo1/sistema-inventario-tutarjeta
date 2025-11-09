import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from '../../services/tarjeta.service';
import { EstadoTarjeta, TarjetaRequest, TarjetaResponse } from '../../models/tarjeta.model';

@Component({
  selector: 'app-tarjeta-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjeta-form.component.html',
  styleUrls: ['./tarjeta-form.component.css']
})
export class TarjetaFormComponent implements OnInit {
  @Input() tarjetaId?: number;
  @Output() onSubmitSuccess = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  tarjeta: TarjetaRequest = {
    codigoUnico: '',
    tipo: '',
    estado: EstadoTarjeta.DISPONIBLE,
    usuarioAsignado: ''
  };

  estados = Object.values(EstadoTarjeta);
  mensaje: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private tarjetaService: TarjetaService) {}

  ngOnInit() {
    if (this.tarjetaId) {
      this.cargarTarjeta();
    }
  }

  cargarTarjeta() {
    if (!this.tarjetaId) return;

    this.isLoading = true;
    this.tarjetaService.obtenerTarjetaPorId(this.tarjetaId).subscribe({
      next: (data: TarjetaResponse) => {
        this.tarjeta = {
          codigoUnico: data.codigoUnico,
          tipo: data.tipo,
          estado: data.estado,
          usuarioAsignado: data.usuarioAsignado
        };
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la tarjeta';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    this.mensaje = '';
    this.error = '';
    this.isLoading = true;

    if (this.tarjetaId) {
      this.tarjetaService.actualizarTarjeta(this.tarjetaId, this.tarjeta).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje || 'Tarjeta actualizada exitosamente';
          this.isLoading = false;
          setTimeout(() => {
            this.onSubmitSuccess.emit();
          }, 1500);
        },
        error: (err) => {
          this.error = err.error?.error || 'Error al actualizar la tarjeta';
          this.isLoading = false;
        }
      });
    } else {
      this.tarjetaService.registrarTarjeta(this.tarjeta).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje || 'Tarjeta registrada exitosamente';
          this.isLoading = false;
          this.resetForm();
          setTimeout(() => {
            this.onSubmitSuccess.emit();
          }, 1500);
        },
        error: (err) => {
          this.error = err.error?.error || 'Error al registrar la tarjeta';
          this.isLoading = false;
        }
      });
    }
  }

  resetForm() {
    this.tarjeta = {
      codigoUnico: '',
      tipo: '',
      estado: EstadoTarjeta.DISPONIBLE,
      usuarioAsignado: ''
    };
  }

  cancelar() {
    this.onCancel.emit();
  }
}
