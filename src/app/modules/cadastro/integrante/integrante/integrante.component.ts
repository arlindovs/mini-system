import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Column } from 'src/app/models/interfaces/Column';
import { ExportColumn } from 'src/app/models/interfaces/ExportColumn';
import { GrupoIntegrante } from 'src/app/models/interfaces/group/member/GrupoIntegranteResponse';
import { addIntegrante } from 'src/app/models/interfaces/member/AddIntegrante';
import { EditIntegrante } from 'src/app/models/interfaces/member/EditIntegrante';
import { Integrante } from 'src/app/models/interfaces/member/IntegranteResponse';
import { LoadEditIntegrante } from 'src/app/models/interfaces/member/LoadEditIntegrante';
import { TipoIntegrante } from 'src/app/models/interfaces/member/TipoIntegrante';
import { IntegranteGrupoService } from 'src/app/services/cadastro/grupo/integrante/integrante-grupo.service';
import { IntegranteService } from 'src/app/services/cadastro/integrante/integrante.service';


interface TipoDocumento{
  name: string
}

@Component({
  selector: 'app-integrante',
  templateUrl: './integrante.component.html',
  styleUrls: []
})
export class IntegranteComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  @ViewChild('integranteTable') integranteTable: Table | undefined;
 
   /**
   * Flag para exibir ou ocultar o formulário de grupo de usuário.
   */
 public showForm = false;

/**
  * Integrante selecionado
  */
public integranteDatas: Array<Integrante> = []


/**
  * Integrante selecionado
  */
public integranteSelecionadoDatas!: Array<Integrante> | null


public integranteSelecionado?: Integrante
 
  /**
  * Lista de dados de grupos de integrante
  */
  public grupoIntegranteData: Array<GrupoIntegrante> = []
 
  /**
   * Grupo de usuário selecionado.
   */
 public grupoIntegranteSelecionadoArr!: GrupoIntegrante[] | null;

  public grupoIntegranteSelecionado ?: GrupoIntegrante

 /**
   * Tipos de integrante.
   */
 public tipoIntegrante!: TipoIntegrante[]

 /**
   * Tipo de integrante selecionado.
   */
 public tipoIntegranteSelecionado!: TipoIntegrante[]

 
 public tipoIntegranteSelecionadoUnico?: TipoIntegrante

  public tipoDocumentoIntegrante!: TipoDocumento[]

  public tipoDocumentoIntegranteSelecionado!: TipoDocumento[] | null

 /**
   * Colunas Grid.
   */
 public colunas!: Column[]
/**
   * Colunas Grid Selecionadas.
   */
 public colunasSelecionadas!: Column[]


 exportColumns!: ExportColumn[];

 /**
   * Valor digitado no campo de pesquisa
   */
 valorPesquisa!: string;

 /**
   * Limpa a seleção da tabela.
   *
   * @public
   * @memberof GrupoIntegrante
   * @param {Table} table - Instância da tabela a ser limpa.
   * @returns {void}
   */
 clear(table: Table) {
  this.valorPesquisa = ""
  table.clear();
}
  constructor(
    private integranteFormBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private integranteService:IntegranteService,
    private router:Router,
    private integranteGrupoService:IntegranteGrupoService
  ) { }

  ngOnInit() {
    this.listarIntegrantes();
    this.listarGrupoIntegrante();
    this.colunas =[
      {field:'codigo', header: 'Código'},
      {field:'status', header: 'Status'},
      {field:'empresa', header: 'Empresa'},
      {field:'nome', header: 'Nome'},
      {field:'grupoIntegrante', header: 'Grupo de Integrante'},
      {field:'documento', header: 'Documento'},
      {field:'tipoIntegrante', header: 'Tipo de Integrante'},
      {field:'endereco', header: 'Endereço'}
    ]
    this.colunasSelecionadas = this.colunas

    this.tipoIntegrante = [
      {CODIGO: 1, tipo:'Cliente'},
      {CODIGO: 2,tipo:'Funcionário'},
      {CODIGO: 3,tipo:'Fornecedor'},
      {CODIGO: 4,tipo:'Transportadora'},
      {CODIGO: 5,tipo:'Contador'}
    ]
    this.tipoIntegranteSelecionado = this.tipoIntegrante

    this.tipoDocumentoIntegrante = [
      {name: 'CPF'},
      {name: 'CNPJ'},
      {name: 'CNH'}
    ]
    this.tipoDocumentoIntegranteSelecionado = this.tipoDocumentoIntegrante
  }

