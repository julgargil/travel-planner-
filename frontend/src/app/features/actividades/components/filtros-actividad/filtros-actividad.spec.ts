import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrosActividad } from './filtros-actividad';

describe('FiltrosActividad', () => {
  let component: FiltrosActividad;
  let fixture: ComponentFixture<FiltrosActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra "Todas" activa por defecto y todas las categorías', () => {
    const html = fixture.nativeElement as HTMLElement;
    const botones = Array.from(html.querySelectorAll('button'));
    const etiquetas = botones.map((boton) => boton.textContent?.trim());

    expect(etiquetas).toEqual([
      'Todas',
      'Cultura',
      'Gastronomía',
      'Transporte',
      'Ocio',
      'Alojamiento',
    ]);

    expect(botones[0].classList.contains('filtro-activo')).toBe(true);
    expect(botones[0].classList.contains('pastilla-gris')).toBe(false);
    expect(botones[0].getAttribute('aria-pressed')).toBe('true');

    for (const botonCategoria of botones.slice(1)) {
      expect(botonCategoria.classList.contains('pastilla-gris')).toBe(true);
      expect(botonCategoria.classList.contains('filtro-activo')).toBe(false);
      expect(botonCategoria.getAttribute('aria-pressed')).toBe('false');
    }
  });
});
