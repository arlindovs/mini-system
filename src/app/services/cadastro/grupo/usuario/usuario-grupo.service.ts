import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ListaGrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/ListaGrupoUsuariosResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGrupoService {
  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  listaGrupoUsuarios(): Observable<Array<ListaGrupoUsuarios>> {
    return this.http.get<Array<ListaGrupoUsuarios>>(
      `${this.API_URL}/usuario_grupos`,
      this.httpOptions
    );
  }

  addGrupoUsuario(requestDatas: {
    descricao: string;
    perfil: string;
    empresa: number;
  }): Observable<Array<ListaGrupoUsuarios>> {
    return this.http.post<Array<ListaGrupoUsuarios>>(
      `${this.API_URL}/usuario_grupos`,
      requestDatas,
      this.httpOptions
    );
  }
}
