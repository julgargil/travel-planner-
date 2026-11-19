import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioActividad } from './formulario-actividad';

describe('FormularioActividad', () => {
  let component: FormularioActividad;
  let fixture: ComponentFixture<FormularioActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra todos los campos del formulario y las opciones de categoría', () => {
    const html = fixture.nativeElement as HTMLElement;

    expect(html.querySelector('h3')?.textContent).toContain('Nueva actividad');
    expect(html.querySelector('input[name="titulo"][type="text"]')).not.toBeNull();
    expect(html.querySelector('input[name="fecha"][type="date"]')).not.toBeNull();
    expect(html.querySelector('input[name="hora"][type="time"]')).not.toBeNull();
    expect(html.querySelector('input[name="ubicacion"][type="text"]')).not.toBeNull();
    expect(html.querySelector('textarea[name="notas"]')).not.toBeNull();

    const opciones = Array.from(html.querySelectorAll('select[name="categoria"] option')).map(
      (opcion) => opcion.textContent?.trim(),
    );
    expect(opciones).toEqual(['Cultura', 'Gastronomía', 'Transporte', 'Ocio', 'Alojamiento']);
  });

  it('muestra el botón principal sin recargar la página', () => {
    const html = fixture.nativeElement as HTMLElement;
    const boton = html.querySelector('button.boton');

    expect(boton).not.toBeNull();
    expect(boton?.textContent?.trim()).toBe('Añadir actividad');
    expect(boton?.getAttribute('type')).toBe('button');
  });
});
