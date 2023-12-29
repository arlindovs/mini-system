import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AddGroupMember } from 'src/app/models/interfaces/group/member/AddGroupMember';
import { EditGroupMember } from 'src/app/models/interfaces/group/member/EditGroupMember';
import { GrupoIntegrante } from 'src/app/models/interfaces/group/member/GrupoIntegranteResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegranteGrupoService {
  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  listaGrupoUsuarios(): Observable<Array<GrupoIntegrante>> {
    return this.http.get<Array<GrupoIntegrante>>(
      `${this.API_URL}/integrante_grupos`,
      this.httpOptions
    );
  }

  addGrupoUsuario(requestDatas: AddGroupMember): Observable<Array<GrupoIntegrante>> {
    return this.http.post<Array<GrupoIntegrante>>(
      `${this.API_URL}/integrante_grupos`,
      requestDatas,
      this.httpOptions
    );
  }

  editGrupoUsuario(requestDatas: EditGroupMember): Observable<Array<GrupoIntegrante>> {
    return this.http.put<Array<GrupoIntegrante>>(
      `${this.API_URL}/integrante_grupos`,
      requestDatas,
      this.httpOptions
    );
  }

  desativarGrupoUsuario(CODIGO: bigint): Observable<Array<GrupoIntegrante>> {
    return this.http.post<Array<GrupoIntegrante>>(
      `${this.API_URL}/integrante_grupos/desativar/${CODIGO}`,
      this.httpOptions
    );
  }

}
