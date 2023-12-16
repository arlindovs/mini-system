import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/group/member/EventAction';

@Component({
  selector: 'app-registration-group-member',
  templateUrl: './registration-group-member.component.html',
  styleUrls: []
})
export class RegistrationGroupMemberComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  showForm = false;
  eventData !: EventAction;

  private ref!: DynamicDialogRef;
  
  constructor( private dialogService: DialogService) { }

  ngOnInit():void { }

  handlerMemberGroupAction(event: EventAction): void {
    if (event) {
      this.showForm = true;
      this.eventData = event;
      this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };

}
