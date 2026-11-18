import { Routes } from '@angular/router';
import { CrearViaje } from './features/viajes/pages/crear-viaje/crear-viaje';
import { DetalleViaje } from './features/viajes/pages/detalle-viaje/detalle-viaje';
import { ListaViajes } from './features/viajes/pages/lista-viajes/lista-viajes';

// Importamos las 4 secciones que van dentro de los botones
import { Actividades } from './features/actividades/actividades';
import { Documentos } from './features/documentos/documentos';
import { Gastos } from './features/gastos/gastos';
import { Tareas } from './features/tareas/tareas';

export const routes: Routes = [
  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { path: 'viajes', component: ListaViajes },
  { path: 'viajes/nuevo', component: CrearViaje },
  { 
    path: 'viajes/:id', 
    component: DetalleViaje,
    children: [
      { path: '', redirectTo: 'informacion', pathMatch: 'full' },
      { path: 'informacion', component: ListaViajes }, // Temporalmente usamos la lista hasta que Julia cree el componente Info
      { path: 'itinerario', component: Actividades },
      { path: 'tareas', component: Tareas },
      { path: 'gastos', component: Gastos },
      { path: 'documentos', component: Documentos }
    ]
  },
  { path: '**', redirectTo: 'viajes' }
];
