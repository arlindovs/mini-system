import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { Observable, catchError } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/interfaces/usuario/signup/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/usuario/auth/AuthResponse';
import { GetAllUsersResponse } from 'src/app/models/interfaces/usuario/response/GetAllUsersResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  signupUser(usuario: SignupUserRequest): Observable<string> {
    return this.http.post<string>(`${this.API_URL}usuarios`, usuario);
  }

  loginUser(usuario: AuthRequest): Observable<AuthResponse> {
    console.log(usuario);
    return this.http.post<AuthResponse>(`${this.API_URL}autenticar`, usuario);
  }

  isLoggedIn() {
    const token = this.cookie.get('token');
    return token ? true : false;
  }

  getAllUsuarios(): Observable<Array<GetAllUsersResponse>> {
    return this.http.get<Array<GetAllUsersResponse>>(
      `${this.API_URL}usuarios/tabela`,
      this.httpOptions
    );
  }
}
