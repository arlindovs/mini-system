import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/product/EventAction';

@Component({
  selector: 'app-registration-product',
  templateUrl: './registration-product.component.html',
  styleUrls: []
})
export class RegistrationProductComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  showForm = false;
  eventData!:EventAction;

  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ){}


  ngOnInit(): void{}

  handlerProductAction(event: EventAction): void{
    if(event){
      this.showForm = true;
      this.eventData = event;
      this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

}
