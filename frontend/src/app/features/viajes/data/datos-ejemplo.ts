// Datos de ejemplo SOLO para la interfaz.
// Cuando conectemos el backend, esto se sustituirá por los viajes reales.

import { Viaje } from '../../../shared/models/viaje';

export const VIAJES_EJEMPLO: Viaje[] = [
  { id: 1, origen: 'Sevilla', destino: 'Lisboa', pais: 'Portugal', fechas: '12 – 16 jun 2027', dias: 5, viajeros: 2, estado: 'Próximo' },
  { id: 2, origen: 'Sevilla', destino: 'Roma', pais: 'Italia', fechas: '8 – 14 ago 2027', dias: 7, viajeros: 4, estado: 'Próximo' },
  { id: 3, origen: 'Sevilla', destino: 'París', pais: 'Francia', fechas: '18 – 22 sep 2026', dias: 5, viajeros: 2, estado: 'Finalizado' },
  { id: 4, origen: 'Sevilla', destino: 'Barcelona', pais: 'España', fechas: '3 – 6 may 2026', dias: 4, viajeros: 3, estado: 'Finalizado' },
];
