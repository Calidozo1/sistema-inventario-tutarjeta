import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TarjetaDTO {
  id: number;
  codigoUnico: string;
  tipoTarjeta: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class TarjetaService {
  private baseUrl = '/api/tarjetas';

  constructor(private http: HttpClient) {}

  getTarjetas(): Observable<TarjetaDTO[]> {
    return this.http.get<TarjetaDTO[]>(this.baseUrl);
  }

  getTarjetasAsignadas(): Observable<TarjetaDTO[]> {
    return this.http.get<TarjetaDTO[]>(`${this.baseUrl}/asignadas`);
  }
}

