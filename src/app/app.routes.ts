import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full'
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/report-list/report-list.component').then(m => m.ReportListComponent)
  },
  {
    path: 'reports/new',
    loadComponent: () => import('./features/reports/report-form/report-form.component').then(m => m.ReportFormComponent)
  },
  {
    path: '**',
    redirectTo: 'reports'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }