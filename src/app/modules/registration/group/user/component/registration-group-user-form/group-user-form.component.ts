import { MessageService } from 'primeng/api';
import { UsuarioGrupoService } from './../../../../../../services/cadastro/grupo/usuario/usuario-grupo.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/EventAction';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent.enum';
import { AddGroupUser } from 'src/app/models/interfaces/group/user/AddGroupUser';

@Component({
  selector: 'app-group-user-form',
  templateUrl: './group-user-form.component.html',
  styleUrls: []
})
export class GroupUserFormComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>();

  @Output() cancelEvent = new EventEmitter<void>();

  // public selectionUserGroupType !: FormBuilder

  public addUserGroupAction = UserGroupEvent.ADD_USER_GROUP_ACTION
  public editUserGroupAction = UserGroupEvent.EDIT_USER_GROUP_ACTION
  public disableUserGroupAction = UserGroupEvent.DISABLE_USER_GROUP_ACTION

  usuarioPerfilEnum: {label: string, value: string}[] = [
    {label: 'Administrador', value: 'ADMIN'},
    {label: 'Usuário', value: 'USER'}
  ];

  constructor(
    private formBuilderUserGroup: FormBuilder,
    private messageService: MessageService,
    private usuarioGrupoService: UsuarioGrupoService,
  ) { }


  // public userGroupAction !: {event: EditUserGroupAction};

  public userGroupAction!: {event: EventAction};


  public userGroupForm = this.formBuilderUserGroup.group({
    descricao:['', Validators.required],
    perfil:['', Validators.required],
    status: [{value: '', disabled: true}],
    empresa:[{value: 1, disabled: true}],
    versao:[{value: '', disabled: true}],
    });

  ngOnInit() {
  }


  public handleSubmitUserGroupAction(): void {
    console.log('userGroupAction:', this.userGroupAction);
    console.log('userGroupForm:', this.addUserGroupAction);
    if (this.userGroupAction?.event?.action === this.addUserGroupAction) {
      console.log('Handling ADD action');
      this.handleSubmitAddUserGroupAction();
    } else if (this.userGroupAction?.event?.action === this.editUserGroupAction) {
      console.log('Handling EDIT action');
      this.handleSubmitEditUserGroupAction();
    } else if (this.userGroupAction?.event?.action === this.disableUserGroupAction) {
      console.log('Handling DISABLE action');
      this.handleSubmitDisableUserGroupAction();
    }
    return;

  }


  handleSubmitAddUserGroupAction(): void {
    if (this.userGroupForm?.valid) {
      const requestCreateUserGroup: AddGroupUser = {
        descricao: this.userGroupForm.value.descricao as string,
        perfil: this.userGroupForm.value.perfil as string,
        empresa: this.userGroupForm.getRawValue().empresa as number,
      };

      this.usuarioGrupoService
        .addGrupoUsuario(requestCreateUserGroup)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response) {
              console.log('Sucesso ao cadastrar grupo de usuário:', response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Grupo de usuário criado com sucesso!',
                life: 3000,
              });

              // // Emitir evento de sucesso
              // this.userGroupCreateEvent.emit({
              //   action: this.addUserGroupAction,
              //   // Você pode adicionar outros dados que deseja enviar com o evento
              // });

              // // Limpar campos do formulário
              // this.userGroupForm.reset();

              // // Emitir evento para cancelar o formulário e voltar para a tabela
              // this.cancelEvent.emit();
            }
          },
          error: (error) => {
            console.error('Erro ao cadastrar grupo de usuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar grupo de usuário!',
              life: 3000,
            });

            // Emitir evento de cancelamento em caso de erro
            // this.cancelEvent.emit();
          },
        });
      } else {
        console.warn('Formulário inválido. Preencha todos os campos.');
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Preencha todos os campos!',
          life: 3000,
        });

        // Emitir evento de cancelamento em caso de formulário inválido
        // this.cancelEvent.emit();
      }
    }

  handleSubmitEditUserGroupAction(){}

  handleSubmitRemoveUserGroupAction(){}

  handleSubmitDisableUserGroupAction(){}



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
