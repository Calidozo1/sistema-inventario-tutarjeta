import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ⭐ MATERIAL MODULES
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// ⭐ SERVICIOS Y MODELOS
import { VentaService } from '../../core/services/venta.service';
import { Venta } from '../../core/models/venta.model';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ventas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombreCliente', 'codigoTarjeta', 'nombreEmpleado', 'fechaVenta'];
  dataSource: MatTableDataSource<Venta>;

  constructor(private ventaService: VentaService) {
    this.dataSource = new MatTableDataSource<Venta>([]);
  }

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.ventaService.listarVentas().subscribe(
      (data) => {
        console.log('Ventas cargadas:', data);
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar ventas:', error);
      }
    );
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
