import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioModule } from '../registro-usuario.module';

describe('RegistrationUserComponent', () => {
  let component: RegistroUsuarioModule;
  let fixture: ComponentFixture<RegistroUsuarioModule>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroUsuarioModule]
    });
    fixture = TestBed.createComponent(RegistroUsuarioModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
