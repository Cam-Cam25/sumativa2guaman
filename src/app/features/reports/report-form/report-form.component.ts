import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CameraService } from '../../../core/services/camera.service';
import { ReportService } from '../../../core/services/report.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  reportForm!: FormGroup;
  capturedPhotos: string[] = [];
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cameraService: CameraService,
    private reportService: ReportService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.reportForm = this.fb.group({
      equipmentId: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      technician: ['', [Validators.required]]
    });
  }
  
  async takePicture(): Promise<void> {
    try {
      const photoDataUrl = await this.cameraService.takePicture();
      
      if (photoDataUrl) {
        this.capturedPhotos.push(photoDataUrl);
      }
    } catch (error) {
      console.error('Error al capturar foto:', error);
      // Aquí podrías mostrar un mensaje al usuario
    }
  }
  
  removePhoto(index: number): void {
    this.capturedPhotos.splice(index, 1);
  }
  
  async submitReport(): Promise<void> {
    if (this.reportForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.reportForm.controls).forEach(key => {
        this.reportForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    if (this.capturedPhotos.length === 0) {
      alert('Debe capturar al menos una foto');
      return;
    }
    
    this.isSubmitting = true;
    
    try {
      await this.reportService.createReport({
        equipmentId: this.reportForm.value.equipmentId,
        description: this.reportForm.value.description,
        photoUrls: this.capturedPhotos,
        technician: this.reportForm.value.technician,
        status: 'Activo'
      });
      
      // Redirigir a la lista de reportes tras éxito
      this.router.navigate(['/reports']);
    } catch (error) {
      console.error('Error al guardar reporte:', error);
      // Aquí podrías mostrar un mensaje al usuario
    } finally {
      this.isSubmitting = false;
    }
  }
}