/**
   * Formulário reativo para adicionar/editar integrantes.
   */
public integranteForm = this.integranteFormBuilder.group({
  CODIGO: [null as bigint | null],
  grupoIntegrante: [this.grupoIntegranteSelecionado,[Validators.required]],
  tipoIntegrante: [this.tipoIntegranteSelecionadoUnico,[Validators.required]],
  nome: ['',Validators.required],
  segundoNome: ['',Validators.required],
  telefone: [''],
  email: [''],
  tipoDocumento: [''],
  documento: [''],
  dataCriacao: [{ value: null as Date | string | null, disabled: true }],
  status: [{ value: '', disabled: true }],
  empresa: [{ value: 1, disabled: true }],
  versao: [{ value: null as Date | string | null, disabled: true }],
});

/**
   * Aplica um filtro global na tabela de integrantes.
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
      (doc as any).autoTable(this.exportColumns, this.grupoIntegranteData);
      doc.save('integrante.pdf');
    });
  });
}

/**
 * Exporta os dados da tabela para um arquivo Excel.
 */
exportExcel() {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(this.grupoIntegranteData);
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
  console.log('Row selected:', event.data);
  this.integranteSelecionadoDatas = event.data;
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
 onAddButtonClick() {
  this.showForm = true;
  this.integranteForm.setValue({
    CODIGO: null,
    grupoIntegrante: this.grupoIntegranteSelecionado,
    tipoIntegrante: null,
    nome: null,
    segundoNome: null,
    telefone: null,
    email:null,
    tipoDocumento:null,
    documento:null,
    dataCriacao:null,
    status: null,
    empresa: 1,
    versao: null,
  });
}

onEditButtonClick(integrante: LoadEditIntegrante){
  const formattedDate = format(new Date(integrante.versao),'dd/MM/yyy HH:mm:ss');

  if(integrante.status === 'DESATIVADO'){
    this.confirmationService.confirm({
      header: 'Aviso',
      message:'Não é permitido editar um integrante desativado!'
    });
  } else{
    this.showForm == true;

    // this.integranteService.editIntegrante(integrante)

  // Encontrar o grupo com base na descrição

  const valorTipoIntegrante =  this.tipoIntegranteSelecionadoUnico?.tipo  || null;
  const valorGrupoIntegrante =  this.grupoIntegranteSelecionado?.descricao  || null;
  
    this.integranteForm.patchValue({
      CODIGO: integrante.CODIGO,
      grupoIntegrante: valorGrupoIntegrante as GrupoIntegrante | null,
      tipoIntegrante: valorTipoIntegrante as TipoIntegrante | null,
      nome: integrante.integrante.nome,
      segundoNome: integrante.integrante.segundoNome,
      telefone:integrante.integrante.telefone,
      email: integrante.integrante.email,
      tipoDocumento: integrante.integrante.tipoDocumento,
      documento: integrante.integrante.documento,
      status: integrante.status,
      empresa: integrante.empresa,
      versao: formattedDate,
    });
    console.log(this.isEdicao())
  }
}



onDisableButtonClick(integrante: Integrante): void {
  this.integranteForm.patchValue({
    CODIGO: integrante.CODIGO,
  });
  this.desativarIntegrante(integrante.CODIGO as bigint)
}

desabilitarIntegranteSelecionado() {
  this.confirmationService.confirm({
    message: 'Tem certeza de que deseja excluir os integrantes selecionados?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.integranteDatas = this.integranteDatas.filter((val) => !this.integranteSelecionadoDatas?.includes(val));
      this.integranteSelecionadoDatas = null;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Integrantes Excluídos', life: 3000 });
    }
  });
}

   /**
   * Cancela o formulário de adição/editação e limpa os campos.
   */
   cancelarFormulario() {
    this.integranteForm.reset();
    this.showForm = false;
    this.listarIntegrantes();
  }

  /**
   * Lista os grupos de usuários chamando o serviço correspondente.
   */
  listarIntegrantes() {
    this.integranteService
      .getAllIntegrantes()
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
            summary: 'Erro ao carregar o usuários',
            detail: error.message,
            life: 3000,
          });
          this.router.navigate(['/home']);
        },
      });
  }

   /**
   * Lista os grupos de usuários chamando o serviço correspondente.
   */
   listarGrupoIntegrante() {
    this.integranteGrupoService
      .listaGrupoIntegrantes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.grupoIntegranteData = response;
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
   * Adiciona um novo integrante.
   */
  adcionarIntegrante(): void {
    
    const valorGrupoIntegrante =  this.grupoIntegranteSelecionado;
      const valorTipoIntegrante =  this.tipoIntegranteSelecionadoUnico
      console.log(valorGrupoIntegrante);
      console.log(valorTipoIntegrante)

    if (this.integranteForm.valid) {
      const requestCreateUser: addIntegrante = {
        integranteGrupo: valorGrupoIntegrante as GrupoIntegrante | undefined,
        tipoIntegrante: valorTipoIntegrante as TipoIntegrante | undefined,
        nome: this.integranteForm.value.nome as string,     
        segundoNome: this.integranteForm.value.segundoNome as string,     
        telefone: this.integranteForm.value.telefone as string,     
        email: this.integranteForm.value.email as string,     
        tipoDocumento: this.integranteForm.value.tipoDocumento as string,     
        documento: this.integranteForm.value.documento as string,     
        empresa: this.integranteForm.getRawValue().empresa as number,
      };
      
      this.integranteService
        .addIntegrante(requestCreateUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Sucesso ao cadastrar usuário:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário criado com sucesso!',
              life: 3000,
            });

            // Resetar o formulário
            this.integranteForm.reset();

            // Voltar para a tabela
            this.showForm = false;

            // Recarregar os dados da tabela
            this.listarIntegrantes();
          },
          error: (error) => {
            console.error('Erro ao cadastrarusuário:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criarusuário!',
              life: 3000,
            });
          },
        });
    } else {
      console.log('Formulário inválido. Preencha todos os campos.', this.integranteForm);
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos!',
        life: 3000,
      });
    }
  }

