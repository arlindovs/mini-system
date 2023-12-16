import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntegranteTabelaComponent } from './integrante-tabela.component';



describe('MemberTableComponent', () => {
  let component: IntegranteTabelaComponent;
  let fixture: ComponentFixture<IntegranteTabelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntegranteTabelaComponent]
    });
    fixture = TestBed.createComponent(IntegranteTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
