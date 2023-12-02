import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/product/EventAction';
import { EditProductAction } from 'src/app/models/interfaces/product/EditProductAction';
import { ProductFormComponent } from '../../components/product-form/product-form/product-form.component';

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
      this.ref = this.dialogService.open(ProductFormComponent,{
        header: event?.action,
        width: '70%',
        contentStyle:{ overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        }
    })
      this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

}
