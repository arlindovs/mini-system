import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Column } from 'src/app/models/interfaces/Column';
import { ExportColumn } from 'src/app/models/interfaces/ExportColumn';
import { GrupoIntegrante } from 'src/app/models/interfaces/group/member/GrupoIntegranteResponse';
import { Integrante } from 'src/app/models/interfaces/member/IntegranteResponse';
import { LoadEditIntegrante } from 'src/app/models/interfaces/member/LoadEditIntegrante';

interface TipoIntegrante {
  name: string
}

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
public integranteDatas!: Array<Integrante>

  /**
  * Integrante selecionado
  */
 public integranteSelecionado!: Integrante

  /**
  * Lista de dados de grupos de integrante
  */
  public grupoIntegranteData: Array<GrupoIntegrante> = []
 
  /**
   * Grupo de usuário selecionado.
   */
 public grupoIntegranteSelecionado!: GrupoIntegrante[] | null;

 public grupoIntegrante ?: GrupoIntegrante

 /**
   * Tipos de integrante.
   */
 public tipoIntegrante!: TipoIntegrante[]

 /**
   * Tipo de integrante selecionado.
   */
 public tipoIntegranteSelecionado!: TipoIntegrante[]

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

  ) { }

  ngOnInit() {
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
      {name:'Cliente'},
      {name:'Funcionário'},
      {name:'Fornecedor'},
      {name:'Transportadora'},
      {name:'Contador'}
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
  grupoIntegrante: [this.grupoIntegrante,[Validators.required]],
  nome: ['',Validators.required],
  segundoNome: ['',Validators.required],
  telefone: ['',Validators.required],
  email: ['',Validators.required],
  tipoDocumento: ['',Validators.required],
  documento: ['',Validators.required],
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
    this.saveAsExcelFile(excelBuffer, 'usuarios');
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
  this.integranteSelecionado = event.data;
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
    grupoIntegrante: null,
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

    const valorGrupoIntegrante = this.grupoIntegrante?.descricao || null;
    
    this.integranteForm.patchValue({
      CODIGO: integrante.CODIGO,
      grupoIntegrante: valorGrupoIntegrante as GrupoIntegrante | null,
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

}
