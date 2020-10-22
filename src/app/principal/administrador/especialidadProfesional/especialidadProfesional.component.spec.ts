import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadProfesionalComponent } from './especialidadProfesional.component';

describe('EspecialidadProfesionalComponent', () => {
  let component: EspecialidadProfesionalComponent;
  let fixture: ComponentFixture<EspecialidadProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
