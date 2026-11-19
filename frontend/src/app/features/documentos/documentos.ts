import { Component } from '@angular/core';
import { Documento } from './data/documento.model';
import { DOCUMENTOS_EJEMPLO } from './data/datos-ejemplo';

@Component({
  imports: [],
  selector: 'app-documentos',
  styleUrl: './documentos.css',
  templateUrl: './documentos.html',
})
export class Documentos {
  // Copia de los datos de ejemplo: así borrar no modifica la lista original.
  // Fase 1: al recargar la página vuelven a aparecer todos.
  documentos: Documento[] = [...DOCUMENTOS_EJEMPLO];

  borrar(id: number): void {
    this.documentos = this.documentos.filter((d) => d.id !== id);
  }

  // 'application/pdf' → 'PDF', 'image/png' → 'Imagen'
  etiquetaTipo(tipo: string): string {
    if (tipo === 'application/pdf') {
      return 'PDF';
    }
    if (tipo.startsWith('image/')) {
      return 'Imagen';
    }
    return 'Archivo';
  }

  // 248000 → '248 KB', 1350000 → '1,4 MB'
  formatoTamano(bytes: number): string {
    if (bytes < 1_000_000) {
      return `${Math.round(bytes / 1000)} KB`;
    }
    return `${(bytes / 1_000_000).toFixed(1).replace('.', ',')} MB`;
  }

  // '2027-05-02' → '2 may 2027'
  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${dia} ${meses[mes - 1]} ${anio}`;
  }
}
