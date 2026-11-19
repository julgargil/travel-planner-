import { Component } from '@angular/core';
import { FiltrosActividad } from './components/filtros-actividad/filtros-actividad';
import { TarjetaActividad } from './components/tarjeta-actividad/tarjeta-actividad';
import { Actividad } from './data/actividad.model';
import { ACTIVIDADES_EJEMPLO } from './data/datos-ejemplo';

interface DiaItinerario {
  fecha: string;
  fechaFormateada: string;
  actividades: Actividad[];
}

@Component({
  selector: 'app-actividades',
  imports: [FiltrosActividad, TarjetaActividad],
  templateUrl: './actividades.html',
  styleUrl: './actividades.css',
})
export class Actividades {
  protected readonly actividades: Actividad[] = ACTIVIDADES_EJEMPLO;
  protected readonly totalActividades = this.actividades.length;
  protected readonly diasItinerario: DiaItinerario[] = this.agruparPorFecha(this.actividades);

  private agruparPorFecha(actividades: Actividad[]): DiaItinerario[] {
    const grupos = new Map<string, Actividad[]>();

    for (const actividad of actividades) {
      const delDia = grupos.get(actividad.fecha) ?? [];
      delDia.push(actividad);
      grupos.set(actividad.fecha, delDia);
    }

    return Array.from(grupos.entries())
      .sort(([fechaA], [fechaB]) => fechaA.localeCompare(fechaB))
      .map(([fecha, actividadesDelDia]) => ({
        fecha,
        fechaFormateada: this.formatearFecha(fecha),
        actividades: [...actividadesDelDia].sort(
          (a, b) => a.hora.localeCompare(b.hora) || a.id - b.id,
        ),
      }));
  }

  private formatearFecha(fechaIso: string): string {
    const [anio, mes, dia] = fechaIso.split('-').map(Number);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    const texto = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(fecha);

    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
