import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../core/services/report.service';
import { Report } from '../../../core/models/report.model';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];
  isLoading = true;
  
  constructor(
    private router: Router,
    private reportService: ReportService
  ) {}
  
  ngOnInit(): void {
    this.loadReports();
  }
  
  loadReports(): void {
    this.isLoading = true;
    this.reportService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports.sort((a, b) => 
          b.creationDate.getTime() - a.creationDate.getTime()
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar reportes:', error);
        this.isLoading = false;
      }
    });
  }
  
  navigateToNewReport(): void {
    this.router.navigate(['/reports/new']);
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Esta función podría expandirse para ver detalles del reporte
  viewReportDetails(reportId: string): void {
    this.router.navigate(['/reports', reportId]);
  }
}