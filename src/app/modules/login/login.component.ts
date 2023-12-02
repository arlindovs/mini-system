import { MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loginCard = true;

  usuarioLogin: AuthRequest = new AuthRequest();

  roles: string[] = ['ADMIN', 'USER'];

  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public selectRole: FormGroup;

  @Output() public closeModalEventEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.selectRole = this.formBuilder.group({
      name: new FormControl(''),
    });

    this.loginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      role: new FormControl('', [Validators.required]),
    });
    }

  ngOnInit(): void {
  }



  userLogin() {
    this.usuarioService.loginUser(this.usuarioLogin)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(data=>{
      this.loginForm.reset();
      this.loginCard = true;
      this.router.navigate(['/home']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Bem vindo de volta!`,
        life: 2000,
      });
      console.log(data);
    },error=>
    {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `${error.error.message}`,
        life: 2000,
      });
      console.log(error);
    }
    );
  }


  public createNewUser(){
    if(this.signupForm.value && this.signupForm.valid){
      this.usuarioService.signupUser(this.signupForm.value).subscribe((resp: any) => {
        alert('Usuário cadastrado com sucesso!');
              this.signupForm.reset();
              this.loginCard = true;
      }, (error: any) => {
        alert(`Erro ao cadastrar usuário: ${error.message}`);
            console.log('Erro ao cadastrar usuário: ', error);
      }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
