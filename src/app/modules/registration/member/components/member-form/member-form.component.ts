import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MemberAddressEvent } from 'src/app/models/enums/members/MemberAddressEvent';
import { MemberEvent } from 'src/app/models/enums/members/MemberEvent';
import { EditMemberAction } from 'src/app/models/interfaces/member/event/EditMemberAction';
import { EditMemberAddressAction } from 'src/app/models/interfaces/member/event/EditMemberAddressAction';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: [],
})
export class MemberFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  @Output() public memberAddressEvent = new EventEmitter<EditMemberAddressAction>();

  @Output() cancelEvent = new EventEmitter<void>();

  public addMemberAction = MemberEvent.ADD_MEMBER_ACTION;

  public editMemberAction = MemberEvent.EDIT_MEMBER_ACTION;

  public addMemberAddressAction = MemberAddressEvent.ADD_MEMBER_ADDRESS_ACTION;

  public memberAction!: { event: EditMemberAction };

  public memberForm = this.formBuilder.group({
    name: ['', Validators.required],
    secondName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth: ['', [Validators.required, Validators.minLength(8)]],
    groupMember_id: ['', Validators.required],
    address: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {}

  handleSubmitMemberAction(): void {
    if (this.memberAction?.event?.action === this.addMemberAction) {
      this.handleSubmitAddMember();
    } else if (this.memberAction?.event?.action === this.editMemberAction) {
      this.handleSubmitEditMember();
    }

    return;
  }

  handleSubmitAddMember(): void {
  }

  handleSubmitEditMember(): void {
  }

  handleMemberAddressEvent(action: string, id?: string, addressName?: string): void {
    if (action && action !== '') {
      this.memberAddressEvent.emit({ action, id, addressName });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
