// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { ReportListComponent } from './features/reports/report-list/report-list.component';
import { ReportFormComponent } from './features/reports/report-form/report-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full'
  },
  {
    path: 'reports',
    component: ReportListComponent
  },
  {
    path: 'reports/new',
    component: ReportFormComponent
  },
  {
    path: '**',
    redirectTo: 'reports'
  }
];

