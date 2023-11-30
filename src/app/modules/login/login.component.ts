import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
    console.log(this.usuarioLogin);
    this.usuarioService.loginUser(this.usuarioLogin).subscribe(data=>{
      alert('Usuário logado com sucesso!');
      this.loginForm.reset();
      this.loginCard = true;
      this.router.navigate(['/home']);
      console.log(data);
    },error=>alert('Erro ao logar usuário!'));
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
}
