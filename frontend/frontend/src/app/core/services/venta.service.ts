import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta, VentaRequest } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) { }

  listarVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  obtenerVenta(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  registrarVenta(venta: VentaRequest): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  filtrarVentas(filtros: any): Observable<Venta[]> {
    let params = new HttpParams();

    if (filtros.cliente) {
      params = params.set('cliente', filtros.cliente);
    }
    if (filtros.tarjeta) {
      params = params.set('tarjeta', filtros.tarjeta);
    }
    if (filtros.empleado) {
      params = params.set('empleado', filtros.empleado);
    }
    if (filtros.fecha) {
      params = params.set('fecha', filtros.fecha);
    }

    return this.http.get<Venta[]>(`${this.apiUrl}/filtrar`, { params });
  }
}
