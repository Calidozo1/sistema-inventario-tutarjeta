// ...existing code...
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado, EmpleadoRegistro } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) {}

  registrarEmpleado(empleado: EmpleadoRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, empleado);
  }

  consultarEmpleadoPorCedula(cedula: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/cedula/${cedula}`);
  }

  obtenerTodos(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/`);
  }
}

