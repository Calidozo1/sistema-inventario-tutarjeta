import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta, TarjetaRequest, TarjetaResponse, EstadoTarjeta } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:8080/api/tarjetas';

  constructor(private http: HttpClient) {}

  registrarTarjeta(tarjeta: TarjetaRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarjeta);
  }

  obtenerTodasLasTarjetas(): Observable<TarjetaResponse[]> {
    return this.http.get<TarjetaResponse[]>(this.apiUrl);
  }

  obtenerTarjetaPorId(id: number): Observable<TarjetaResponse> {
    return this.http.get<TarjetaResponse>(`${this.apiUrl}/${id}`);
  }

  obtenerTarjetasPorEstado(estado: EstadoTarjeta): Observable<TarjetaResponse[]> {
    return this.http.get<TarjetaResponse[]>(`${this.apiUrl}/estado/${estado}`);
  }

  buscarTarjetas(
    codigoUnico?: string,
    tipo?: string,
    estado?: EstadoTarjeta,
    usuarioAsignado?: string
  ): Observable<TarjetaResponse[]> {
    let params = new HttpParams();

    if (codigoUnico) params = params.set('codigoUnico', codigoUnico);
    if (tipo) params = params.set('tipo', tipo);
    if (estado) params = params.set('estado', estado);
    if (usuarioAsignado) params = params.set('usuarioAsignado', usuarioAsignado);

    return this.http.get<TarjetaResponse[]>(`${this.apiUrl}/buscar`, { params });
  }

  actualizarTarjeta(id: number, tarjeta: TarjetaRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tarjeta);
  }

  eliminarTarjeta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
