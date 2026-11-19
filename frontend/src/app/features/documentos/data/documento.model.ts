// La "forma" de un documento subido a un viaje: qué datos tiene.
// Vive en features/documentos/ porque solo la usa esta sección.
// Los campos siguen la tabla `documento` de database/travel_planner_script.sql
// (la columna `ruta` no hace falta en la interfaz: solo la usa el backend).

export interface Documento {
  id: number;
  viajeId: number;
  nombre: string; // Nombre original del archivo, con extensión
  tipo: string; // Tipo MIME: 'application/pdf', 'image/png'…
  tamano: number; // Tamaño en bytes
  fechaSubida: string; // Formato 'YYYY-MM-DD'
}
