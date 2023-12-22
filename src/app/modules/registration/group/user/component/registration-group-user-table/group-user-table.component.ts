import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditUserGroupAction } from 'src/app/models/interfaces/group/user/EditUserGroupAction';
import { ListaGrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/ListaGrupoUsuariosResponse';
import { Table } from 'primeng/table';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent';

@Component({
  selector: 'app-group-user-table',
  templateUrl: './group-user-table.component.html',
  styleUrls: []
})
export class GroupUserTableComponent implements OnInit {
  @Input() userGroup: Array<ListaGrupoUsuarios> = [];
  @Output() userGroupEvent = new EventEmitter<EditUserGroupAction>();

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
    if(action && action!==''){
      this.userGroupEvent.emit({action,id,userGroupName})
    }
  }

  ngOnInit() {
  }

}
