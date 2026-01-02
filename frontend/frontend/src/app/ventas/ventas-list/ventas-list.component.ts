import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombreCliente', 'codigoTarjeta', 'nombreEmpleado', 'fechaVenta', 'acciones'];
  dataSource: MatTableDataSource<Venta> = new MatTableDataSource<Venta>([]);

  edicionForm: FormGroup;
  editandoId: number | null = null;

  constructor(
    private ventaService: VentaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.edicionForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      fechaVenta: ['', Validators.required]
    });
  }

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

  iniciarEdicion(venta: Venta) {
    this.editandoId = venta.id;
    this.edicionForm.setValue({
      nombreCliente: venta.nombreCliente,
      fechaVenta: venta.fechaVenta
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(id: number) {
    if (this.edicionForm.invalid) return;

    this.ventaService.actualizarVenta(id, this.edicionForm.value).subscribe({
      next: (actualizada) => {
        const index = this.dataSource.data.findIndex(v => v.id === id);
        if (index !== -1) {
          this.dataSource.data[index] = actualizada;
          this.dataSource._updateChangeSubscription();
        }
        this.cancelarEdicion();
        alert('Venta actualizada correctamente.');
      },
      error: (err) => alert('Error al actualizar venta.')
    });
  }

  eliminarVenta(id: number) {
    if (confirm('¿Está seguro de eliminar esta venta?')) {
      this.ventaService.eliminarVenta(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(v => v.id !== id);
          alert('Venta eliminada correctamente.');
        },
        error: (err) => alert('Error al eliminar venta.')
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard']);
  }
}
