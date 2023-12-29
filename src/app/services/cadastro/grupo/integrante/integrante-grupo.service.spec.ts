/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntegranteGrupoService } from './integrante-grupo.service';

describe('Service: IntegranteGrupo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegranteGrupoService]
    });
  });

  it('should ...', inject([IntegranteGrupoService], (service: IntegranteGrupoService) => {
    expect(service).toBeTruthy();
  }));
});
