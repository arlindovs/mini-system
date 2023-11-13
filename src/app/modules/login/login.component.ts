import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  loginForm = this.formBuilder.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    senha: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.usuarioService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('token', response?.token);
            alert('Usuário autenticado com sucesso!');
            this.loginForm.reset();
          }
        },
        error: (err) => {
          alert(`Erro ao autenticar usuário: ${err.error.message}`);
          console.log('Erro ao autenticar usuário: ', err);
        },
      });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.usuarioService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário cadastrado com sucesso!');
              this.signupForm.reset();
              this.loginCard = true;
            }
          },
          error: (err) => {
            alert(`Erro ao cadastrar usuário: ${err.error.message}`);
            console.log('Erro ao cadastrar usuário: ', err);
          },
        });
    }
  }
}
