import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private capturedPhotos: {url: string, timestamp: Date}[] = [];

  constructor() {}

  private async checkPermissions(): Promise<void> {
    try {
      const permissions = await Camera.checkPermissions();
      
      if (permissions.camera === 'prompt' || permissions.camera === 'denied') {
        await Camera.requestPermissions();
      }
    } catch (error) {
      console.log('Error verificando permisos:', error);
    }
  }

  async takePicture(): Promise<string> {
    try {
      await this.checkPermissions();
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        webUseInput: true
      });

      if (image.dataUrl) {
        const photoData = {
          url: image.dataUrl,
          timestamp: new Date()
        };
        this.capturedPhotos.unshift(photoData);
        return image.dataUrl;
      } else {
        throw new Error("No se obtuvo una imagen válida");
      }
    } catch (error) {
      console.error('Error tomando foto:', error);
      throw error;
    }
  }

  getCapturedPhotos() {
    return [...this.capturedPhotos];
  }
}