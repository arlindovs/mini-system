/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { unidadeMedidaFormularioComponent } from './unidadeMedida-formulario.component';

describe('UnitMeasureFormComponent', () => {
  let component: unidadeMedidaFormularioComponent;
  let fixture: ComponentFixture<unidadeMedidaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ unidadeMedidaFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(unidadeMedidaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
