import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignupUserRequest } from 'src/app/models/interfaces/usuario/signup/SignupUserRequest';
import { Observable } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/interfaces/usuario/signup/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/usuario/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/usuario/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signupUser(requestDatas: SignupUserRequest) : Observable<string> {
    return this.http.post<string>(`${this.API_URL}usuarios`, requestDatas);
  }

  authUser(requestDatas: AuthRequest) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}usuarios`, requestDatas);
  }
}
