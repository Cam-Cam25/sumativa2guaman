import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Report } from '../models/report.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly REPORTS_STORAGE_KEY = 'maintenance_reports';
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  public reports$ = this.reportsSubject.asObservable();
  
  constructor(private storageService: StorageService) {
    this.loadReports();
  }
  
  // Cargar reportes del almacenamiento
  private async loadReports(): Promise<void> {
    const reports = await this.storageService.getItem<Report[]>(this.REPORTS_STORAGE_KEY) || [];
    
    // Convertir las fechas de string a Date
    const reportsWithDates = reports.map(report => ({
      ...report,
      creationDate: new Date(report.creationDate)
    }));
    
    this.reportsSubject.next(reportsWithDates);
  }
  
  // Guardar reportes en almacenamiento
  private async saveReports(reports: Report[]): Promise<void> {
    await this.storageService.setItem(this.REPORTS_STORAGE_KEY, reports);
    this.reportsSubject.next([...reports]);
  }
  
  // Obtener todos los reportes
  getReports(): Observable<Report[]> {
    return this.reports$;
  }
  
  // Crear un nuevo reporte
  async createReport(report: Omit<Report, 'id' | 'creationDate'>): Promise<Report> {
    const currentReports = this.reportsSubject.value;
    
    // Generar ID único para el reporte
    const newId = `REP-${new Date().getTime()}`;
    
    const newReport: Report = {
      ...report,
      id: newId,
      creationDate: new Date()
    };
    
    await this.saveReports([newReport, ...currentReports]);
    
    return newReport;
  }
  
  // Obtener un reporte por ID
  async getReportById(id: string): Promise<Report | undefined> {
    const reports = this.reportsSubject.value;
    return reports.find(report => report.id === id);
  }
  
  // Actualizar un reporte existente
  async updateReport(updatedReport: Report): Promise<void> {
    const reports = this.reportsSubject.value;
    const index = reports.findIndex(report => report.id === updatedReport.id);
    
    if (index !== -1) {
      reports[index] = updatedReport;
      await this.saveReports(reports);
    }
  }
  
  // Eliminar un reporte
  async deleteReport(id: string): Promise<void> {
    const reports = this.reportsSubject.value;
    const filteredReports = reports.filter(report => report.id !== id);
    
    if (filteredReports.length !== reports.length) {
      await this.saveReports(filteredReports);
    }
  }
}