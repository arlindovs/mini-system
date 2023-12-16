import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserEvent } from 'src/app/models/enums/users/UserEvent';
import { AddIntegranteAction } from 'src/app/models/interfaces/member/event/AddIntegranteAction';
import { EditUserAction } from 'src/app/models/interfaces/user/EditUserAction';
import { EventAction } from 'src/app/models/interfaces/user/EventAction';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: [],
})
export class UsuarioFormularioComponent implements OnInit, OnDestroy {
  @Output() public productCreateEvent = new EventEmitter<AddIntegranteAction>();
  @Output() cancelEvent = new EventEmitter<void>();

  private readonly destroy$: Subject<void> = new Subject<void>();

  public addUserAction = UserEvent.ADD_USER_ACTION;

  public editUserAction = UserEvent.EDIT_USER_ACTION;

  public userAction!: { event:EventAction };

  constructor(
    private formBuilderUsuario: FormBuilder,
  ) {}

  public userForm = this.formBuilderUsuario.group({
    funcionario_id: ['', [Validators.required, Validators.minLength(3)]],
    grupoUsuario_id: ['', Validators.required],
    login: ['', [Validators.required, Validators.minLength(3)]],
    senha: ['', Validators.required]
  });
  formBuilder: any;

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
