import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Column } from 'src/app/models/interfaces/Column';
import { ExportColumn } from 'src/app/models/interfaces/ExportColumn';
import { AddUser } from 'src/app/models/interfaces/usuario/AddUser';
import { EditUser } from 'src/app/models/interfaces/usuario/EditUser';
import { Usuarios } from 'src/app/models/interfaces/usuario/response/UsuariosResponse';
import { UsuarioService } from 'src/app/services/cadastro/usuario/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild('userTable') userTable: Table | undefined;

  /**
   * Flag para exibir ou ocultar o formulário de grupo de usuário.
   */
  public showForm = false;

  /**
   * Lista de dados de grupos de usuários.
   */
  public userDatas: Array<Usuarios> = [];

    /**
   * Grupo de usuário selecionado.
   */
  public userSelected!: Usuarios[] | null;

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
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router,
    private formBuilderUser: FormBuilder,
    private confirmationService: ConfirmationService,
  ) {}


  /**
   * Formulário reativo para adicionar/editar grupos de usuários.
   */
  public userForm = this.formBuilderUser.group({
    CODIGO: [null as bigint | null],
    usuarioGrupo: [null as bigint | null],
    funcionario: [null as bigint | null],
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    status: [{ value: '', disabled: true }],
    empresa: [{ value: 1, disabled: true }],
    versao: [{ value: null as Date | string | null, disabled: true }],
  });


  /**
   * Inicialização do componente. Chama a função para listar os grupos de usuários.
   */
  ngOnInit(): void {
    this.listarUsuarios();

    this.cols = [
      { field: 'status', header: 'Status' },
      { field: 'empresa', header: 'Empresa' },
      { field: 'usuarioGrupo.descricao', header: 'Grupo de Usuário' },
      { field: 'funcionario.nome', header: 'Funcionário' },
      { field: 'login', header: 'Login' },
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
    this.userTable!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  /**
   * Exporta os dados da tabela para um arquivo PDF.
   */
  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.userDatas);
        doc.save('usuarios.pdf');
      });
    });
  }

  /**
   * Exporta os dados da tabela para um arquivo Excel.
   */
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.userDatas);
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
    this.userSelected = event.data;
  }

  /**
   * Verifica se o formulário está em modo de edição.
   *
   * @returns {boolean} - Verdadeiro se estiver em modo de edição, falso caso contrário.
   */
  isEdicao(): boolean {
    return !!this.userForm.value.CODIGO;
  }

    /**
   * Manipulador de eventos para o botão de adição de grupo.
   * Exibe o formulário de adição de grupo.
   */
  onAddButtonClick() {
    this.showForm = true;
  }



  /**
   * Manipulador de eventos para o botão de edição de grupo.
   * Exibe o formulário de edição de grupo.
   *
   * @param {GrupoUsuarios} user - usuário a ser editado.
   * @returns {void}
   */
  onEditButtonClick(user: Usuarios): void {
    const formattedDate = format(new Date(user.versao as string), 'dd/MM/yyyy HH:mm:ss'); // Set the formatted date
    console.log('Editar usuário:', formattedDate);
    if (user.status === 'DESATIVADO') {
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um usuario desativado.',
      });
    } else {
      this.showForm = true;
      this.userForm.setValue({
        CODIGO: user.CODIGO,
        usuarioGrupo: user.usuarioGrupo,
        funcionario: user.funcionario,
        login: user.login,
        password: user.password,
        status: user.status,
        empresa: user.empresa,
        versao: formattedDate,
      });
      console.log(this.isEdicao());
    }
  }


  /**
   * Manipulador de eventos para o botão de desativação de grupo.
   * Desativa o usuário selecionado.
   *
   * @param {GrupoUsuarios} user - usuário a ser desativado.
   * @returns {void}
   */
  onDisableButtonClick(user: Usuarios): void {
    this.userForm.patchValue({
      CODIGO: user.CODIGO,
    });
    this.desativarUsuario(user.CODIGO as bigint);
  }


  disableSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir os usuarios selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userDatas = this.userDatas.filter((val) => !this.userSelected?.includes(val));
        this.userSelected = null;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuarios Excluídos', life: 3000 });
      }
    });
  }


    /**
   * Cancela o formulário de adição/editação e limpa os campos.
   */
  cancelarFormulario() {
    this.userForm.reset();
    this.showForm = false;
    this.listarUsuarios();
  }


  /**
   * Lista os grupos de usuários chamando o serviço correspondente.
   */
  listarUsuarios() {
    this.usuarioService
      .getAllUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.userDatas = response;
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
   * Adiciona ou edita um grupo de usuário com base no estado do formulário.
   */
  adcionarOuEditarUsuario(): void {
    if (this.isEdicao()) {
      this.editarUsuario();
    } else {
      this.adcionarUsuario();
    }
  }


  /**
   * Adiciona um novo usuário.
   */
  adcionarUsuario(): void {
    if (this.userForm.valid) {
      const requestCreateUser: AddUser = {
        usuarioGrupo: this.userForm.value.usuarioGrupo as bigint,
        funcionario: this.userForm.value.funcionario as bigint,
        login: this.userForm.value.login as string,
        password: this.userForm.value.password as string,
        empresa: this.userForm.getRawValue().empresa as number,
      };

      this.usuarioService
        .addUsuario(requestCreateUser)
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
            this.userForm.reset();

            // Voltar para a tabela
            this.showForm = false;

            // Recarregar os dados da tabela
            this.listarUsuarios();
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
   * Edita um usuário existente.
   */
  editarUsuario(): void {
    if (this.userForm?.valid) {
      const requestEditUser: EditUser = {
        CODIGO: this.userForm.value.CODIGO as bigint,
        usuarioGrupo: this.userForm.value.usuarioGrupo as bigint,
        funcionario: this.userForm.value.funcionario as bigint,
        login: this.userForm.value.login as string,
        password: this.userForm.value.password as string,
        status: this.userForm.value.status as string,
        empresa: this.userForm.getRawValue().empresa as number,
      };

      // Chamar o serviço para editar o usuário
      this.usuarioService
        .editUsuario(requestEditUser)
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
              this.userForm.reset();
              this.showForm = false;
              this.listarUsuarios();
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
   * Desativa um usuário com o código fornecido.
   *
   * @param {bigint} CODIGO - Código do usuário a ser desativado.
   * @returns {void}
   */
  desativarUsuario(CODIGO: bigint): void {
    console.log('Alterar o Status!:', CODIGO);
    if (CODIGO) {
      this.usuarioService
        .desativarUsuario(CODIGO)
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
              this.listarUsuarios();
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
      console.warn('Nenhum usuário selecionado.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione um usuário!',
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

