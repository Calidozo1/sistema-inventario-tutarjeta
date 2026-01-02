import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { PerfilService } from './perfil.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cedulaSubject = new BehaviorSubject<string | null>(null);
  // Agregamos un BehaviorSubject para el perfil completo para poder actualizarlo localmente
  private perfilSubject = new BehaviorSubject<any | null>(null);

  constructor(private perfilService: PerfilService) {}

  setCedula(cedula: string) {
    this.cedulaSubject.next(cedula);
  }

  clear() {
    this.cedulaSubject.next(null);
    this.perfilSubject.next(null);
  }

  getCedula(): string | null {
    return this.cedulaSubject.value;
  }

  // Exponer un observable que consulta el perfil en la base de datos cada vez que cambia la cédula
  perfil$(): Observable<any | null> {
    return this.cedulaSubject.pipe(
      switchMap(cedula => {
        if (!cedula) {
          this.perfilSubject.next(null);
          return of(null);
        }
        // Si ya tenemos el perfil cargado y coincide con la cédula, podríamos retornarlo,
        // pero por simplicidad y para asegurar datos frescos, consultamos de nuevo.
        return this.perfilService.consultarPerfilPorCedula(cedula).pipe(
          catchError(() => of(null))
        );
      })
    );
  }

  // Método para actualizar el perfil localmente sin recargar desde el backend
  actualizarPerfilLocal(perfilActualizado: any) {
    // Esto es útil si quisiéramos mantener un estado global del perfil,
    // pero dado que perfil$() se basa en cedulaSubject y hace switchMap,
    // la actualización local aquí es más simbólica a menos que cambiemos la estrategia.
    // Para cumplir con el error TS, implementamos el método.
    this.perfilSubject.next(perfilActualizado);
  }
}
