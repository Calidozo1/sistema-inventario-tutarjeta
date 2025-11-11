import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { PerfilService } from './perfil.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cedulaSubject = new BehaviorSubject<string | null>(null);

  constructor(private perfilService: PerfilService) {}

  setCedula(cedula: string) {
    this.cedulaSubject.next(cedula);
  }

  clear() {
    this.cedulaSubject.next(null);
  }

  getCedula(): string | null {
    return this.cedulaSubject.value;
  }

  // Exponer un observable que consulta el perfil en la base de datos cada vez que cambia la cédula
  perfil$(): Observable<any | null> {
    return this.cedulaSubject.pipe(
      switchMap(cedula => {
        if (!cedula) {
          return of(null);
        }
        return this.perfilService.consultarPerfilPorCedula(cedula).pipe(
          catchError(() => of(null))
        );
      })
    );
  }
}

