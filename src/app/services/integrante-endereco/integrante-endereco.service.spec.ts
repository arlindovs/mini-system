/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntegranteEnderecoService } from './integrante-endereco.service';

describe('Service: IntegranteEndereco', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegranteEnderecoService]
    });
  });

  it('should ...', inject([IntegranteEnderecoService], (service: IntegranteEnderecoService) => {
    expect(service).toBeTruthy();
  }));
});
