import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Viaje } from '../../../../shared/models/viaje';

@Component({
  selector: 'app-tarjeta-viaje',
  imports: [RouterLink],
  templateUrl: './tarjeta-viaje.html',
  styleUrl: './tarjeta-viaje.css',
})
export class TarjetaViaje {
  // El viaje que pinta esta tarjeta. Se lo pasa la lista: <app-tarjeta-viaje [viaje]="..." />
  readonly viaje = input.required<Viaje>();
}
