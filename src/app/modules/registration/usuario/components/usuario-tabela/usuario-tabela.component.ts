import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserEvent } from 'src/app/models/enums/users/UserEvent';
import { EditUserAction } from 'src/app/models/interfaces/user/event/EditUserAction';
import { GetAllUsersResponse } from 'src/app/models/interfaces/usuario/response/GetAllUsersResponse';


@Component({
  selector: 'app-usuario-tabela',
  templateUrl: './usuario-tabela.component.html',
  styleUrls: [],
})
export class UsuarioTabelaComponent {
  @Input() public users: Array<GetAllUsersResponse> = [];
  @Output() public userEvent = new EventEmitter<EditUserAction>();

  public addUserAction = UserEvent.ADD_USER_ACTION;

  public userSelected!: GetAllUsersResponse;

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