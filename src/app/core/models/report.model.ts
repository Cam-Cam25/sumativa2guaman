export interface Report {
    id: string;         // ID único del reporte
    equipmentId: string; // ID del equipo inspeccionado
    description: string; // Descripción del problema
    photoUrls: string[]; // URLs de las fotos capturadas
    creationDate: Date;  // Fecha y hora de creación
    technician: string;  // Nombre del técnico
    status: 'Activo' | 'Completado' | 'Pendiente'; // Estado del reporte
  }