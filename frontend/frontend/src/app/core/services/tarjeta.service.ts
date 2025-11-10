import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta, TarjetaRequest } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:8080/api/tarjetas';

  constructor(private http: HttpClient) { }

  listarTarjetas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(this.apiUrl);
  }

  obtenerTarjeta(id: number): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(`${this.apiUrl}/${id}`);
  }

  registrarTarjeta(tarjeta: TarjetaRequest): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(this.apiUrl, tarjeta);
  }

  filtrarTarjetas(filtros: any): Observable<Tarjeta[]> {
    let params = new HttpParams();

    if (filtros.codigo) {
      params = params.set('codigo', filtros.codigo);
    }
    if (filtros.tipo) {
      params = params.set('tipo', filtros.tipo);
    }
    if (filtros.estado) {
      params = params.set('estado', filtros.estado);
    }

    return this.http.get<Tarjeta[]>(`${this.apiUrl}/filtrar`, { params });
  }

  //  IMPORTANTE: Obtener solo tarjetas asignadas
  obtenerTarjetasAsignadas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.apiUrl}/asignadas`);
  }
}
