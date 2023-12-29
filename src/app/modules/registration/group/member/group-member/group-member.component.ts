import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { AddGroupMember } from 'src/app/models/interfaces/group/member/AddGroupMember';
import { Column } from 'src/app/models/interfaces/group/member/Column';
import { EditGroupMember } from 'src/app/models/interfaces/group/member/EditGroupMember';
import { ExportColumn } from 'src/app/models/interfaces/group/member/ExportColumn';
import { GrupoIntegrante } from 'src/app/models/interfaces/group/member/GrupoIntegranteResponse';
import { IntegranteGrupoService } from 'src/app/services/cadastro/grupo/integrante/integrante-grupo.service';


@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: []
})
export class GroupMemberComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('userGroupTable') userGroupTable: Table | undefined;

  /**
   * Flag para exibir ou ocultar o formulário de grupo de usuário.
   */
  public showForm = false;

  /**
   * Lista de dados de grupos de usuários.
   */
  public memberGroupDatas: Array<GrupoIntegrante> = [];

    /**
   * Grupo de usuário selecionado.
   */
  public memberGroupSelected!: GrupoIntegrante[] | null;

  /**
   * Valor digitado no campo de pesquisa
   */
  valorPesquisa!: string;

  /**
   * Limpa a seleção da tabela.
   *
   * @public
   * @memberof GroupUserComponent
   * @param {Table} table - Instância da tabela a ser limpa.
   * @returns {void}
   */

  clear(table: Table) {
    this.valorPesquisa = ""
    table.clear();
  }
  
  cols!: Column[];

  selectedColumns!: Column[];

  exportColumns!: ExportColumn[];
  
  constructor(
    private integranteGrupoService: IntegranteGrupoService,
    private messageService: MessageService,
    private router: Router,
    private formBuilderMemberGroup: FormBuilder,
    private confirmationService: ConfirmationService,) { }

    /**
   * Formulário reativo para adicionar/editar grupos de integrantes.
   */
  public memberGroupForm = this.formBuilderMemberGroup.group({
    CODIGO: [null as bigint | null],
    descricao: ['', Validators.required],
    status: [{ value: '', disabled: true }],
    empresa: [{ value: 1, disabled: true }],
    versao: [{ value: null as Date | string | null, disabled: true }],
  });

 /**
   * Inicialização do componente. Chama a função para listar os grupos de usuários.
   */
 ngOnInit(): void {
  this.listarGrupoIntegrante();

  this.cols = [
    { field: 'status', header: 'Status' },
    { field: 'empresa', header: 'Empresa' },
    { field: 'descricao', header: 'Descrição' }
];

this.selectedColumns = this.cols;

  }

  /**
   * Aplica um filtro global na tabela de grupos de usuários.
   *
   * @param $event O evento que acionou a função.
   * @param stringVal O valor da string para filtrar.
   */
  applyFilterGlobal($event: any, stringVal: any) {
    this.userGroupTable!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

   /**
   * Exporta os dados da tabela para um arquivo PDF.
   */
   exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.memberGroupDatas);
        doc.save('grupo_usuarios.pdf');
      });
    });
  }

  /**
   * Exporta os dados da tabela para um arquivo Excel.
   */
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.memberGroupDatas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'grupo_usuarios');
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
      this.memberGroupSelected = event.data;
    }

    /**
   * Verifica se o formulário está em modo de edição.
   *
   * @returns {boolean} - Verdadeiro se estiver em modo de edição, falso caso contrário.
   */
  isEdicao(): boolean {
    return !!this.memberGroupForm.value.CODIGO;
  }

  
    /**
   * Manipulador de eventos para o botão de adição de grupo.
   * Exibe o formulário de adição de grupo.
   */
    onAddGroupButtonClick() {
      this.showForm = true;
    }

    /**
   * Manipulador de eventos para o botão de edição de grupo.
   * Exibe o formulário de edição de grupo.
   *
   * @param {GrupoUsuarios} user - Grupo de usuário a ser editado.
   * @returns {void}
   */
  onEditGroupButtonClick(user: GrupoIntegrante): void {
    const formattedDate = format(new Date(user.versao as string), 'dd/MM/yyyy HH:mm:ss'); // Set the formatted date
    console.log('Editar grupo de usuário:', formattedDate);
    if (user.status === 'DESATIVADO') {
      // Exibir pop-up informando que não é permitido editar um grupo desativado
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um grupo desativado.',
      });
    } else {
      this.showForm = true;
      this.memberGroupForm.setValue({
        CODIGO: user.CODIGO,
        descricao: user.descricao,
        status: user.status,
        empresa: user.empresa,
        versao: formattedDate,
      });
      console.log(this.isEdicao());
    }
  }


  /**
   * Manipulador de eventos para o botão de desativação de grupo.
   * Desativa o grupo de usuário selecionado.
   *
   * @param {GrupoUsuarios} user - Grupo de usuário a ser desativado.
   * @returns {void}
   */
  onDisableGroupButtonClick(user: GrupoIntegrante): void {
    this.memberGroupForm.patchValue({
      CODIGO: user.CODIGO,
    });
    this.desativarGrupoIntegrante(user.CODIGO as bigint);
  }


  disableSelectedGroups() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir os grupos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.memberGroupDatas = this.memberGroupDatas.filter((val) => !this.memberGroupDatas?.includes(val));
        this.memberGroupSelected = null;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Grupos Excluídos', life: 3000 });
      }
    });
  }


    /**
   * Cancela o formulário de adição/editação e limpa os campos.
   */
  cancelarFormulario() {
    this.memberGroupForm.reset();
    this.showForm = false;
    this.listarGrupoIntegrante();
  }


  /**
   * Lista os grupos de usuários chamando o serviço correspondente.
   */
  listarGrupoIntegrante() {
    this.integranteGrupoService
      .listaGrupoUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.memberGroupDatas = response;
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
  adcionarOuEditarGrupoIntegrante(): void {
    if (this.isEdicao()) {
      this.editarGrupoIntegrante();
    } else {
      this.adcionarGrupoIntegrante();
    }
  }


  /**
   * Adiciona um novo grupo de usuário.
   */
  adcionarGrupoIntegrante(): void {
    if (this.memberGroupForm.valid) {
      const requestCreateMemberGroup: AddGroupMember = {
        descricao: this.memberGroupForm.value.descricao as string,
        empresa: this.memberGroupForm.getRawValue().empresa as number,
      };

      this.integranteGrupoService
        .addGrupoUsuario(requestCreateMemberGroup)
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
            this.memberGroupForm.reset();

            // Voltar para a tabela
            this.showForm = false;

            // Recarregar os dados da tabela
            this.listarGrupoIntegrante();
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
   * Edita um grupo de usuário existente.
   */
  editarGrupoIntegrante(): void {
    if (this.memberGroupForm?.valid) {
      const requestEditMemberGroup: EditGroupMember = {
        CODIGO: this.memberGroupForm.value.CODIGO as bigint,
        descricao: this.memberGroupForm.value.descricao as string,
        status: this.memberGroupForm.value.status as string,
        empresa: this.memberGroupForm.getRawValue().empresa as number,
      };

      // Chamar o serviço para editar o grupo de usuário
      this.integranteGrupoService
        .editGrupoUsuario(requestEditMemberGroup)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Sucesso ao editar grupo de usuário:', response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Grupo de usuário editado com sucesso!',
                life: 3000,
              });
              this.memberGroupForm.reset();
              this.showForm = false;
              this.listarGrupoIntegrante();
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
   * Desativa um grupo de usuário com o código fornecido.
   *
   * @param {bigint} CODIGO - Código do grupo de usuário a ser desativado.
   * @returns {void}
   */
  desativarGrupoIntegrante(CODIGO: bigint): void {
    console.log('Alterar o Status!:', CODIGO);
    if (CODIGO) {
      this.integranteGrupoService
        .desativarGrupoUsuario(CODIGO)
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
              this.listarGrupoIntegrante();
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
