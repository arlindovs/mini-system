import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/GrupoUsuariosResponse';
import { Table } from 'primeng/table';
import { EventAction } from 'src/app/models/interfaces/EventAction';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent.enum';

/**
 * Componente de tabela de usuários de grupo.
 */
@Component({
  selector: 'app-group-user-table',
  templateUrl: './group-user-table.component.html',
  styleUrls: []
})
export class GroupUserTableComponent {

  /**
   * Grupo de usuários.
   */
  @Input() userGroup: Array<GrupoUsuarios> = [];

  /**
   * Evento de grupo de usuário.
   */
  @Output() userGroupEvent = new EventEmitter<EventAction>();

  /**
   * Grupo de usuário selecionado.
   */
  public userGroupSelected!: GrupoUsuarios;

  /**
   * Ação de adicionar grupo de usuário.
   */
  public addUserGroupAction = UserGroupEvent.ADD_USER_GROUP_ACTION;

  /**
   * Ação de editar grupo de usuário.
   */
  public editUserGroupAction = UserGroupEvent.EDIT_USER_GROUP_ACTION;

  /**
   * Ação de desabilitar grupo de usuário.
   */
  public disableUserGroupAction = UserGroupEvent.DISABLE_USER_GROUP_ACTION;

  /**
   * Limpa a tabela.
   * @param table A tabela a ser limpa.
   */
  clear(table: Table) {
    table.clear();
  }

  /**
   * Manipula o evento de grupo de usuário.
   * @param action A ação a ser realizada.
   * @param id O ID do grupo de usuário (opcional).
   */
  handleUserGroupEvent(action: string, id?: string): void {
    console.log('Action:', action);
    if (action && action !== '') {
      const userGroupEventData = id && id !== null ? { action, id } : { action };
      this.userGroupEvent.emit(userGroupEventData);
    }
  }

}
