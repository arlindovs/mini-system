import { UsuarioGrupoService } from './../../../../../../services/cadastro/grupo/usuario/usuario-grupo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/EventAction';
import { ListaGrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/ListaGrupoUsuariosResponse';

@Component({
  selector: 'app-registration-group-user',
  templateUrl: './registration-group-user.component.html',
  styleUrls: []
})
export class RegistrationGroupUserComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  showForm = false;
  eventData !:  EventAction;

  private ref!: DynamicDialogRef;

  public userGrupDatas: Array<ListaGrupoUsuarios> = [];

  constructor(
    private usuarioGrupoService: UsuarioGrupoService,
    private messageService: MessageService,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.listarGrupoUsuarios();
  }

  listarGrupoUsuarios(){
    this.usuarioGrupoService
    .listaGrupoUsuarios()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response) {
          this.userGrupDatas = response;
        }
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar o grupo de usuários',
          detail: error.message,
          life: 3000,
        });
        this.router.navigate(['/home']);
      },
    })
  }

  handlerUserGroupAction(event: EventAction): void{
    if(event){
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
