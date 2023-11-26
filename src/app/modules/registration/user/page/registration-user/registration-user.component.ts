import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/user/event/EventAction';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: []
})
export class RegistrationUserComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {}

  handleUserAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(UserFormComponent, {
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
