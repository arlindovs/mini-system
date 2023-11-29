import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/member/event/EventAction';
import { MemberFormComponent } from '../../components/user-form/member-form.component';

@Component({
  selector: 'app-registration-member',
  templateUrl: './registration-member.component.html',
  styleUrls: []
})
export class RegistrationMemberComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {}

  handleMemberAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(MemberFormComponent, {
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
