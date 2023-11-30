import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MemberAddressEvent } from 'src/app/models/enums/members/MemberAddressEvent';
import { EditMemberAddressAction } from 'src/app/models/interfaces/member/event/EditMemberAddressAction';

@Component({
  selector: 'app-member-address-form',
  templateUrl: './member-address-form.component.html',
  styleUrls: []
})
export class MemberAddressFormComponent  implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public addMemberAddressAction = MemberAddressEvent.ADD_MEMBER_ADDRESS_ACTION;

  public editMemberAddressAction = MemberAddressEvent.EDIT_MEMBER_ADDRESS_ACTION;

  public memberAddressAction!: { event: EditMemberAddressAction };

  public memberAddressForm = this.formBuilder.group({
    zipCode: ['', [Validators.required, Validators.minLength(8)]],
    streetType_id: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: ['', Validators.required],
    district: ['', Validators.required],
    county_id: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  handleSubmitMemberAddressAction(): void {
    if (this.memberAddressAction?.event?.action === this.addMemberAddressAction) {
      this.handleSubmitAddMemberAddress();
    } else if (this.memberAddressAction?.event?.action === this.editMemberAddressAction) {
      this.handleSubmitEditMemberAddress();
    }

    return;
  }

  handleSubmitAddMemberAddress(): void {
  }

  handleSubmitEditMemberAddress(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