/**
   * Edita um usuário existente.
   */
editarIntegrante(): void {
  if (this.integranteForm?.valid) {
    const requestEditUser: EditIntegrante = {
      CODIGO: this.integranteForm.value.CODIGO as bigint,
      integranteGrupo: this.integranteForm.value.grupoIntegrante as GrupoIntegrante,
      tipoIntegrante: this.integranteForm.value.tipoIntegrante?.tipo,
      nome: this.integranteForm.value.nome as string,
      segundoNome: this.integranteForm.value.segundoNome as string,
      telefone: this.integranteForm.value.telefone as string,
      email: this.integranteForm.value.email as string,
      tipoDocumento: this.integranteForm.value.tipoDocumento as string,
      documento: this.integranteForm.value.documento as string,
      status: this.integranteForm.value.status as string,
      versao: this.integranteForm.value.versao as string
    };

    // Chamar o serviço para editar o usuário
    this.integranteService
      .editIntegrante(requestEditUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('Sucesso ao editar usuário:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário editado com sucesso!',
              life: 3000,
            });
            this.integranteForm.reset();
            this.showForm = false;
            this.listarIntegrantes();
          }
        },
        error: (error) => {
          console.error('Erro ao editar usuário:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao editar usuário!',
            life: 3000,
          });
        },
      });
  } else {
    console.warn('Formulário inválido. Preencha todos os campos.', this.integranteForm);
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos!',
      life: 3000,
    });
  }
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
   * Desativa um integrante com o código fornecido.
   *
   * @param {bigint} CODIGO - Código do integrante a ser desativado.
   * @returns {void}
   */
 desativarIntegrante(CODIGO: bigint): void {
  console.log('Alterar o Status!:', CODIGO);
  if (CODIGO) {
    this.integranteService
      .desativarIntegrante(CODIGO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('Sucesso ao Alterar o Status!:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Status Alterado com sucesso!',
              life: 3000,
            });
            this.listarIntegrantes();
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
    console.warn('Nenhum integrante selecionado.');
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Selecione um integrante!',
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
