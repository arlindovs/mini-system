import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIntegranteComponent } from './registro-integrante.component';

describe('RegistrationMemberComponent', () => {
  let component: RegistroIntegranteComponent;
  let fixture: ComponentFixture<RegistroIntegranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroIntegranteComponent]
    });
    fixture = TestBed.createComponent(RegistroIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
