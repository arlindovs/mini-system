import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/user/EventAction';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: []
})
export class RegistroUsuarioComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private ref!: DynamicDialogRef;

  showForm = false;
  eventData!:EventAction;


  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
  }


  handlerUsuarioAction(event: EventAction): void {
   if(event){
    this.showForm = true;
    this.eventData = event;
    this.ref.onClose.pipe(takeUntil(this.destroy$))
   }
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
