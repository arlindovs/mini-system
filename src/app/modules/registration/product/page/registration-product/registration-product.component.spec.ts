import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProductComponent } from './registration-product.component';

describe('RegistrationProductComponent', () => {
    let component: RegistrationProductComponent;
    let fixture: ComponentFixture<RegistrationProductComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RegistrationProductComponent]
      });
      fixture = TestBed.createComponent(RegistrationProductComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });