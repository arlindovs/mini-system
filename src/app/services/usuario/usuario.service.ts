import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { Observable, catchError } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/interfaces/usuario/signup/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/usuario/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }
  signupUser(usuario: SignupUserRequest) : Observable<string> {
    return this.http.post<string>(`${this.API_URL}usuarios`, usuario);
  }


    loginUser(name: string, password: string): Observable<AuthRequest> {
      return this.http.get<AuthRequest>(`${this.API_URL}usuarios?name=${name}&password=${password}`)
    }
  }

