import { Routes } from '@angular/router';
import { CrearViaje } from './features/viajes/pages/crear-viaje/crear-viaje';
import { DetalleViaje } from './features/viajes/pages/detalle-viaje/detalle-viaje';
import { ListaViajes } from './features/viajes/pages/lista-viajes/lista-viajes';

export const routes: Routes = [
  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { path: 'viajes', component: ListaViajes },
  { path: 'viajes/nuevo', component: CrearViaje },
  { path: 'viajes/:id', component: DetalleViaje },
  { path: '**', redirectTo: 'viajes' },
];
