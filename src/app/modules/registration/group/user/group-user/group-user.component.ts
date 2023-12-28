import { DatePipe } from '@angular/common';
import { Status } from './../../../../../models/enums/Status.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { AddGroupUser } from 'src/app/models/interfaces/group/user/AddGroupUser';
import { EditGroupUser } from 'src/app/models/interfaces/group/user/EditGroupUser';
import { Perfil } from 'src/app/models/interfaces/group/user/Perfil';
import { GrupoUsuarios } from 'src/app/models/interfaces/usuario/grupo/response/GrupoUsuariosResponse';
import { UsuarioGrupoService } from 'src/app/services/cadastro/grupo/usuario/usuario-grupo.service';
import * as FileSaver from 'file-saver';


interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: []
})
export class GroupUserComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public showForm = false;

  public userGrupDatas: Array<GrupoUsuarios> = [];

  public userGroupSelected!: GrupoUsuarios;

  clear(table: Table) {
    table.clear();
  }

  colunas!: Column[];

  exportColumns!: ExportColumn[];

  perfis: Perfil[] = [
    { label: 'SUPER' },
    { label: 'ADMIN' },
    { label: 'USER' },
  ];

  selectedPerfil?: Perfil;

  constructor(
    private usuarioGrupoService: UsuarioGrupoService,
    private messageService: MessageService,
    private router: Router,
    private formBuilderUserGroup: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }



  public userGroupForm = this.formBuilderUserGroup.group({
    CODIGO: [null as bigint | null],
    descricao:['', Validators.required],
    perfil: [this.selectedPerfil, Validators.required],
    status: [{value: '', disabled: true}],
    empresa: [{ value: 1, disabled: true }],
    versao: [{value: null as DatePipe | string | null, disabled: true}],
    });


  ngOnInit(): void {
    this.listarGrupoUsuarios();

    this.exportColumns = this.colunas.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.userGrupDatas);
            doc.save('grupo_usuarios.pdf');
        });
    });
}

exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.userGrupDatas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'grupo_usuarios');
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

  onRowSelect(event: any) {
    console.log('Row selected:', event.data);
    this.userGroupSelected = event.data;
  }

  isEdicao(): boolean {
    return !!this.userGroupForm.value.CODIGO;
  }

  onAddGroupButtonClick() {
    this.showForm = true;
  }

  onEditGroupButtonClick(user: GrupoUsuarios): void {
    console.log('Editar grupo de usuário:', user.status)
    if (user.status === 'DESATIVADO') {
      // Exibir pop-up informando que não é permitido editar um grupo desativado
      this.confirmationService.confirm({
        header: 'Aviso',
        message: 'Não é permitido editar um grupo desativado.',
      });
    } else {
      this.showForm = true;
      this.selectedPerfil = this.perfis?.find(perfil => perfil.label === user.perfil.toString()); // Selecionar o perfil correspondente ao perfil do usuário
      this.userGroupForm.setValue({
        CODIGO: user.CODIGO,
        descricao: user.descricao,
        perfil: this.selectedPerfil, // Use a opção do dropdown correspondente ao perfil
        status: user.status,
        empresa: user.empresa,
        versao: user.versao,
      });
      console.log(this.isEdicao());
    }
  }




  onDisableGroupButtonClick(user: GrupoUsuarios): void {
    this.userGroupForm.patchValue({
      CODIGO: user.CODIGO,
    });
    this.desativarGrupoUsuario( user.CODIGO as bigint);
  }


  cancelarFormulario() {
    this.userGroupForm.reset();
    this.showForm = false;
    this.listarGrupoUsuarios();
  }


  listarGrupoUsuarios(){
    this.usuarioGrupoService
    .listaGrupoUsuarios()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response) {
          this.userGrupDatas = response;
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
    })
  }

  adcionarOuEditarGrupoUsuario(): void {
    if (this.isEdicao()) {
      this.editarGrupoUsuario();
    } else {
      this.adcionarGrupoUsuario();
    }
  }


  adcionarGrupoUsuario(): void {
    if (this.userGroupForm.valid) {
        const requestCreateUserGroup: AddGroupUser = {
          descricao: this.userGroupForm.value.descricao as string,
          perfil: this.selectedPerfil?.label || '',
          empresa: this.userGroupForm.getRawValue().empresa as number,
        };

        this.usuarioGrupoService
          .addGrupoUsuario(requestCreateUserGroup)
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
              this.userGroupForm.reset();

              // Voltar para a tabela
              this.showForm = false;

              // Recarregar os dados da tabela
              this.listarGrupoUsuarios();
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



  editarGrupoUsuario(): void {
    if (this.userGroupForm?.valid) {
      const requestEditUserGroup: EditGroupUser = {
        CODIGO: this.userGroupForm.value.CODIGO as bigint,
        descricao: this.userGroupForm.value.descricao as string,
        perfil: this.selectedPerfil?.label || '',
        status: this.userGroupForm.value.status as string,
        empresa: this.userGroupForm.getRawValue().empresa as number,
      };

      // Chamar o serviço para editar o grupo de usuário
      this.usuarioGrupoService
        .editGrupoUsuario(requestEditUserGroup)
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
              this.userGroupForm.reset();
              this.showForm = false;
              this.listarGrupoUsuarios();
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

  desativarGrupoUsuario(CODIGO: bigint): void {
    console.log('Alterar o Status!:', CODIGO);
    if (CODIGO) {
      this.usuarioGrupoService
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
              this.listarGrupoUsuarios();
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


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
