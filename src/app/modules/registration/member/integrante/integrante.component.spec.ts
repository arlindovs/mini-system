/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntegranteComponent } from './integrante.component';

describe('IntegranteComponent', () => {
  let component: IntegranteComponent;
  let fixture: ComponentFixture<IntegranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
