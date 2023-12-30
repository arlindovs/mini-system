import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { addIntegranteEndereco } from 'src/app/models/interfaces/member/endereco/AddIntegranteEndereco';
import { EditIntegranteEndereco } from 'src/app/models/interfaces/member/endereco/EditIntegranteEndereco';
import { IntegranteEndereco } from 'src/app/models/interfaces/member/endereco/IntegranteEnderecoResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegranteEnderecoService {

  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  listaEndereco(): Observable<Array<IntegranteEndereco>> {
    return this.http.get<Array<IntegranteEndereco>>(
      `${this.API_URL}/integrante_enderecos`,
      this.httpOptions
    );
  }

  addEndereco(requestDatas: addIntegranteEndereco): Observable<Array<IntegranteEndereco>> {
    return this.http.post<Array<IntegranteEndereco>>(
      `${this.API_URL}/integrante_enderecos`,
      requestDatas,
      this.httpOptions
    );
  }

  editEndereco(requestDatas: EditIntegranteEndereco): Observable<Array<IntegranteEndereco>> {
    return this.http.put<Array<IntegranteEndereco>>(
      `${this.API_URL}/integrante_enderecos`,
      requestDatas,
      this.httpOptions
    );
  }

}
