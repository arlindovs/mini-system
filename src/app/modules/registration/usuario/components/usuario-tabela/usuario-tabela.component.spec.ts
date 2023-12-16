import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTabelaComponent } from './usuario-tabela.component';

describe('UserTableComponent', () => {
  let component: UsuarioTabelaComponent;
  let fixture: ComponentFixture<UsuarioTabelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioTabelaComponent]
    });
    fixture = TestBed.createComponent(UsuarioTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
