import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Actividades } from '../../../actividades/actividades';
import { Documentos } from '../../../documentos/documentos';
import { Gastos } from '../../../gastos/gastos';
import { Tareas } from '../../../tareas/tareas';
import { VIAJES_EJEMPLO } from '../../data/datos-ejemplo';

@Component({
  selector: 'app-detalle-viaje',
  imports: [RouterLink, Actividades, Tareas, Gastos, Documentos],
  templateUrl: './detalle-viaje.html',
  styleUrl: './detalle-viaje.css',
})
export class DetalleViaje {
  // Solo interfaz: de momento siempre enseña el primer viaje de ejemplo.
  protected readonly viaje = VIAJES_EJEMPLO[0];
}
