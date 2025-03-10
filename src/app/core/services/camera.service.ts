import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  
  constructor() { }
  
  async requestPermissions(): Promise<boolean> {
    try {
      const permission = await Camera.requestPermissions();
      return permission.camera === 'granted';
    } catch (error) {
      console.error('Error al solicitar permisos de cámara:', error);
      return false;
    }
  }
  
  async takePicture(): Promise<string | undefined> {
    try {
      // Solicitar permisos antes de intentar tomar una foto
      const hasPermission = await this.requestPermissions();
      
      if (!hasPermission) {
        throw new Error('No se tienen permisos de cámara');
      }
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      
      return image.dataUrl;
    } catch (error) {
      console.error('Error al tomar foto:', error);
      return undefined;
    }
  }
}