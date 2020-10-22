import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarProfesionalComponent } from './activarProfesional.component';

describe('ActivarProfesionalComponent', () => {
  let component: ActivarProfesionalComponent;
  let fixture: ComponentFixture<ActivarProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivarProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
