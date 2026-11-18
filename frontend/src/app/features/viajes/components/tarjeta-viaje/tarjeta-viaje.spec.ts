import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VIAJES_EJEMPLO } from '../../data/datos-ejemplo';
import { TarjetaViaje } from './tarjeta-viaje';

describe('TarjetaViaje', () => {
  let component: TarjetaViaje;
  let fixture: ComponentFixture<TarjetaViaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaViaje],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaViaje);
    component = fixture.componentInstance;
    // La tarjeta necesita un viaje para pintarse.
    fixture.componentRef.setInput('viaje', VIAJES_EJEMPLO[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra el origen y el destino del viaje', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('h3')?.textContent).toContain('Sevilla - Lisboa');
  });
});
