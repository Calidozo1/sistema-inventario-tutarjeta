import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ⭐ MATERIAL MODULES
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.css']
})
export class TarjetasListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigoUnico', 'tipoTarjeta', 'estado'];
  dataSource: MatTableDataSource<Tarjeta> = new MatTableDataSource<Tarjeta>([]);

  constructor(
    private tarjetaService: TarjetaService,
    private router: Router // ✅ inyectado correctamente
  ) {}

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
