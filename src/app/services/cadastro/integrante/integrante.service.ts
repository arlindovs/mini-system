import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { addIntegrante } from 'src/app/models/interfaces/member/AddIntegrante';
import { EditIntegrante } from 'src/app/models/interfaces/member/EditIntegrante';
import { Integrante } from 'src/app/models/interfaces/member/IntegranteResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {
  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  listaIntegrantes(): Observable<Array<Integrante>> {
    return this.http.get<Array<Integrante>>(
      `${this.API_URL}/integrante_grupos`,
      this.httpOptions
    );
  }

  addIntegrante(requestDatas: addIntegrante): Observable<Array<Integrante>> {
    return this.http.post<Array<Integrante>>(
      `${this.API_URL}/integrantes`,
      requestDatas,
      this.httpOptions
    );
  }

  editIntegrante(requestDatas: EditIntegrante): Observable<Array<Integrante>> {
    return this.http.put<Array<Integrante>>(
      `${this.API_URL}/integrantes`,
      requestDatas,
      this.httpOptions
    );
  }

  desativarIntegrante(CODIGO: bigint): Observable<Array<Integrante>> {
    return this.http.post<Array<Integrante>>(
      `${this.API_URL}/integrantes/desativar/${CODIGO}`,
      this.httpOptions
    );
  }

}
