import { Component } from '@angular/core';
import { CategoriaActividad } from '../../data/actividad.model';

@Component({
  selector: 'app-filtros-actividad',
  imports: [],
  templateUrl: './filtros-actividad.html',
  styleUrl: './filtros-actividad.css',
})
export class FiltrosActividad {
  // Fase 1: filtros puramente visuales; en la siguiente fase emitirán la categoría seleccionada.
  protected readonly categorias: readonly CategoriaActividad[] = [
    'Cultura',
    'Gastronomía',
    'Transporte',
    'Ocio',
    'Alojamiento',
  ];
}
