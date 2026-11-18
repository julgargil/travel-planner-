import { Routes } from '@angular/router';
import { CrearViaje } from './viajes/crear-viaje/crear-viaje';
import { DetalleViaje } from './viajes/detalle-viaje/detalle-viaje';
import { ListaViajes } from './viajes/lista-viajes/lista-viajes';

export const routes: Routes = [
  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { path: 'viajes', component: ListaViajes },
  { path: 'viajes/nuevo', component: CrearViaje },
  { path: 'viajes/:id', component: DetalleViaje },
  { path: '**', redirectTo: 'viajes' },
];
