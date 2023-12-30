/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntegranteService } from './integrante.service';

describe('Service: Integrante', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegranteService]
    });
  });

  it('should ...', inject([IntegranteService], (service: IntegranteService) => {
    expect(service).toBeTruthy();
  }));
});
