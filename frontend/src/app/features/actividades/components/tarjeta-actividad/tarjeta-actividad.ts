import { Component, input } from '@angular/core';
import { Actividad } from '../../data/actividad.model';

@Component({
  selector: 'app-tarjeta-actividad',
  imports: [],
  templateUrl: './tarjeta-actividad.html',
  styleUrl: './tarjeta-actividad.css',
})
export class TarjetaActividad {
  // La actividad que pinta esta tarjeta. Se la pasa la lista: <app-tarjeta-actividad [actividad]="..." />
  readonly actividad = input.required<Actividad>();
}
