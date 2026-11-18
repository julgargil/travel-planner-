import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Gasto {
  id: number;
  concepto: string;
  categoria: string;
  importe: number;
}

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos.html',
  styleUrls: ['./gastos.css']
})
export class Gastos implements OnInit {
  gastos: Gasto[] = [
    { id: 1, concepto: 'Vuelo Tigerair', categoria: 'Transporte', importe: 420 },
    { id: 2, concepto: 'Vuelo Scoot', categoria: 'Transporte', importe: 360 },
    { id: 3, concepto: 'KOKO Hotel Ginza', categoria: 'Alojamiento', importe: 460 }
  ];

  totalGastos: number = 0;
  totalTransporte: number = 0;
  totalAlojamiento: number = 0;

  ngOnInit(): void {
    this.calcularTotales();
  }

  calcularTotales(): void {
    this.totalGastos = this.gastos.reduce((sum, g) => sum + g.importe, 0);
    this.totalTransporte = this.gastos
      .filter(g => g.categoria === 'Transporte')
      .reduce((sum, g) => sum + g.importe, 0);
    this.totalAlojamiento = this.gastos
      .filter(g => g.categoria === 'Alojamiento')
      .reduce((sum, g) => sum + g.importe, 0);
  }
}