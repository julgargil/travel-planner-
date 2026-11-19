// La "forma" de una actividad dentro de un viaje: qué datos tiene.
// Vive en features/actividades/ porque solo la usa esta sección.

export type CategoriaActividad = 'Cultura' | 'Gastronomía' | 'Transporte' | 'Ocio' | 'Alojamiento';

export interface Actividad {
  id: number;
  viajeId: number;
  titulo: string;
  fecha: string; // Formato 'YYYY-MM-DD'
  hora: string; // Formato 'HH:MM' (ej. '10:00')
  categoria: CategoriaActividad;
  ubicacion: string;
  notas?: string;
  lat: number;
  lng: number;
}
