import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private apiUrl = 'http://localhost:8080/api/incidencias';

  constructor(private http: HttpClient) {}

  registrarIncidencia(incidencia: any): Observable<any> {
    return this.http.post(this.apiUrl, incidencia);
  }

  obtenerIncidencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
