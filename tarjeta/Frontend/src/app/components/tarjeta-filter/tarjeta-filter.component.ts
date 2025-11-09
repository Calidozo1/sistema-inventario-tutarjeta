import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadoTarjeta } from '../../models/tarjeta.model';

export interface FiltroTarjeta {
  codigoUnico?: string;
  tipo?: string;
  estado?: EstadoTarjeta;
  usuarioAsignado?: string;
}

@Component({
  selector: 'app-tarjeta-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjeta-filter.component.html',
  styleUrls: ['./tarjeta-filter.component.css']
})
export class TarjetaFilterComponent {
  @Output() onFilter = new EventEmitter<FiltroTarjeta>();

  filtros: FiltroTarjeta = {
    codigoUnico: '',
    tipo: '',
    estado: undefined,
    usuarioAsignado: ''
  };

  estados = [
    { value: '', label: 'Todos' },
    ...Object.values(EstadoTarjeta).map(estado => ({ value: estado, label: estado }))
  ];

  aplicarFiltros() {
    const filtrosActivos: FiltroTarjeta = {};

    if (this.filtros.codigoUnico?.trim()) {
      filtrosActivos.codigoUnico = this.filtros.codigoUnico.trim();
    }
    if (this.filtros.tipo?.trim()) {
      filtrosActivos.tipo = this.filtros.tipo.trim();
    }
    if (this.filtros.estado) {
      filtrosActivos.estado = this.filtros.estado;
    }
    if (this.filtros.usuarioAsignado?.trim()) {
      filtrosActivos.usuarioAsignado = this.filtros.usuarioAsignado.trim();
    }

    this.onFilter.emit(filtrosActivos);
  }

  limpiarFiltros() {
    this.filtros = {
      codigoUnico: '',
      tipo: '',
      estado: undefined,
      usuarioAsignado: ''
    };
    this.onFilter.emit({});
  }
}
