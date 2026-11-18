import { Component } from '@angular/core';
import { TarjetaViaje } from '../../components/tarjeta-viaje/tarjeta-viaje';
import { VIAJES_EJEMPLO } from '../../data/datos-ejemplo';

@Component({
  selector: 'app-lista-viajes',
  imports: [TarjetaViaje],
  templateUrl: './lista-viajes.html',
  styleUrl: './lista-viajes.css',
})
export class ListaViajes {
  protected readonly viajes = VIAJES_EJEMPLO;
}
