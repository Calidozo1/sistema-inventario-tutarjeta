import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';

import { VentaService } from '../../core/services/venta.service';
import { Venta } from '../../core/models/venta.model';

@Component({
  selector: 'app-ventas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
  dataSource: MatTableDataSource<Venta> = new MatTableDataSource<Venta>([]);

  constructor(
    private ventaService: VentaService,
    private router: Router // ✅ Aquí inyectamos correctamente el Router
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.ventaService.listarVentas().subscribe(
      (ventas) => {
        this.dataSource.data = ventas;
      },
      (error) => {
        console.error('❌ Error al cargar ventas:', error);
      }
    );
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  cancelar(): void {
    this.router.navigate(['/dashboard']); // ✅ Navega correctamente al dashboard
  }
}
