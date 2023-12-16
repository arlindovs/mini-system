import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserEvent } from 'src/app/models/enums/users/UserEvent';
import { EditUserAction } from 'src/app/models/interfaces/user/event/EditUserAction';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: [],
})
export class UsuarioFormularioComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public addUserAction = UserEvent.ADD_USER_ACTION;

  public editUserAction = UserEvent.EDIT_USER_ACTION;

  public userAction!: { event: EditUserAction };

  public userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    login: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(3)]],
    member_id: ['', Validators.required],
    groupMenber_id: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {}

  handleSubmitUserAction(): void {
    if (this.userAction?.event?.action === this.addUserAction) {
      this.handleSubmitAddUser();
    } else if (this.userAction?.event?.action === this.editUserAction) {
      this.handleSubmitEditUser();
    }

    return;
  }

  handleSubmitAddUser(): void {
    console.log('handleSubmitAddCategoryAction');
  }

  handleSubmitEditUser(): void {
    console.log('handleSubmitEditCategoryAction');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
