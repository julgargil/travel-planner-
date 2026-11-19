import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tareas } from './tareas';

describe('Tareas', () => {
  let fixture: ComponentFixture<Tareas>;
  let componente: Tareas;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tareas],
    }).compileComponents();

    fixture = TestBed.createComponent(Tareas);
    componente = fixture.componentInstance;
    html = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  // ---------- Lógica del componente ----------

  describe('estado inicial', () => {
    it('se crea el componente', () => {
      expect(componente).toBeTruthy();
    });

    it('carga las 4 tareas de prueba', () => {
      expect(componente.tareas.length).toBe(4);
    });

    it('no tiene mensaje de error', () => {
      expect(componente.error).toBe('');
    });

    it('calcula 1 completada y 3 pendientes', () => {
      expect(componente.completadas).toBe(1);
      expect(componente.pendientes).toBe(3);
    });
  });

  describe('getters', () => {
    it('completadas y pendientes se actualizan al marcar una tarea', () => {
      componente.tareas[0].completada = true;

      expect(componente.completadas).toBe(2);
      expect(componente.pendientes).toBe(2);
    });

    it('con la lista vacía ambos valen 0', () => {
      componente.tareas = [];

      expect(componente.completadas).toBe(0);
      expect(componente.pendientes).toBe(0);
    });
  });

  describe('eliminar', () => {
    it('elimina la tarea con el id indicado', () => {
      componente.eliminar(2);

      expect(componente.tareas.length).toBe(3);
      expect(componente.tareas.some(t => t.id === 2)).toBe(false);
    });

    it('no modifica el resto de tareas', () => {
      componente.eliminar(2);

      expect(componente.tareas.map(t => t.id)).toEqual([1, 3, 4]);
    });

    it('si el id no existe, la lista no cambia', () => {
      componente.eliminar(999);

      expect(componente.tareas.length).toBe(4);
    });
  });

  describe('anadirTarea', () => {
    let campo: HTMLInputElement;
    let evento: Event;

    beforeEach(() => {
      campo = document.createElement('input');
      evento = new Event('submit', { cancelable: true });
    });

    it('cancela el envío nativo del formulario', () => {
      campo.value = 'Nueva tarea';
      componente.anadirTarea(evento, campo);

      expect(evento.defaultPrevented).toBe(true);
    });

    it('añade la tarea al final de la lista, sin completar', () => {
      campo.value = 'Pedir el visado';
      componente.anadirTarea(evento, campo);

      const ultima = componente.tareas[componente.tareas.length - 1];
      expect(componente.tareas.length).toBe(5);
      expect(ultima.descripcion).toBe('Pedir el visado');
      expect(ultima.completada).toBe(false);
    });

    it('asigna un id igual al mayor existente más uno', () => {
      campo.value = 'Tarea con id nuevo';
      componente.anadirTarea(evento, campo);

      expect(componente.tareas[4].id).toBe(5);
    });

    it('el id no se repite tras eliminar una tarea intermedia', () => {
      componente.eliminar(2);
      campo.value = 'Otra tarea';
      componente.anadirTarea(evento, campo);

      const ids = componente.tareas.map(t => t.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(componente.tareas[componente.tareas.length - 1].id).toBe(5);
    });

    it('asigna el id 1 si la lista está vacía', () => {
      componente.tareas = [];
      campo.value = 'Primera';
      componente.anadirTarea(evento, campo);

      expect(componente.tareas[0].id).toBe(1);
    });

    it('recorta los espacios al principio y al final', () => {
      campo.value = '   Comprar protector solar   ';
      componente.anadirTarea(evento, campo);

      expect(componente.tareas[4].descripcion).toBe('Comprar protector solar');
    });

    it('vacía el input tras añadir', () => {
      campo.value = 'Algo';
      componente.anadirTarea(evento, campo);

      expect(campo.value).toBe('');
    });

    it('limpia un error anterior al añadir correctamente', () => {
      componente.error = 'Error previo';
      campo.value = 'Algo';
      componente.anadirTarea(evento, campo);

      expect(componente.error).toBe('');
    });

    it('con el input vacío muestra error y no añade nada', () => {
      campo.value = '';
      componente.anadirTarea(evento, campo);

      expect(componente.error).toBe('Escribe una descripción para la tarea.');
      expect(componente.tareas.length).toBe(4);
    });

    it('con solo espacios muestra error y no añade nada', () => {
      campo.value = '     ';
      componente.anadirTarea(evento, campo);

      expect(componente.error).not.toBe('');
      expect(componente.tareas.length).toBe(4);
    });

    it('con el input vacío también cancela el envío nativo', () => {
      campo.value = '';
      componente.anadirTarea(evento, campo);

      expect(evento.defaultPrevented).toBe(true);
    });
  });

  // ---------- Plantilla ----------

  describe('plantilla', () => {
    function filas(): HTMLElement[] {
      return Array.from(html.querySelectorAll<HTMLElement>('.tarea'));
    }

    function enviarFormulario(texto: string): void {
      const input = html.querySelector<HTMLInputElement>('.nueva-tarea input')!;
      input.value = texto;
      html.querySelector('.nueva-tarea')!
        .dispatchEvent(new Event('submit', { cancelable: true }));
      fixture.detectChanges();
    }

    it('muestra una fila por cada tarea', () => {
      expect(filas().length).toBe(4);
    });

    it('muestra la descripción de cada tarea', () => {
      const textos = filas().map(f => f.querySelector('.tarea-texto')!.textContent!.trim());

      expect(textos).toEqual([
        'Reservar alojamiento',
        'Comprar los billetes de avión',
        'Preparar la maleta',
        'Revisar documentación',
      ]);
    });

    it('marca como "hecha" solo las tareas completadas', () => {
      const hechas = filas().map(f => f.classList.contains('hecha'));

      expect(hechas).toEqual([false, false, false, true]);
    });

    it('muestra los pendientes y el resumen de completadas', () => {
      expect(html.querySelector('.pastilla')!.textContent).toContain('3 pendientes');
      expect(html.querySelector('.pie')!.textContent).toContain('1 de 4 tareas completadas');
    });

    it('usa el singular cuando solo queda una pendiente', () => {
      // Se parte de 3 pendientes; se completan 2 con clics reales para dejar 1.
      filas()[0].querySelector<HTMLInputElement>('.casilla')!.click();
      filas()[1].querySelector<HTMLInputElement>('.casilla')!.click();
      fixture.detectChanges();

      expect(html.querySelector('.pastilla')!.textContent).toContain('1 pendiente');
      expect(html.querySelector('.pastilla')!.textContent).not.toContain('pendientes');
    });

    it('no muestra el mensaje de error al principio', () => {
      expect(html.querySelector('.error')).toBeNull();
    });

    it('al enviar el formulario vacío muestra el error y marca el input', () => {
      enviarFormulario('');

      expect(html.querySelector('.error')!.textContent)
        .toContain('Escribe una descripción para la tarea.');
      expect(html.querySelector('.nueva-tarea input')!.classList).toContain('invalido');
      expect(filas().length).toBe(4);
    });

    it('al escribir en el input desaparece el error', () => {
      enviarFormulario('');
      const input = html.querySelector<HTMLInputElement>('.nueva-tarea input')!;

      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(html.querySelector('.error')).toBeNull();
    });

    it('al enviar con texto añade la fila y actualiza los contadores', () => {
      enviarFormulario('Pedir el visado');

      expect(filas().length).toBe(5);
      expect(filas()[4].textContent).toContain('Pedir el visado');
      expect(filas()[4].classList.contains('hecha')).toBe(false);
      expect(html.querySelector('.pastilla')!.textContent).toContain('4 pendientes');
      expect(html.querySelector('.pie')!.textContent).toContain('1 de 5 tareas completadas');
    });

    it('al pulsar la casilla alterna el estado de la tarea', () => {
      const casilla = filas()[0].querySelector<HTMLInputElement>('.casilla')!;

      casilla.click();
      fixture.detectChanges();

      expect(componente.tareas[0].completada).toBe(true);
      expect(filas()[0].classList.contains('hecha')).toBe(true);
      expect(html.querySelector('.pastilla')!.textContent).toContain('2 pendientes');

      casilla.click();
      fixture.detectChanges();

      expect(componente.tareas[0].completada).toBe(false);
      expect(filas()[0].classList.contains('hecha')).toBe(false);
    });

    it('al pulsar la papelera elimina la fila', () => {
      filas()[1].querySelector<HTMLButtonElement>('.borrar')!.click();
      fixture.detectChanges();

      expect(filas().length).toBe(3);
      expect(html.textContent).not.toContain('Comprar los billetes de avión');
    });

    it('con la lista vacía muestra el mensaje "No hay tareas todavía."', () => {
      // Se borran las 4 tareas con clics reales en la papelera.
      for (let i = 0; i < 4; i++) {
        filas()[0].querySelector<HTMLButtonElement>('.borrar')!.click();
        fixture.detectChanges();
      }

      expect(filas().length).toBe(1);
      expect(html.querySelector('.lista')!.textContent).toContain('No hay tareas todavía.');
    });
  });
});
