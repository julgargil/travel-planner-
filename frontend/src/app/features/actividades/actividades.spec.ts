import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actividades } from './actividades';
import { ACTIVIDADES_EJEMPLO } from './data/datos-ejemplo';

describe('Actividades', () => {
  let component: Actividades;
  let fixture: ComponentFixture<Actividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actividades],
    }).compileComponents();

    fixture = TestBed.createComponent(Actividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra la cabecera de Itinerario y el contador total de actividades', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('h2')?.textContent).toContain('Itinerario');
    expect(html.querySelector('.cabecera .pastilla')?.textContent).toContain(
      `${ACTIVIDADES_EJEMPLO.length} actividades`,
    );
  });

  it('agrupa las actividades por fecha y renderiza una tarjeta por actividad', () => {
    const html = fixture.nativeElement as HTMLElement;
    const dias = html.querySelectorAll('.dia-grupo');
    const tarjetas = html.querySelectorAll('app-tarjeta-actividad');

    expect(dias.length).toBe(4);
    expect(tarjetas.length).toBe(ACTIVIDADES_EJEMPLO.length);
  });

  it('muestra la barra de filtros por categoría', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('app-filtros-actividad')).not.toBeNull();
  });
});
