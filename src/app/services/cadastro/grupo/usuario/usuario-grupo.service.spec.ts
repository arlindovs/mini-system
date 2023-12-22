/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsuarioGrupoService } from './usuario-grupo.service';

describe('Service: UsuarioGrupo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioGrupoService]
    });
  });

  it('should ...', inject([UsuarioGrupoService], (service: UsuarioGrupoService) => {
    expect(service).toBeTruthy();
  }));
});
