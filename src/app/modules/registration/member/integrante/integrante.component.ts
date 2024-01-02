import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { GrupoIntegrante } from 'src/app/models/interfaces/group/member/GrupoIntegranteResponse';
import { addIntegrante } from 'src/app/models/interfaces/member/AddIntegrante';
import { Column } from 'src/app/models/interfaces/member/Column';
import { EditIntegrante } from 'src/app/models/interfaces/member/EditIntegrante';
import { ExportColumn } from 'src/app/models/interfaces/member/ExportColumn';
import { Integrante } from 'src/app/models/interfaces/member/IntegranteResponse';
import { TipoDocumento } from 'src/app/models/interfaces/member/TipoDocumento';
import { addIntegranteEndereco } from 'src/app/models/interfaces/member/endereco/AddIntegranteEndereco';
import { EditIntegranteEndereco } from 'src/app/models/interfaces/member/endereco/EditIntegranteEndereco';
import { IntegranteEndereco } from 'src/app/models/interfaces/member/endereco/IntegranteEnderecoResponse';
import { Municipio } from 'src/app/models/interfaces/member/endereco/Municipio';
import { TipoLogradouroInterface } from 'src/app/models/interfaces/member/endereco/TipoLogradouroInterface';
import { UfInterface } from 'src/app/models/interfaces/member/endereco/UfInterface';
import { IntegranteService } from 'src/app/services/cadastro/integrante/integrante.service';
import { IntegranteEnderecoService } from 'src/app/services/integrante-endereco/integrante-endereco.service';

