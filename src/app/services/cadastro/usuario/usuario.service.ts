import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/usuario/auth/AuthResponse';
import { ListaTodosUsuarios } from 'src/app/models/interfaces/usuario/response/ListaTodosUsuariosResponse';
import { CookieService } from 'ngx-cookie-service';
import { CadastrarUsuarios } from 'src/app/models/interfaces/usuario/response/CadastrarUsuarios';
import { CadastrarUsuariosRequest } from 'src/app/models/interfaces/usuario/request/CadastrarUsuariosRequest';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  // signupUser(usuario: SignupUserRequest): Observable<string> {
  //   return this.http.post<string>(`${this.API_URL}usuarios`, usuario);
  // }

  loginUser(usuario: AuthRequest): Observable<AuthResponse> {
    console.log(usuario);
    return this.http.post<AuthResponse>(`${this.API_URL}/autenticar`, usuario);
  }

  isLoggedIn() {
    const token = this.cookie.get('token');
    return token ? true : false;
  }

  getAllUsuarios(): Observable<Array<ListaTodosUsuarios>> {
    return this.http.get<Array<ListaTodosUsuarios>>(
      `${this.API_URL}/usuarios`,
      this.httpOptions
    );
  }

  cadastrarUsuario(usuario: CadastrarUsuariosRequest): Observable<CadastrarUsuarios> {
    return this.http.post<CadastrarUsuarios>(
      `${this.API_URL}/usuarios`,
      usuario,
      this.httpOptions
    );
  }
}
