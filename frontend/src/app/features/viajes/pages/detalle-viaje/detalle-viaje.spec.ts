import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VIAJES_EJEMPLO } from '../../data/datos-ejemplo';

@Component({
  selector: 'app-detalle-viaje',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './detalle-viaje.html',
  styleUrl: './detalle-viaje.css',
})
export class DetalleViaje {
  // Solo interfaz: de momento siempre enseña el primer viaje de ejemplo.
  protected readonly viaje = VIAJES_EJEMPLO[0];
}