import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPerfil } from './registrar-perfil';

describe('RegistrarPerfil', () => {
  let component: RegistrarPerfil;
  let fixture: ComponentFixture<RegistrarPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
