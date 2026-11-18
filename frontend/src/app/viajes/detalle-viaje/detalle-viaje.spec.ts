import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetalleViaje } from './detalle-viaje';

describe('DetalleViaje', () => {
  let component: DetalleViaje;
  let fixture: ComponentFixture<DetalleViaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleViaje],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleViaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
