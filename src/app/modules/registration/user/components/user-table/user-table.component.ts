import { Component, EventEmitter, Output } from '@angular/core';
import { UserEvent } from 'src/app/models/enums/categories/UserEvent';
import { EditUserAction } from 'src/app/models/interfaces/user/event/EditUserAction';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: []
})
export class UserTableComponent {

  @Output() public userEvent = new EventEmitter<EditUserAction>();

  public addUserAction = UserEvent.ADD_USER_ACTION;


  handleUserEnvent(action: string, id?: string, userName?: string): void {
    if (action && action !== '') {
      this.userEvent.emit({ action, id, userName });
    }
  }

}
