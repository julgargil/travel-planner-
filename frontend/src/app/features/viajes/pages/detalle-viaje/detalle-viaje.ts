import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VIAJES_EJEMPLO } from '../../data/datos-ejemplo';

@Component({
  selector: 'app-detalle-viaje',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './detalle-viaje.html',
  styleUrl: './detalle-viaje.css',
})
export class DetalleViaje {
  // Mantenemos la variable que dejó tu compañera intacta
  protected readonly viaje = VIAJES_EJEMPLO[0];
}