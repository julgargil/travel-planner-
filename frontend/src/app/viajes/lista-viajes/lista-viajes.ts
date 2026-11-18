import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VIAJES_EJEMPLO } from '../datos-ejemplo';

@Component({
  selector: 'app-lista-viajes',
  imports: [RouterLink],
  templateUrl: './lista-viajes.html',
  styleUrl: './lista-viajes.css',
})
export class ListaViajes {
  protected readonly viajes = VIAJES_EJEMPLO;
}
