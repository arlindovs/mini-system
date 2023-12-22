import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserGroupEvent } from 'src/app/models/enums/group/user/UserGroupEvent';
import { AddUserGroupAction } from 'src/app/models/interfaces/group/user/AddUserGroupAction';

@Component({
  selector: 'app-group-user-form',
  templateUrl: './group-user-form.component.html',
  styleUrls: []
})
export class GroupUserFormComponent implements OnInit {
  @Output() public userGroupCreateEvent = new EventEmitter<AddUserGroupAction>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(
    private formBuilderUserGroup: FormBuilder
  ) { }

  public addUserGroupAction = UserGroupEvent.ADD_USER_GROUP_ACTION
  public editUserGroupAction = UserGroupEvent.EDIT_USER_GROUP_ACTION
  public disableUserGroupAction = UserGroupEvent.DISABLE_USER_GROUP_ACTION
  public removeUserGroupAction = UserGroupEvent.REMOVE_USER_GROUP_ACTION

    public userGroupAction !: {event: any}

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

  public userGroupForm = this.formBuilderUserGroup.group({
    descricao:[''],
    });

  ngOnInit() {
  }

  handleSubmitAddUserGroupAction(){}

  handleSubmitEditUserGroupAction(){}


  handleSubmitRemoveUserGroupAction(){}

  handleSubmitDisableUserGroupAction(){}

}
