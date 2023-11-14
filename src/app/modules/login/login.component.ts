<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
=======
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCard = true;

<<<<<<< Updated upstream

  constructor() { }

  ngOnInit(): void {
  }

=======
  public loginForm: FormGroup;
  public signupForm: FormGroup;

  @Output() public closeModalEventEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();
name: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
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
    });
    }

  ngOnInit(): void {}



  public loginUser() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.usuarioService
        .loginUser(this.loginForm.value.name, this.loginForm.value.password)
        .subscribe((resp: any) => {
          alert('Usuário logado com sucesso!');
          this.signupForm.reset();
          this.loginCard = true;
        }, (error: any) => {
          alert(`Erro ao logar usuário: ${error.message}`);
          console.log('Erro ao logar usuário: ', error);
        });
    }
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


>>>>>>> Stashed changes
}
