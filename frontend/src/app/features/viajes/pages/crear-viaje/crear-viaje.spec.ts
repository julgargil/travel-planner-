import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearViaje } from './crear-viaje';

describe('CrearViaje', () => {
  let component: CrearViaje;
  let fixture: ComponentFixture<CrearViaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearViaje],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearViaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
