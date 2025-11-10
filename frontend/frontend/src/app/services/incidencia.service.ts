// frontend/frontend/src/app/incidencia.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Incidencia} from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private baseUrl = 'http://localhost:8080/api/incidencias';

  constructor(private http: HttpClient) {
  }

  registrarIncidencia(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  consultarIncidencias(tipoIncidencia?: string, fechaDesde?: string, fechaHasta?: string): Observable<Incidencia[]> {
    let params = new HttpParams();
    if (tipoIncidencia) {
      params = params.set('tipoIncidencia', tipoIncidencia);
    }
    if (fechaDesde) {
      params = params.set('fechaDesde', fechaDesde);
    }
    if (fechaHasta) {
      params = params.set('fechaHasta', fechaHasta);
    }
    return this.http.get<Incidencia[]>(this.baseUrl, {params});
  }
}
