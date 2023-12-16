import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/product/EventAction';
import { EditProductAction } from 'src/app/models/interfaces/product/EditProductAction';
import { ProdutoFormularioComponent } from '../components/produto-formulario/produto-formulario.component';

@Component({
  selector: 'app-registro-produto',
  templateUrl: './registro-produto.component.html',
  styleUrls: []
})
export class RegistroProdutoComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  showForm = false;
  eventData!:EventAction;

  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
  ){}


  ngOnInit(): void{}

  handlerProductAction(event: EventAction): void {
    if (event) {
      this.showForm = true;
      this.eventData = event;
      this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
