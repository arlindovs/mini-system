import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntegranteFormularioComponent } from './integrante-formulario.component';



describe('MemberFormComponent', () => {
  let component: IntegranteFormularioComponent;
  let fixture: ComponentFixture<IntegranteFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntegranteFormularioComponent]
    });
    fixture = TestBed.createComponent(IntegranteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
