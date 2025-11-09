import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Perfil, PerfilRegistro } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:8080/api/perfiles';

  constructor(private http: HttpClient) {
  }

  registrarPerfil(perfil: PerfilRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, perfil)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  consultarPerfilPorCedula(cedula: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/perfiles/cedula/${cedula}`);
  }


  obtenerTodosLosPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.apiUrl}/`);
  }

  private handleError(error: any, caught?: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      } else if (error.error && error.error.mensaje) {
        errorMessage = error.error.mensaje;
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}