@Component({
  selector: 'app-integrante',
  templateUrl: './integrante.component.html',
  styleUrls: []
})
export class IntegranteComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('integranteTable') integranteTable: Table | undefined;

  /**
   * Flag para exibir ou ocultar o formulário dos integrantes.
   */
  public showForm = false;

  /**
   * Flag para exibir ou ocultar o formulário dos endereços integrantes.
   */
  public showEnderecoForm = false;


  /**
   * Lista de dados dos integrantes.
   */
  public integranteDatas: Array<Integrante> = [];

    /**
   * Grupo de usuário selecionado.
   */
  public integranteSelected!: Integrante[] | null;

   /**
   * Lista de dados dos Endereços Integrantes.
   */
   public integranteEnderecoDatas: Array<IntegranteEndereco> = [];

   /**
  * Endereço Integrante selecionado.
  */
 public integranteEnderecoSelected!: IntegranteEndereco[] | null;


 /**
   * Lista de dados de grupos de integrante.
   */
  public grupoIntegranteDatas: Array<GrupoIntegrante> = []

   /**
   * Grupo de usuário selecionado.
   */
   public grupoIntegranteSelecionado!: GrupoIntegrante[] | null;


  /**
   * Valor digitado no campo de pesquisa
   */
  valorPesquisa!: string;

  /**
   * Limpa a seleção da tabela.
   *
   * @public
   * @memberof Integrante Componente
   * @param {Table} table - Instância da tabela a ser limpa.
   * @returns {void}
   */

  clear(table: Table) {
    this.valorPesquisa = ""
    table.clear();
  }
  
  cols!: Column[];

  selectedColumns!: Column[];

  /**
   * Lista de Tipos de Logradouro para carregar no dropdown no campo Tipo Logradouro - formulário endereço
   */
  tipoLogradouro!: TipoLogradouroInterface[];
  
  /**
   * Tipo Logradouro selecionado no dropdown no campo Uf - formulário endereço
   */
  selectedTipoLogradouro!: TipoLogradouroInterface[];

  /**
   * Lista de Uf's para carregar no dropdown no campo Uf - formulário endereço
   */
  uf!: UfInterface[];

  /**
   * Uf selecionada no dropdown no campo Uf - formulário endereço
   */
  selectedUf!: UfInterface[];

  /**
   * Lista de Tipo Documento para carregar no dropdown no campo Tipo Documento - formulário integrante
   */
  tipoDocumento!: TipoDocumento[];

  /**
   * Tipo Documento selecionado no dropdown no campo Tipo Documento - formulário integrante
   */
  selectedTipoDocumento!: TipoDocumento[];

  exportColumns!: ExportColumn[];
  
  constructor(
    private integranteService: IntegranteService,
    private integranteEnderecoService: IntegranteEnderecoService,
    private messageService: MessageService,
    private router: Router,
    private formBuilderIntegrante: FormBuilder,
    private formBuilderIntegranteEndereco: FormBuilder,
    private confirmationService: ConfirmationService,) { }

    /**
   * Formulário reativo para adicionar/editar integrantes.
   */
  public integranteForm = this.formBuilderIntegrante.group({
    CODIGO: [null as bigint | null],
    grupoIntegrante: ['', Validators.required],
    tipoIntegrante: ['', Validators.required],
    nome: ['', Validators.required],
    nomeSecundario: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    documento: ['', Validators.required],
    dataCriacao: [{ value: null as Date | string | null, disabled: true }],
    status: [{ value: '', disabled: true }],
    empresa: [{ value: 1, disabled: true }],
    versao: [{ value: null as Date | string | null, disabled: true }],
  });

      /**
   * Formulário reativo para adicionar/editar endereços de integrantes.
   */
      public integranteEnderecoForm = this.formBuilderIntegranteEndereco.group({
        CODIGO: [null as bigint | null],
        integrante: ['', Validators.required],
        tipo: ['', Validators.required],
        inscricaoEstadual: ['', Validators.required],
        cep: ['', Validators.required],
        tipoLogradouro: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['', Validators.required],
        bairro: ['', Validators.required],
        municipio: ['', Validators.required],
        estado: ['', Validators.required],
        versao: [{ value: null as Date | string | null, disabled: true }],
      });

 /**
   * Inicialização do componente. Chama a função para listar os grupos de usuários.
   */
 ngOnInit(): void {
  this.listarIntegrante();

  this.cols = [
    { field: 'status', header: 'Status' },
    { field: 'empresa', header: 'Empresa' },
    { field: 'nome', header: 'Nome' },
    { field: 'nomeSecundario', header: 'Nome Secundário' },
    { field: 'documento', header: 'Documento' },
    { field: 'grupoUsuario', header: 'Grupo Usuário' },
];

this.selectedColumns = this.cols;

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
  ]
  
  this.selectedTipoLogradouro = this.tipoLogradouro

  this.uf =[
    {name:'Acre'},
    {name:'Alagoas'},
    {name:'Amazonas'},
    {name:'Amapá'},
    {name:'Bahia'},
    {name:'Ceará'},
    {name:'Distrito Federal'},
    {name:'Espírito Santo'},
    {name:'Goiás'},
    {name:'Maranhão'},
    {name:'Minas Gerais'},
    {name:'Mato Grosso do Sul'},
    {name:'Mato Grosso'},
    {name:'Paraíba'},
    {name:'Pernambuco'},
    {name:'Pará'},
    {name:'Piauí'},
    {name:'Paraná'},
    {name:'Rio de Janeiro'},
    {name:'Rio Grande do Norte'},
    {name:'Rondônia'},
    {name:'Roraima'},
    {name:'Rio Grande do Sul'},
    {name:'Santa Catarina'},
    {name:'Sergipe'},
    {name:'São Paulo'},
    {name:'Tocantins'}
  ]
  this.selectedUf = this.uf

  this.tipoDocumento =[
    {name:'CPF'},
    {name:'CNPJ'},
    {name:'CNH'}
  ]
  this.selectedTipoDocumento = this.tipoDocumento
  }

  /**
   * Aplica um filtro global na tabela de grupos de usuários.
   *
   * @param $event O evento que acionou a função.
   * @param stringVal O valor da string para filtrar.
   */
  applyFilterGlobal($event: any, stringVal: any) {
    this.integranteTable!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

   /**
   * Exporta os dados da tabela para um arquivo PDF.
   */
   exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.integranteDatas);
        doc.save('integrantes.pdf');
      });
    });
  }

  /**
   * Exporta os dados da tabela para um arquivo Excel.
   */
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.integranteDatas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'integrantes');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

    /**
   * Retorna a severidade com base no status fornecido.
   *
   * @param {string} status - Status a ser avaliado.
   * @returns {string} - Severidade correspondente.
   */
  getSeverity(status: string) {
    switch (status) {
      case 'ATIVO':
        return 'success';
      case 'DESATIVADO':
        return 'danger';
      default:
        return ''; // Add a default case that returns a default value
    }
  }

    /**
   * Manipulador de eventos para a seleção de uma linha na tabela.
   *
   * @param {*} event - Evento de seleção de linha.
   * @returns {void}
   */
    onRowSelect(event: any) {
      console.log('Linha selecionada:', event.data);
      this.integranteSelected = event.data;
    }

    /**
   * Verifica se o formulário está em modo de edição.
   *
   * @returns {boolean} - Verdadeiro se estiver em modo de edição, falso caso contrário.
   */
  isEdicao(): boolean {
    return !!this.integranteForm.value.CODIGO;
  }

  
    /**
   * Manipulador de eventos para o botão de adição de grupo.
   * Exibe o formulário de adição de grupo.
   */
    onAddIntegranteButtonClick() {
      this.showForm = true;
    }

     /**
   * Manipulador de eventos para o botão de adição de grupo.
   * Exibe o formulário de adição de grupo.
   */
    onAddEnderecoButtonClick() {
      this.showEnderecoForm = true;
    }

  

    /**
   * Manipulador de eventos para o botão de edição de grupo.
   * Exibe o formulário de edição de grupo.
   *
   * @param {GrupoUsuarios} member - Grupo de integrante a ser editado.
   * @returns {void}
   */
  onEditGroupButtonClick(member: Integrante): void {
    const formattedDate = format(new Date(member.versao as string), 'dd/MM/yyyy HH:mm:ss'); // Defina o formato da data
    console.log('Editar grupo de integrante:', formattedDate);
    if (member.status === 'DESATIVADO') {
      // Exibir pop-up informando que não é permitido editar um grupo desativado
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um grupo desativado.',
      });
    } else {
      this.showForm = true;
      this.integranteForm.setValue({
        CODIGO: null,
        grupoIntegrante: null,
        tipoIntegrante: null,
        nome: null,
        nomeSecundario: null,
        telefone: null,
        email:null ,
        tipoDocumento:null ,
        documento:null ,
        dataCriacao:null,
        status: null,
        empresa: 1,
        versao: null,
      });
      console.log(this.isEdicao());
    }
  }


  /**
   * Manipulador de eventos para o botão de desativação de grupo.
   * Desativa o grupo de usuário selecionado.
   *
   * @param {Integrante} integrante - Integrante a ser desativado.
   * @returns {void}
   */
  onDisableGroupButtonClick(integrante: Integrante): void {
    this.integranteForm.patchValue({
      CODIGO: integrante.CODIGO,
    });
    this.desativarIntegrante(integrante.CODIGO as bigint);
  }


  disableSelectedGroups() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir os grupos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.integranteDatas = this.integranteDatas.filter((val) => !this.integranteDatas?.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Grupos Excluídos', life: 3000 });
      }
    });
  }


    /**
   * Cancela o formulário de adição/editação e limpa os campos.
   */
  cancelarFormulario() {
    this.integranteForm.reset();
    this.showForm = false;
    this.listarIntegrante();
  }


  /**
   * Lista os grupos de usuários chamando o serviço correspondente.
   */
  listarIntegrante() {
    this.integranteService
      .listaIntegrantes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.integranteDatas = response;
          }
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao carregar o grupo de usuários',
            detail: error.message,
            life: 3000,
          });
          this.router.navigate(['/home']);
        },
      });
  }


  /**
   * Adiciona ou edita um grupo de usuário com base no estado do formulário.
   */
  adcionarOuEditarIntegrante(): void {
    if (this.isEdicao()) {
      this.editarIntegrante();
    } else {
      this.adcionarIntegrante();
    }
  }


  /**
   * Adiciona um novo grupo de usuário.
   */
  adcionarIntegrante(): void {
    if (this.integranteForm.valid) {
      const requestCriarIntegrante: addIntegrante = {
        tipoIntegrante: this.integranteForm.value.tipoIntegrante as string,
        grupoIntegrante:this.integranteForm.value.grupoIntegrante as string,
        nome: this.integranteForm.value.nome as string,
        segundoNome: this.integranteForm.value.nomeSecundario as string,
        telefone: this.integranteForm.value.telefone as string,
        email: this.integranteForm.value.email as string,
        tipoDocumento: this.integranteForm.value.tipoDocumento as string,
        documento: this.integranteForm.value.documento as string,
        empresa: this.integranteForm.getRawValue().empresa as number,
      };

      this.integranteService
        .addIntegrante(requestCriarIntegrante)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Sucesso ao cadastrar grupo de usuário:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Grupo de usuário criado com sucesso!',
              life: 3000,
            });

            // Resetar o formulário
            this.integranteForm.reset();

            // Voltar para a tabela
            this.showForm = false;

            // Recarregar os dados da tabela
            this.listarIntegrante();
          },
          error: (error) => {
            console.error('Erro ao cadastrar grupo de usuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar grupo de usuário!',
              life: 3000,
            });
          },
        });
    } else {
      console.warn('Formulário inválido. Preencha todos os campos.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos!',
        life: 3000,
      });
    }
  }

  /**
   * Lista os Enderecos dos Integrantes chamando o serviço correspondente.
   */
  listarIntegranteEndereco() {
    this.integranteEnderecoService
      .listaEndereco()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.integranteEnderecoDatas = response;
          }
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao carregar o grupo de usuários',
            detail: error.message,
            life: 3000,
          });
        },
      });
  }

