import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationUserComponent } from './registration-user.component';

describe('RegistrationUserComponent', () => {
  let component: RegistrationUserComponent;
  let fixture: ComponentFixture<RegistrationUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationUserComponent]
    });
    fixture = TestBed.createComponent(RegistrationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
