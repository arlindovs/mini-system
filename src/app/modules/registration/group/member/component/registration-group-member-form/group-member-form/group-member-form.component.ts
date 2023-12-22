import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MemberGroupEvent } from 'src/app/models/enums/group/member/MemberGroupEvent';
import { AddMemberGroupAction } from 'src/app/models/interfaces/group/member/AddMemberGroupAction';
import { EventAction } from 'src/app/models/interfaces/EventAction';

@Component({
  selector: 'app-group-member-form',
  templateUrl: './group-member-form.component.html',
  styleUrls: []
})
export class GroupMemberFormComponent implements OnInit, OnDestroy {

    @Output() public memberGroupCreateEvent = new EventEmitter<AddMemberGroupAction>();
    @Output() cancelEvent = new EventEmitter<void>();


  constructor(
    private formBuilderMemberGroup: FormBuilder,
  ) { }

    public addMemberGroupAction = MemberGroupEvent.ADD_MEMBER_GROUP_ACTION
    public editMemberGroupAction = MemberGroupEvent.EDIT_MEMBER_GROUP_ACTION
    public disableMemberGroupAction = MemberGroupEvent.DISABLE_MEMBER_GROUP_ACTION
    public removerMemberGroupAction = MemberGroupEvent.REMOVE_MEMBER_GROUP_ACTION

    public memberGroupAction !: {event:EventAction}

    public memberGroupForm = this.formBuilderMemberGroup.group({
      description:['', Validators.required],
      });

      formBuilder: any;

      handleSubmitMemberGroupAction(): void {
        if (this.memberGroupAction?.event?.action === this.addMemberGroupAction) {
          this.handleSubmitAddMemberGroupAction();
        } else if (this.memberGroupAction?.event?.action === this.editMemberGroupAction) {
          this.handleSubmitEditMemberGroupAction();
        }else if(this.memberGroupAction?.event?.action === this.removerMemberGroupAction){
          this.handleSubmitRemoveMemberGroupAction()
        } else if(this.memberGroupAction?.event?.action === this.disableMemberGroupAction){
          this.handleSubmitDisableMemberGroupAction()
        }
        return;
      }


  ngOnInit() {
  }

  handleSubmitAddMemberGroupAction(){

  }
  handleSubmitEditMemberGroupAction(){

  }
  handleSubmitRemoveMemberGroupAction(){

  }
  handleSubmitDisableMemberGroupAction(){

  }

  ngOnDestroy():void{}

}