/**
   * Adiciona um novo endereco.
   */
adcionarEndereco(): void {
  if (this.integranteEnderecoForm.valid) {
    const requestCriarEndereco: addIntegranteEndereco = {
      integrante: this.integranteEnderecoForm.value.integrante as string,
      tipo:this.integranteEnderecoForm.value.tipo as string,
      inscricaoEstadual: this.integranteEnderecoForm.value.inscricaoEstadual as string,
      cep: this.integranteEnderecoForm.value.cep as string,
      tipoLogradouro: this.integranteEnderecoForm.value.tipoLogradouro as string,
      logradouro: this.integranteEnderecoForm.value.logradouro as string,
      numero: this.integranteEnderecoForm.value.numero as string,
      complemento: this.integranteEnderecoForm.value.complemento as string,
      bairro: this.integranteEnderecoForm.value.bairro as string,
      municipio: this.integranteEnderecoForm.value.municipio as string,
      estado: this.integranteEnderecoForm.value.estado as string
    };

    this.integranteEnderecoService
      .addEndereco(requestCriarEndereco)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Sucesso ao cadastrar endereço:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Endereço criado com sucesso!',
            life: 3000,
          });
        },
        error: (error) => {
          console.error('Erro ao cadastrar endereço:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao cadastrar endereço!',
            life: 3000,
          });
        },
      });
  } else {
    console.warn('Formulário inválido. Preencha todos os campos.');
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos!',
      life: 3000,
    });
  }
}



  /**
   * Edita um integrante existente.
   */
  editarIntegrante(): void {
    if (this.integranteForm?.valid) {
      const requestEditarIntegrante: EditIntegrante = {
        CODIGO: this.integranteForm.value.CODIGO as bigint,
        tipoIntegrante: this.integranteForm.value.tipoIntegrante as string,
        grupoIntegrante:this.integranteForm.value.grupoIntegrante as string,
        nome: this.integranteForm.value.nome as string,
        segundoNome: this.integranteForm.value.nomeSecundario as string,
        telefone: this.integranteForm.value.telefone as string,
        email: this.integranteForm.value.email as string,
        tipoDocumento: this.integranteForm.value.tipoDocumento as string,
        documento: this.integranteForm.value.documento as string,
        dataCriacao: this.integranteForm.value.dataCriacao as string,
        status:this.integranteForm.value.status as string,
        versao:this.integranteForm.value.versao as string
      };

      // Chamar o serviço para editar o integrante
      this.integranteService
        .editIntegrante(requestEditarIntegrante)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Sucesso ao editar integrante:', response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Integrante editado com sucesso!',
                life: 3000,
              });
              this.integranteForm.reset();
              this.showForm = false;
              this.listarIntegrante();
            }
          },
          error: (error) => {
            console.error('Erro ao editar grupo de usuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar grupo de usuário!',
              life: 3000,
            });
          },
        });
    } else {
      console.warn('Formulário inválido. Preencha todos os campos.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos!',
        life: 3000,
      });
    }
  }

    /**
   * Edita um integrante existente.
   */
    editarEndereco(): void {
      if (this.integranteEnderecoForm?.valid) {
        const requestEditarEndereco: EditIntegranteEndereco = {
          CODIGO: this.integranteEnderecoForm.value.CODIGO as bigint,
          integrante: this.integranteEnderecoForm.value.integrante as string,
          tipo:this.integranteEnderecoForm.value.tipo as string,
          inscricaoEstadual: this.integranteEnderecoForm.value.inscricaoEstadual as string,
          cep: this.integranteEnderecoForm.value.cep as string,
          tipoLogradouro: this.integranteEnderecoForm.value.tipoLogradouro as string,
          logradouro: this.integranteEnderecoForm.value.logradouro as string,
          numero: this.integranteEnderecoForm.value.numero as string,
          complemento: this.integranteEnderecoForm.value.complemento as string,
          bairro: this.integranteEnderecoForm.value.bairro as string,
          municipio: this.integranteEnderecoForm.value.municipio as string,
          estado: this.integranteEnderecoForm.value.estado as string,
          versao:this.integranteEnderecoForm.value.versao as string
        };
  
        // Chamar o serviço para editar o integrante
        this.integranteEnderecoService
          .editEndereco(requestEditarEndereco)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response) {
                console.log('Sucesso ao editar endereço:', response);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Endereço editado com sucesso!',
                  life: 3000,
                });
                this.showForm = false;
              }
            },
            error: (error) => {
              console.error('Erro ao editar endereço:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao editar endereço!',
                life: 3000,
              });
            },
          });
      } else {
        console.warn('Formulário inválido. Preencha todos os campos.');
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Preencha todos os campos!',
          life: 3000,
        });
      }
    }


  /**
   * Desativa um grupo de usuário com o código fornecido.
   *
   * @param {bigint} CODIGO - Código do grupo de integrante a ser desativado.
   * @returns {void}
   */
  desativarIntegrante(CODIGO: bigint): void {
    console.log('Alterar o Status:', CODIGO);
    if (CODIGO) {
      this.integranteService
        .desativarIntegrante(CODIGO)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log(response)
            if (response) {
              console.log('Sucesso ao Alterar o Status!:', response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Status Alterado com sucesso!',
                life: 3000,
              });
              this.listarIntegrante();
            }
          },
          error: (error) => {
            console.error('Erro ao Alterar o Status!:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao Alterar o Status!!',
              life: 3000,
            });
          },
        });
    } else {
      console.warn('Nenhum grupo de usuário selecionado.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione um grupo de usuário!',
        life: 3000,
      });
    }
  }


  /**
   * Manipulador de eventos OnDestroy. Completa o subject de destruição.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
