// La "forma" de un viaje: qué datos tiene.
// Está en shared/ porque la usan varias partes (cada gasto, tarea… pertenece a un viaje).

export interface Viaje {
  id: number;
  origen: string;
  destino: string;
  pais: string;
  fechas: string;
  dias: number;
  viajeros: number;
  estado: 'Próximo' | 'En curso' | 'Finalizado';
}
