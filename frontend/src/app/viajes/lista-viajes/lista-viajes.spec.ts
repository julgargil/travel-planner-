import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListaViajes } from './lista-viajes';

describe('ListaViajes', () => {
  let component: ListaViajes;
  let fixture: ComponentFixture<ListaViajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaViajes],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaViajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
