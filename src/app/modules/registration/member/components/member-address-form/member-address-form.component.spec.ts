import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAddressFormComponent } from './member-address-form.component';

describe('MemberAddressFormComponent', () => {
  let component: MemberAddressFormComponent;
  let fixture: ComponentFixture<MemberAddressFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberAddressFormComponent]
    });
    fixture = TestBed.createComponent(MemberAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
