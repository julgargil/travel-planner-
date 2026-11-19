import { Component } from '@angular/core';
import { CategoriaActividad } from '../../data/actividad.model';

@Component({
  selector: 'app-formulario-actividad',
  imports: [],
  templateUrl: './formulario-actividad.html',
  styleUrl: './formulario-actividad.css',
})
export class FormularioActividad {
  // Fase 1: formulario puramente visual; en la siguiente fase recogerá y enviará los datos.
  protected readonly categorias: readonly CategoriaActividad[] = [
    'Cultura',
    'Gastronomía',
    'Transporte',
    'Ocio',
    'Alojamiento',
  ];
}
