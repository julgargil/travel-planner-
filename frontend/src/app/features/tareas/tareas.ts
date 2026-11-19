import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  descripcion: string;
  completada: boolean;
}

@Component({
  imports: [],
  selector: 'app-tareas',
  styleUrl: './tareas.css',
  templateUrl: './tareas.html',
})
export class Tareas {
  tareas: Tarea[] = [
    { id: 1, descripcion: "Reservar alojamiento", completada: false },
    { id: 2, descripcion: "Comprar los billetes de avión", completada: false },
    { id: 3, descripcion: "Preparar la maleta", completada: false },
    { id: 4, descripcion: "Revisar documentación", completada: true }
  ];

  nuevaTarea = '';
  error = '';

  get completadas(): number {
    return this.tareas.filter(t => t.completada).length;
  }

  get pendientes(): number {
    return this.tareas.length - this.completadas;
  }

  eliminar(id: number): void {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }

  anadirTarea(evento: Event, campo: HTMLInputElement): void {
    evento.preventDefault();
 
    const descripcion = campo.value.trim();
 
    if (!descripcion) {
      this.error = 'Escribe una descripción para la tarea.';
      return;
    }
 
    const siguienteId = this.tareas.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    this.tareas.push({ id: siguienteId, descripcion, completada: false });
 
    campo.value = '';
    this.error = '';
  }
}
