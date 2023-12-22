import { UserFormComponent } from './../../../../user/components/user-form/user-form.component';
import { MessageService } from 'primeng/api';
import { UsuarioGrupoService } from './../../../../../../services/cadastro/grupo/usuario/usuario-grupo.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent';
import { AddUserGroupAction } from 'src/app/models/interfaces/group/user/AddUserGroupAction';
import { EditUserGroupAction } from 'src/app/models/interfaces/group/user/EditUserGroupAction';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-group-user-form',
  templateUrl: './group-user-form.component.html',
  styleUrls: []
})
export class GroupUserFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  @Output() public userGroupCreateEvent = new EventEmitter<AddUserGroupAction>();
  @Output() cancelEvent = new EventEmitter<void>();

  public selectionUserGroupType !: FormBuilder

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
    // status: [{value: '', disabled: true}],
    empresa:[{value: 1, disabled: true}],
    // versao:[{value: '', disabled: true}],
    });

  ngOnInit() {
    this.setGroupUser(
      this.userGroupAction?.event?.userGroupName as string,
      this.userGroupAction?.event?.userGroupPerfil as string,
      this.userGroupAction?.event?.userGroupEmpresa as number
      );
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
      const requestCreateUserGroup: {
        descricao: string;
        perfil: string;
        empresa: number;
      } = {
        descricao: this.userGroupForm.value.descricao as string,
        perfil: this.userGroupForm.value.perfil as string,
        empresa: this.userGroupForm.getRawValue().empresa as number,
      };

      this.usuarioGrupoService
        .addGrupoUsuario(requestCreateUserGroup)
        .subscribe({
          next: (response) => {
            if(response) {
              console.log('Sucesso!');
              this.userGroupForm.reset();
              console.log('Formulário resetado');
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Grupo de usuário criado com sucesso!',
                life: 3000,
              });
            }
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar grupo de usuário!',
              life: 3000,
            });
          },
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Preencha todos os campos!',
          life: 3000,
        });
      }
    }

  handleSubmitEditUserGroupAction(){}

  handleSubmitRemoveUserGroupAction(){}

  handleSubmitDisableUserGroupAction(){}


  setGroupUser(userDescricao: string, userPerfil: string, userEmpresa: number): void {
    if(userDescricao){
      this.userGroupForm.setValue({
        descricao: userDescricao,
        perfil: userPerfil,
        empresa: userEmpresa,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
