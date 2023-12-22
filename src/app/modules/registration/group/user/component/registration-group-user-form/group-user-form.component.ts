import { UserFormComponent } from './../../../../user/components/user-form/user-form.component';
import { MessageService } from 'primeng/api';
import { UsuarioGrupoService } from './../../../../../../services/cadastro/grupo/usuario/usuario-grupo.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent';
import { AddUserGroupAction } from 'src/app/models/interfaces/group/user/AddUserGroupAction';
import { EditUserGroupAction } from 'src/app/models/interfaces/group/user/EditUserGroupAction';
import { Subject, takeUntil } from 'rxjs';
import { CriarGrupoUsuarioRequest } from 'src/app/models/interfaces/group/user/request/CriarGrupoUsuarioRequest';

@Component({
  selector: 'app-group-user-form',
  templateUrl: './group-user-form.component.html',
  styleUrls: []
})
export class GroupUserFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  @Output() public userGroupCreateEvent = new EventEmitter<AddUserGroupAction>();
  @Output() cancelEvent = new EventEmitter<void>();

  // public selectionUserGroupType !: FormBuilder

  usuarioPerfilEnum: {label: string, value: string}[] = [
    {label: 'Administrador', value: 'ADMIN'},
    {label: 'Usuário', value: 'USER'}
  ];

  constructor(
    private formBuilderUserGroup: FormBuilder,
    private messageService: MessageService,
    private usuarioGrupoService: UsuarioGrupoService,
  ) { }

  public addUserGroupAction = UserGroupEvent.ADD_USER_GROUP_ACTION
  public editUserGroupAction = UserGroupEvent.EDIT_USER_GROUP_ACTION
  public disableUserGroupAction = UserGroupEvent.DISABLE_USER_GROUP_ACTION
  public removeUserGroupAction = UserGroupEvent.REMOVE_USER_GROUP_ACTION

  public userGroupAction !: {event: EditUserGroupAction};


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
    if (this.userGroupAction?.event?.action === this.addUserGroupAction) {
      this.handleSubmitAddUserGroupAction();
    } else if (this.userGroupAction?.event?.action === this.editUserGroupAction) {
      this.handleSubmitEditUserGroupAction();
    }else if(this.userGroupAction?.event?.action === this.removeUserGroupAction){
      this.handleSubmitRemoveUserGroupAction()
    } else if(this.userGroupAction?.event?.action === this.disableUserGroupAction){
      this.handleSubmitDisableUserGroupAction()
    }
    return;
  }

  handleSubmitAddUserGroupAction(): void {
    if (this.userGroupForm?.valid) {
      const requestCreateUserGroup: CriarGrupoUsuarioRequest = {
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

              // Emitir evento de sucesso
              this.userGroupCreateEvent.emit({
                action: this.addUserGroupAction,
                // Você pode adicionar outros dados que deseja enviar com o evento
              });

              // Limpar campos do formulário
              this.userGroupForm.reset();

              // Emitir evento para cancelar o formulário e voltar para a tabela
              this.cancelEvent.emit();
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
            this.cancelEvent.emit();
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
        this.cancelEvent.emit();
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
