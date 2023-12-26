import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AddGroupUser } from 'src/app/models/interfaces/group/user/AddGroupUser';
import { EditGroupUser } from 'src/app/models/interfaces/group/user/EditGroupUser';
import { GrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/GrupoUsuariosResponse';
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

  listaGrupoUsuarios(): Observable<Array<GrupoUsuarios>> {
    return this.http.get<Array<GrupoUsuarios>>(
      `${this.API_URL}/usuario_grupos`,
      this.httpOptions
    );
  }

  addGrupoUsuario(requestDatas: AddGroupUser): Observable<Array<GrupoUsuarios>> {
    return this.http.post<Array<GrupoUsuarios>>(
      `${this.API_URL}/usuario_grupos`,
      requestDatas,
      this.httpOptions
    );
  }

  editGrupoUsuario(requestDatas: EditGroupUser): Observable<Array<GrupoUsuarios>> {
    return this.http.put<Array<GrupoUsuarios>>(
      `${this.API_URL}/usuario_grupos`,
      requestDatas,
      this.httpOptions
    );
  }

  desativarGrupoUsuario(CODIGO: bigint): Observable<Array<GrupoUsuarios>> {
    return this.http.post<Array<GrupoUsuarios>>(
      `${this.API_URL}/usuario_grupos/desativar/${CODIGO}`,
      this.httpOptions
    );
  }
}
