import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ACTIVIDADES_EJEMPLO } from '../../data/datos-ejemplo';
import { TarjetaActividad } from './tarjeta-actividad';

describe('TarjetaActividad', () => {
  let component: TarjetaActividad;
  let fixture: ComponentFixture<TarjetaActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaActividad);
    component = fixture.componentInstance;
    // La tarjeta necesita una actividad para pintarse.
    fixture.componentRef.setInput('actividad', ACTIVIDADES_EJEMPLO[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra los datos principales y botones de la actividad', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('h4')?.textContent).toContain('Check-in en el hotel de Baixa-Chiado');
    expect(html.querySelector('time')?.textContent).toContain('14:30');
    expect(html.querySelector('.pastilla')?.textContent).toContain('Alojamiento');
    expect(html.textContent).toContain('Rua do Ouro, Baixa, Lisboa');
    expect(html.querySelector('.actividad-notas')?.textContent).toContain('Confirmar reserva');

    const botones = Array.from(html.querySelectorAll('button')).map((b) => b.textContent?.trim());
    expect(botones).toEqual(['Editar', 'Borrar']);
  });

  it('no muestra el bloque de notas cuando la actividad no tiene notas', async () => {
    fixture.componentRef.setInput('actividad', ACTIVIDADES_EJEMPLO[4]);
    await fixture.whenStable();

    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('.actividad-notas')).toBeNull();
  });
});
