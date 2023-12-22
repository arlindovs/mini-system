import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditUserGroupAction } from 'src/app/models/interfaces/group/user/EditUserGroupAction';
import { ListaGrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/ListaGrupoUsuariosResponse';
import { Table } from 'primeng/table';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent';
import { EventAction } from 'src/app/models/interfaces/EventAction';

@Component({
  selector: 'app-group-user-table',
  templateUrl: './group-user-table.component.html',
  styleUrls: []
})
export class GroupUserTableComponent {
  @Input() userGroup: Array<ListaGrupoUsuarios> = [];
  @Output() userGroupEvent = new EventEmitter<EventAction>();

  constructor() { }

  public addUserGroupAction = UserGroupEvent.ADD_USER_GROUP_ACTION;

  public userGroupSelected!: ListaGrupoUsuarios;

  public editUserGroupAction = 'EDIT_USER_GROUP_ACTION'
  public disableUserGroupAction = 'DISABLE_USER_GROUP_ACTION'
  public removeUserGroupAction = 'REMOVE_USER_GROUP_ACTION'

  clear(table: Table) {
    table.clear();
  }

  handleUserGroupEvent(action:string, id?: string, userGroupName?: string){
    if(action && action !=='' ){
      const userGroupEventData = id && id !== '' ? { action, id } : { action };
      this.userGroupEvent.emit(userGroupEventData)
    }
  }

}
