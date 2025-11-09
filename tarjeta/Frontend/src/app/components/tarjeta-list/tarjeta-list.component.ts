import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaResponse, EstadoTarjeta } from '../../models/tarjeta.model';
import { TarjetaFormComponent } from '../tarjeta-form/tarjeta-form.component';
import { TarjetaFilterComponent, FiltroTarjeta } from '../tarjeta-filter/tarjeta-filter.component';

@Component({
  selector: 'app-tarjeta-list',
  standalone: true,
  imports: [CommonModule, TarjetaFormComponent, TarjetaFilterComponent],
  templateUrl: './tarjeta-list.component.html',
  styleUrls: ['./tarjeta-list.component.css']
})
export class TarjetaListComponent implements OnInit {
  tarjetas: TarjetaResponse[] = [];
  mostrarFormulario: boolean = false;
  tarjetaSeleccionadaId?: number;
  isLoading: boolean = false;
  mensaje: string = '';
  error: string = '';

  constructor(private tarjetaService: TarjetaService) {}

  ngOnInit() {
    this.cargarTarjetas();
  }

  cargarTarjetas() {
    this.isLoading = true;
    this.tarjetaService.obtenerTodasLasTarjetas().subscribe({
      next: (data: TarjetaResponse[]) => {
        this.tarjetas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las tarjetas';
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros(filtros: FiltroTarjeta) {
    this.isLoading = true;
    this.tarjetaService.buscarTarjetas(
      filtros.codigoUnico,
      filtros.tipo,
      filtros.estado,
      filtros.usuarioAsignado
    ).subscribe({
      next: (data: TarjetaResponse[]) => {
        this.tarjetas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al buscar las tarjetas';
        this.isLoading = false;
      }
    });
  }

  nuevaTarjeta() {
    this.tarjetaSeleccionadaId = undefined;
    this.mostrarFormulario = true;
  }

  editarTarjeta(id: number) {
    this.tarjetaSeleccionadaId = id;
    this.mostrarFormulario = true;
  }

  eliminarTarjeta(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta tarjeta?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe({
        next: (response) => {
          this.mensaje = response.mensaje || 'Tarjeta eliminada exitosamente';
          this.cargarTarjetas();
          setTimeout(() => this.mensaje = '', 3000);
        },
        error: (err) => {
          this.error = err.error?.error || 'Error al eliminar la tarjeta';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  onFormularioSuccess() {
    this.mostrarFormulario = false;
    this.cargarTarjetas();
  }

  onFormularioCancel() {
    this.mostrarFormulario = false;
  }

  getEstadoClass(estado: EstadoTarjeta): string {
    switch (estado) {
      case EstadoTarjeta.DISPONIBLE:
        return 'estado-disponible';
      case EstadoTarjeta.ASIGNADO:
        return 'estado-asignado';
      case EstadoTarjeta.BLOQUEADO:
        return 'estado-bloqueado';
      case EstadoTarjeta.ELIMINADO:
        return 'estado-eliminado';
      default:
        return '';
    }
  }

  formatFecha(fecha?: Date): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleString('es-ES');
  }
}
