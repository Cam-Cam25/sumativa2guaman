import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }
  
  // Guardar datos en localStorage
  async setItem(key: string, value: any): Promise<void> {
    try {
      await localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  }
  
  // Obtener datos de localStorage
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return null;
    }
  }
  
  // Eliminar datos de localStorage
  async removeItem(key: string): Promise<void> {
    try {
      await localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  }
}