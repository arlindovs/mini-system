import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserEvent } from 'src/app/models/enums/users/UserEvent';
import { EditUserAction } from 'src/app/models/interfaces/user/event/EditUserAction';
import { ListaTodosUsuarios } from 'src/app/models/interfaces/usuario/response/ListaTodosUsuarios';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: [],
})
export class UserTableComponent {
  @Input() users: Array<ListaTodosUsuarios> = [];
  @Output() userEvent = new EventEmitter<EditUserAction>();

  public addUserAction = UserEvent.ADD_USER_ACTION;

  public userSelected!: ListaTodosUsuarios;

  // ngOnInit(): void {
  //   this.users = this.users.map((user) => {
  //     return {
  //       ...user,
  //       CODIGO: user.CODIGO,
  //       login: user.login,
  //       };
  //     }
  //   );
  // }

  clear(table: Table) {
    table.clear();
}

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //     import('jspdf-autotable').then((x) => {
    //         const doc = new jsPDF.default('p', 'px', 'a4');
    //         (doc as any).autoTable(this.exportColumns, this.products);
    //         doc.save('products.pdf');
    //     });
    // });
  }

  exportExcel() {
    // import('xlsx').then((xlsx) => {
    //     const worksheet = xlsx.utils.json_to_sheet(this.products);
    //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     this.saveAsExcelFile(excelBuffer, 'products');
    // });
  }

  handleUserEnvent(action: string, id?: string, userName?: string): void {
    if (action && action !== '') {
      this.userEvent.emit({ action, id, userName });
    }
  }
}
