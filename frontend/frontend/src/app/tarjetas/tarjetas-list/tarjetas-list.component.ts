import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// ⭐ MATERIAL MODULES
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

// ⭐ SERVICIOS Y MODELOS
import { TarjetaService } from '../../core/services/tarjeta.service';
import { Tarjeta } from '../../core/models/tarjeta.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tarjetas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.css']
})
export class TarjetasListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigoUnico', 'tipoTarjeta', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Tarjeta> = new MatTableDataSource<Tarjeta>([]);

  edicionForm: FormGroup;
  editandoId: number | null = null;

  constructor(
    private tarjetaService: TarjetaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.edicionForm = this.fb.group({
      tipoTarjeta: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void {
    this.tarjetaService.listarTarjetas().subscribe(
      (data) => {
        console.log('Tarjetas cargadas:', data);
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar tarjetas:', error);
      }
    );
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  iniciarEdicion(tarjeta: Tarjeta) {
    this.editandoId = tarjeta.id;
    this.edicionForm.setValue({
      tipoTarjeta: tarjeta.tipoTarjeta,
      estado: tarjeta.estado
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(id: number) {
    if (this.edicionForm.invalid) return;

    this.tarjetaService.actualizarTarjeta(id, this.edicionForm.value).subscribe({
      next: (actualizada) => {
        const index = this.dataSource.data.findIndex(t => t.id === id);
        if (index !== -1) {
          this.dataSource.data[index] = actualizada;
          this.dataSource._updateChangeSubscription(); // Refrescar tabla
        }
        this.cancelarEdicion();
        alert('Tarjeta actualizada correctamente.');
      },
      error: (err) => alert('Error al actualizar tarjeta.')
    });
  }

  eliminarTarjeta(id: number) {
    if (confirm('¿Está seguro de eliminar esta tarjeta?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(t => t.id !== id);
          alert('Tarjeta eliminada correctamente.');
        },
        error: (err) => alert('Error al eliminar tarjeta.')
      });
    }
  }

  async cancelar(): Promise<void> {
    try {
      const result = await this.router.navigate(['/dashboard']);
      if (result) {
        console.log('Navegación a dashboard exitosa');
      } else {
        console.warn('No se navegó a dashboard');
      }
    } catch (error: any) {
      console.error('Error al navegar a dashboard:', error);
    }
  }
}
