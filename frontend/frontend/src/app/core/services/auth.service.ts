import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { PerfilService } from './perfil.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cedulaSubject = new BehaviorSubject<string | null>(null);
  private perfilSubject = new BehaviorSubject<any | null>(null);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  constructor(private perfilService: PerfilService) {}

  setCedula(cedula: string) {
    this.cedulaSubject.next(cedula);
  }

  clear() {
    this.cedulaSubject.next(null);
    this.perfilSubject.next(null);
    this.isAdminSubject.next(false);
  }

  getCedula(): string | null {
    return this.cedulaSubject.value;
  }

  perfil$(): Observable<any | null> {
    return this.cedulaSubject.pipe(
      switchMap(cedula => {
        if (!cedula) {
          this.perfilSubject.next(null);
          this.isAdminSubject.next(false);
          return of(null);
        }
        return this.perfilService.consultarPerfilPorCedula(cedula).pipe(
          tap(perfil => {
            this.perfilSubject.next(perfil);
            // Determinar si es admin basado en el rol (case-insensitive)
            const esAdmin = perfil && perfil.rol && perfil.rol.toLowerCase() === 'admin';
            this.isAdminSubject.next(esAdmin);
          }),
          catchError(() => {
            this.perfilSubject.next(null);
            this.isAdminSubject.next(false);
            return of(null);
          })
        );
      })
    );
  }

  actualizarPerfilLocal(perfilActualizado: any) {
    this.perfilSubject.next(perfilActualizado);
    if (perfilActualizado) {
       const esAdmin = perfilActualizado.rol && perfilActualizado.rol.toLowerCase() === 'admin';
       this.isAdminSubject.next(esAdmin);
    }
  }

  // Nuevo método para verificar si es admin de forma reactiva
  isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
}
