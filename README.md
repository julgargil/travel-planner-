# 🧳 Travel Planner

Aplicación web para planificar viajes: crea tus viajes y organiza sus actividades, tareas, gastos y documentos.

Proyecto de Ingeniería del Software · Universidad de Sevilla · Curso 26/27

## Tecnologías

| Parte | Tecnología |
| --- | --- |
| Interfaz | Angular 22 (TypeScript, HTML y CSS) |
| Tests | Vitest, a través de `ng test` |
| Control de versiones | git y GitHub (issues y tablero) |

## Cómo arrancar el proyecto

Requisitos: [Node.js](https://nodejs.org) 24 y Angular CLI (`npm install -g @angular/cli`).

En Windows, usa **cmd** y no PowerShell: PowerShell bloquea los scripts de npm.

```bash
git clone https://github.com/julgargil/travel-planner-.git
cd travel-planner-/frontend
npm install
ng serve
```

Abre http://localhost:4200. Para pasar los tests:

```bash
ng test --watch=false
```

## Fases del proyecto

1. **Interfaz**: todas las pantallas, solo visuales y con datos de ejemplo. Los botones aún no hacen nada.
2. **Funcionalidad**: cada uno conecta su parte para que guarde y lea datos de verdad.

Ahora estamos en la **fase 1**.

## Estructura y reparto

```
travel-planner-/
├── docs/                       ← acta, diario, declaración de IA…       (todos)
└── frontend/src/
    ├── styles.css              ← solo importa los 3 de styles/          (P1)
    ├── styles/
    │   ├── variables.css       ← colores y medidas                      (P1)
    │   ├── base.css            ← página, títulos y formularios          (P1)
    │   └── componentes.css     ← tarjeta, botón, pastilla, sección…     (P1)
    └── app/
        ├── app.html/.ts/.css   ← esqueleto: menú + contenido            (P1)
        ├── app.routes.ts       ← las páginas y sus URLs                 (P1)
        ├── layout/sidebar/     ← menú lateral                           (P1)
        ├── shared/models/      ← la forma de los datos (viaje.ts)       (P1)
        └── features/           ← una carpeta por parte de la app
            ├── viajes/                                                  (P1)
            │   ├── pages/      ← lista-viajes, crear-viaje, detalle-viaje
            │   ├── components/ ← tarjeta-viaje
            │   └── data/       ← datos-ejemplo.ts
            ├── actividades/    ← sección Actividades de un viaje        (P2)
            ├── tareas/         ← sección Tareas de un viaje             (P3)
            ├── gastos/         ← sección Gastos de un viaje             (P4)
            └── documentos/     ← sección Documentos de un viaje         (P5)
```

Dentro de cada parte se sigue el mismo esquema que en `viajes/`:

| Carpeta | Qué va dentro |
| --- | --- |
| `pages/` | Componentes que son una página, con su propia URL |
| `components/` | Piezas que no son una página: una tarjeta, un formulario… |
| `data/` | Datos de ejemplo de la fase 1 |

Las secciones de Actividades, Tareas, Gastos y Documentos no son páginas: van **dentro** de Ver viaje. Por eso su componente principal está directamente en su carpeta (`features/gastos/gastos.ts`), y las piezas que añadáis irán en `features/gastos/components/`.

Las páginas son:

| URL | Página |
| --- | --- |
| `/viajes` | Mis viajes |
| `/viajes/nuevo` | Nuevo viaje |
| `/viajes/:id` | Ver viaje, con las secciones Actividades, Tareas, Gastos y Documentos |

Los componentes de Actividades, Tareas, Gastos y Documentos **ya están creados y colocados** dentro de la página Ver viaje. Cada uno solo tiene que rellenar el suyo.

## Reglas para trabajar sin pisarnos

1. **Cada uno trabaja solo dentro de su carpeta.** P4, por ejemplo, solo toca `features/gastos/`.
2. **Los archivos comunes son de P1**: `app.*`, `app.routes.ts`, `layout/`, `shared/`, `features/viajes/`, `styles.css` y `styles/`. Si necesitas un cambio en ellos, pídeselo a P1 o avisa antes en el grupo.
3. **Usa las clases comunes de `styles/componentes.css`** en vez de inventar colores: `tarjeta`, `seccion`, `boton`, `boton-secundario`, `boton-peligro`, `pastilla`, `pastilla-gris`, `apagado`, `cabecera` e `icono`. Los colores están en variables, como `var(--color-principal)`.
4. **Nada de `style="..."` con colores** en el HTML. Los estilos propios van en el `.css` de tu componente, que solo afecta a tu componente.
5. **Si tu parte necesita más piezas**, créalas en `components/` dentro de tu carpeta: `ng generate component features/gastos/components/formulario-gasto`.
6. **Si necesitas los datos de un viaje**, usa el modelo común: `import { Viaje } from '../../shared/models/viaje';`. No lo copies a tu carpeta.
7. **Antes de subir, pasa los tests** (`ng test --watch=false`). Si tu componente usa `routerLink`, su test necesita `providers: [provideRouter([])]`.

### Cómo empezar tu parte

Tu componente ya existe. Por ejemplo, para Gastos:

| Archivo | Qué es |
| --- | --- |
| `features/gastos/gastos.html` | Lo que se ve. Ahora pone "Próximamente": sustitúyelo por tu diseño |
| `features/gastos/gastos.css` | Los estilos de tu sección |
| `features/gastos/gastos.ts` | La lógica. En la fase 1 casi no hace falta tocarlo |
| `features/gastos/gastos.spec.ts` | Su test |

Para verlo, arranca con `ng serve` y entra en un viaje: `/viajes/1`.

## Forma de trabajar con git

Seguimos el modelo de la asignatura:

| Rama | Para qué |
| --- | --- |
| `main` | Solo las entregas, con etiqueta (`v1.0.0`). No se trabaja aquí |
| `trunk` | Integración. Es la rama por defecto y de donde salen todas las demás |
| `<nº issue>-<descripción>` | Una rama por tarea, por ejemplo `7-formulario-gasto`. Se borra al terminar |

El ciclo de cada tarea:

1. Crea el **issue** en GitHub, asígnatelo y muévelo a *In progress* en el tablero.
2. Pon `trunk` al día y crea tu rama: `git switch trunk`, `git pull` y `git switch -c 7-formulario-gasto`.
3. Haz **commits pequeños** con el patrón de abajo y súbelos con `git push`.
4. Al terminar, **mezcla en local**: `git switch trunk`, `git pull`, `git merge 7-formulario-gasto` y `git push`.
5. **Borra la rama** (`git branch -d …` y `git push origin --delete …`) y **cierra el issue** con un comentario que diga qué commits lo resuelven.

**No se usan pull requests** dentro del equipo, **no se hacen commits desde la web** de GitHub y **cada persona usa siempre el mismo usuario de git**.

Si tu rama dura varios días, trae de vez en cuando lo nuevo de los demás con `git merge trunk` estando en tu rama.

### Commits

Patrón: `tipo(ámbito): descripción (#nº issue)`, en español y en presente.

| Tipo | Cuándo | Ejemplo |
| --- | --- | --- |
| `feat` | Algo nuevo | `feat(gastos): tarjetas de totales (#7)` |
| `fix` | Arreglar un error | `fix(gastos): importe con dos decimales (#9)` |
| `style` | Solo aspecto, sin cambiar lo que hace | `style(gastos): separación entre tarjetas (#7)` |
| `refactor` | Reorganizar código sin cambiar lo que hace | `refactor(viajes): extraer la tarjeta a su componente (#4)` |
| `test` | Tests | `test(gastos): test del componente de gastos (#7)` |
| `docs` | Documentación | `docs: README con las reglas del equipo (#2)` |
| `chore` | Configuración y herramientas | `chore(front): proyecto Angular (#1)` |

### Issues

Todos con la misma plantilla:

```markdown
## Historia de usuario
Como … quiero … para …

## Criterios de aceptación
- [ ] …

## Tareas
- [ ] …
```
