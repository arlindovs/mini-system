import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/user/event/EventAction';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { ListaTodosUsuarios } from 'src/app/models/interfaces/usuario/response/ListaTodosUsuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: []
})
export class RegistrationUserComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private ref!: DynamicDialogRef;

  public usersDatas: Array<ListaTodosUsuarios> = [];

  constructor(
    private dialogService: DialogService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers(){
    this.usuarioService
    .getAllUsuarios()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response) {
          this.usersDatas = response;
        }
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao carregar os usuários',
          detail: error.message,
          life: 3000,
        });
        this.router.navigate(['/home']);
      },
    })
  }

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
      // this.ref.onClose.pipe(takeUntil(this.destroy$));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
