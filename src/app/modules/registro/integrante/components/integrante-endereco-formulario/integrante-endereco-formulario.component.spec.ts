import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegranteEnderecoFormularioComponent } from './integrante-endereco-formulario.component';

describe('MemberAddressFormComponent', () => {
  let component: IntegranteEnderecoFormularioComponent;
  let fixture: ComponentFixture<IntegranteEnderecoFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntegranteEnderecoFormularioComponent]
    });
    fixture = TestBed.createComponent(IntegranteEnderecoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
