import { Component, EventEmitter, OnDestroy, OnInit, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/member/event/EventAction';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { EventAddressAction } from 'src/app/models/interfaces/member/event/EventAddressAction';
import { MemberAddressFormComponent } from '../../components/member-address-form/member-address-form.component';
import { MemberEvent } from 'src/app/models/enums/members/MemberEvent';

@Component({
  selector: 'app-registration-member',
  templateUrl: './registration-member.component.html',
  styleUrls: []
})
export class RegistrationMemberComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  showForm = false;
  eventData!: EventAction;

  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {}

  handleMemberAction(event: EventAction): void {
    if (event) {
      this.showForm = true;
      this.eventData = event;
      this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

  handleMemberAddressAction(event: EventAddressAction): void {
    if (event) {
      this.ref = this.dialogService.open(MemberAddressFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle:{ overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
