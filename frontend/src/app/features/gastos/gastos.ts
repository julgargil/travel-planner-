import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el formulario

// Definimos cómo es un Gasto
interface Gasto {
  id: number;
  concepto: string;
  importe: number;
  categoria: 'Transporte' | 'Alojamiento' | 'Comida' | 'Actividades' | 'Otros';
}

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos.html',
  styleUrls: ['./gastos.css']
})
export class Gastos {
  // Lista inicial de gastos de ejemplo
  gastos: Gasto[] = [
    { id: 1, concepto: 'Vuelo Sevilla - Lisboa', importe: 120, categoria: 'Transporte' },
    { id: 2, concepto: 'Hotel 4 noches', importe: 350, categoria: 'Alojamiento' },
    { id: 3, concepto: 'Cena en Alfama', importe: 45, categoria: 'Comida' }
  ];

  // Variables para el formulario de nuevo gasto
  nuevoConcepto: string = '';
  nuevoImporte: number | null = null;
  nuevaCategoria: Gasto['categoria'] = 'Otros';

  // Variable para el filtro actual
  filtroActual: string = 'Todos';

  // Lista de categorías disponibles
  categorias = ['Transporte', 'Alojamiento', 'Comida', 'Actividades', 'Otros'];

  // 1. FUNCIÓN: Añadir un nuevo gasto
  agregarGasto() {
    if (this.nuevoConcepto && this.nuevoImporte && this.nuevoImporte > 0) {
      const nuevo: Gasto = {
        id: Date.now(), // ID único temporal
        concepto: this.nuevoConcepto,
        importe: this.nuevoImporte,
        categoria: this.nuevaCategoria
      };
      
      // Añadimos el gasto al principio de la lista
      this.gastos.unshift(nuevo);
      
      // Limpiamos el formulario
      this.nuevoConcepto = '';
      this.nuevoImporte = null;
      this.nuevaCategoria = 'Otros';
    }
  }

  // 2. FUNCIÓN: Borrar un gasto
  borrarGasto(id: number) {
    this.gastos = this.gastos.filter(g => g.id !== id);
  }

  // 3. FUNCIÓN: Cambiar el filtro
  setFiltro(categoria: string) {
    this.filtroActual = categoria;
  }

  // 4. COMPUTADO: Obtener los gastos filtrados para mostrarlos en la lista
  get gastosFiltrados() {
    if (this.filtroActual === 'Todos') {
      return this.gastos;
    }
    return this.gastos.filter(g => g.categoria === this.filtroActual);
  }

  // 5. COMPUTADOS: Calcular los totales dinámicamente
  get totalGastos() {
    return this.gastosFiltrados.reduce((sum, g) => sum + g.importe, 0);
  }

  get totalTransporte() {
    return this.gastos.filter(g => g.categoria === 'Transporte').reduce((sum, g) => sum + g.importe, 0);
  }

  get totalAlojamiento() {
    return this.gastos.filter(g => g.categoria === 'Alojamiento').reduce((sum, g) => sum + g.importe, 0);
  }
}