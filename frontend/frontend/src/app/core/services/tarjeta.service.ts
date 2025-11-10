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

  // ✅ Listar todas las tarjetas
  listarTarjetas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(this.apiUrl);
  }

  // ✅ Obtener una tarjeta por ID
  obtenerTarjeta(id: number): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(`${this.apiUrl}/${id}`);
  }

  // ✅ Registrar nueva tarjeta
  registrarTarjeta(tarjeta: TarjetaRequest): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(this.apiUrl, tarjeta);
  }

  // ✅ Filtrar tarjetas por código, tipo o estado
  filtrarTarjetas(filtros: { codigo?: string; tipo?: string; estado?: string }): Observable<Tarjeta[]> {
    let params = new HttpParams();
    if (filtros.codigo) params = params.set('codigo', filtros.codigo);
    if (filtros.tipo) params = params.set('tipo', filtros.tipo);
    if (filtros.estado) params = params.set('estado', filtros.estado);
    return this.http.get<Tarjeta[]>(`${this.apiUrl}/filtrar`, { params });
  }

  // ✅ Obtener solo tarjetas asignadas
  obtenerTarjetasAsignadas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.apiUrl}/asignadas`);
  }

  // ✅ Obtener solo tarjetas disponibles (no asignadas) usando filtrar
  obtenerTarjetasDisponibles(): Observable<Tarjeta[]> {
    return this.filtrarTarjetas({ estado: 'DISPONIBLE' });
  }
}
