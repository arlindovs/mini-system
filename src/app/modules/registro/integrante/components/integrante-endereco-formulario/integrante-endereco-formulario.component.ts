import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MemberAddressEvent } from 'src/app/models/enums/members/MemberAddressEvent';
import { TipoLogradouroInterface } from 'src/app/models/interfaces/member/endereco/TipoLogradouroInterface';
import { EditMemberAddressAction } from 'src/app/models/interfaces/member/event/EditMemberAddressAction';
import { UfInterface } from 'src/app/models/interfaces/member/endereco/UfInterface';

@Component({
  selector: 'app-member-address-form',
  templateUrl: './integrante-endereco-formulario.component.html',
  styleUrls: ['../../../../../../styles.css']
})
export class IntegranteEnderecoFormularioComponent  implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public addMemberAddressAction = MemberAddressEvent.ADD_MEMBER_ADDRESS_ACTION;

  public editMemberAddressAction = MemberAddressEvent.EDIT_MEMBER_ADDRESS_ACTION;

  public memberAddressAction!: { event: EditMemberAddressAction };

  public memberAddressForm = this.formBuilder.group({
    inscricaoEstadual: [''],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    tipoLogradouro: ['', Validators.required],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['', Validators.required],
    bairro: ['', Validators.required],
    municipio:['',Validators.required],
    estado:['',Validators.required]
  });
  
 inscricaoEstadual!: number;
 cep!: number;
 tipoLogradouro: TipoLogradouroInterface[] | undefined;
 tipoSelecionado : TipoLogradouroInterface | undefined;

  opcaoEstado: UfInterface[] | undefined;
  estadoSelecionado: UfInterface | undefined;

  constructor(private formBuilder: FormBuilder) { 
    this.tipoLogradouro = [
      {name: 'Rua'},
      {name: 'Avenida'},
      {name: 'Travessa'},
      {name: 'Alameda'},
      {name: 'Estrada'},
      {name: 'Rodovia'},
      {name: 'Praça'},
      {name: 'Largo'},
      {name: 'Beco'},
      {name: 'Viaduto'},
      {name: 'Jardim'},
      {name: 'Parque'},
      {name: 'Loteamento'},
      {name: 'Condomínio'},
      {name: 'Chácara'},
      {name: 'Fazenda'},
      {name: 'Sítio'},
      {name: 'Vila'},
      {name: 'Outros'}
    ],
    this.opcaoEstado =[
      {name: 'Acre'},
      {name: 'Alagoas'},
      {name:  'Amapá'},
      {name:  'Amazonas'},
      {name: 'Bahia'},
      {name: 'Ceará'},
      {name:  'Distrito Federal'},
      {name: 'Espírito Santo'},
      {name: 'Goiás'},
      {name:  'Maranhão'},
      {name: 'Mato Grosso'},
      {name: 'Mato Grosso do Sul'},
      {name: 'Minas Gerais'},
      {name: 'Pará'},
      {name:  'Paraíba'},
      {name: 'Paraná'},
      {name: 'Pernambuco'},
      {name: 'Piauí'},
      {name: 'Rio de Janeiro'},
      {name: 'Rio Grande do Norte'},
      {name: 'Rio Grande do Sul'},
      {name: 'Rondônia'},
      {name: 'Roraima'},
      {name: 'Santa Catarina'},
      {name: 'São Paulo'},
      {name: 'Sergipe'},
      {name: 'Tocantins'}
    ]
  };

  ngOnInit(): void {
  }

  handleSubmitMemberAddressAction(): void {
    if (this.memberAddressAction?.event?.action === this.addMemberAddressAction) {
      this.handleSubmitAddMemberAddress();
    } else if (this.memberAddressAction?.event?.action === this.editMemberAddressAction) {
      this.handleSubmitEditMemberAddress();
    }

    return;
  }

  handleSubmitAddMemberAddress(): void {
    document.getElementById("submit")?.closest
      
  }

  handleSubmitEditMemberAddress(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  

}
