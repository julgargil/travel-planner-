import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Documentos } from './documentos';
import { DOCUMENTOS_EJEMPLO } from './data/datos-ejemplo';

describe('Documentos', () => {
  let component: Documentos;
  let fixture: ComponentFixture<Documentos>;
  let pantalla: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Documentos],
    }).compileComponents();

    fixture = TestBed.createComponent(Documentos);
    component = fixture.componentInstance;
    pantalla = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra un elemento por cada documento de ejemplo', () => {
    const filas = pantalla.querySelectorAll('.documento');
    expect(filas.length).toBe(DOCUMENTOS_EJEMPLO.length);
    expect(filas[0].textContent).toContain('Billete avión Sevilla-Lisboa.pdf');
  });

  it('muestra el tipo, el tamaño y la fecha de cada documento', () => {
    const primero = pantalla.querySelector('.documento')!;
    expect(primero.textContent).toContain('PDF');
    expect(primero.textContent).toContain('248 KB');
    expect(primero.textContent).toContain('2 may 2027');
  });

  it('cada documento tiene un botón de descargar (desactivado) y otro de borrar', () => {
    const primero = pantalla.querySelector('.documento')!;
    const botones = primero.querySelectorAll('button');
    expect(botones.length).toBe(2);
    expect(botones[0].textContent).toContain('Descargar');
    expect(botones[0].disabled).toBe(true);
    expect(botones[1].textContent).toContain('Borrar');
  });

  it('al pulsar Borrar quita ese documento de la lista', async () => {
    const borrar = pantalla.querySelector<HTMLButtonElement>('.boton-peligro')!;
    borrar.click();
    await fixture.whenStable();

    expect(pantalla.querySelectorAll('.documento').length).toBe(DOCUMENTOS_EJEMPLO.length - 1);
    expect(pantalla.textContent).not.toContain('Billete avión Sevilla-Lisboa.pdf');
  });

  it('borrar no modifica los datos de ejemplo originales', () => {
    component.borrar(1);
    expect(DOCUMENTOS_EJEMPLO.length).toBe(4);
  });

  it('si se borran todos los documentos muestra un aviso', async () => {
    for (let i = 0; i < DOCUMENTOS_EJEMPLO.length; i++) {
      pantalla.querySelector<HTMLButtonElement>('.boton-peligro')!.click();
      await fixture.whenStable();
    }

    expect(pantalla.querySelector('.lista-vacia')?.textContent).toContain('Todavía no hay documentos');
  });

  it('formatea tamaños y fechas', () => {
    expect(component.formatoTamano(96_000)).toBe('96 KB');
    expect(component.formatoTamano(1_350_000)).toBe('1,4 MB');
    expect(component.formatoFecha('2027-06-01')).toBe('1 jun 2027');
    expect(component.etiquetaTipo('image/png')).toBe('Imagen');
  });
});
