import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Guardar datos en LocalStorage
   */
  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error al guardar en LocalStorage:', error);
    }
  }

  /**
   * Obtener datos de LocalStorage
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      console.error('Error al leer de LocalStorage:', error);
      return null;
    }
  }

  /**
   * Eliminar un item de LocalStorage
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpiar todo el LocalStorage
   */
  clear(): void {
    localStorage.clear();
  }
}
