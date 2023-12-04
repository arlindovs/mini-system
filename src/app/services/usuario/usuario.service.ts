import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { Observable, catchError } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/interfaces/usuario/signup/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/usuario/auth/AuthResponse';
import { GetAllUsersResponse } from 'src/app/models/interfaces/usuario/response/GetAllUsersResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }
  signupUser(usuario: SignupUserRequest) : Observable<string> {
    return this.http.post<string>(`${this.API_URL}usuarios`, usuario);
  }


    // loginUser(name: string, password: string): Observable<AuthRequest> {
    //   return this.http.get<AuthRequest>(`${this.API_URL}usuarios?name=${name}&password=${password}`)
    // }

    loginUser(usuario: AuthRequest): Observable<object> {
      console.log(usuario);
      return this.http.post(`${this.API_URL}usuarios/login`, usuario);
    }

    getAllUsuarios(): Observable<Array<GetAllUsersResponse>> {
      return this.http.get<Array<GetAllUsersResponse>>(
        `${this.API_URL}usuarios/tabela`,
        this.httpOptions
      );
    }


  }

