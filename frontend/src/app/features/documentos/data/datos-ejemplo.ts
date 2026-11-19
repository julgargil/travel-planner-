// Datos de ejemplo SOLO para la interfaz.
// Cuando conectemos el backend, esto se sustituirá por los documentos reales.

import { Documento } from './documento.model';

export const DOCUMENTOS_EJEMPLO: Documento[] = [
  {
    id: 1,
    viajeId: 1,
    nombre: 'Billete avión Sevilla-Lisboa.pdf',
    tipo: 'application/pdf',
    tamano: 248_000,
    fechaSubida: '2027-05-02',
  },
  {
    id: 2,
    viajeId: 1,
    nombre: 'Reserva hotel Baixa-Chiado.pdf',
    tipo: 'application/pdf',
    tamano: 1_350_000,
    fechaSubida: '2027-05-04',
  },
  {
    id: 3,
    viajeId: 1,
    nombre: 'Entradas Oceanário.png',
    tipo: 'image/png',
    tamano: 512_000,
    fechaSubida: '2027-05-20',
  },
  {
    id: 4,
    viajeId: 1,
    nombre: 'Seguro de viaje.pdf',
    tipo: 'application/pdf',
    tamano: 96_000,
    fechaSubida: '2027-06-01',
  },
];
