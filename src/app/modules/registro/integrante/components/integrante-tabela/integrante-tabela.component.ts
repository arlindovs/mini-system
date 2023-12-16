import { EventAction } from 'src/app/models/interfaces/member/event/EventAction';
import { Component, EventEmitter, Output } from '@angular/core';
import { MemberAddressEvent } from 'src/app/models/enums/members/MemberAddressEvent';
import { MemberEvent } from 'src/app/models/enums/members/MemberEvent';
import { EditMemberAction } from 'src/app/models/interfaces/member/event/EditMemberAction';



@Component({
  selector: 'app-integrante-tabela',
  templateUrl: './integrante-tabela.component.html',
  styleUrls: ['../../../../../../styles.css'],
})
export class IntegranteTabelaComponent {
  @Output() public memberEvent = new EventEmitter<EditMemberAction>();


  public addMemberAction = MemberEvent.ADD_MEMBER_ACTION;


  constructor() {}

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //     import('jspdf-autotable').then((x) => {
    //         const doc = new jsPDF.default('p', 'px', 'olumns, this.products);
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
    // });a4');
    //         (doc as any).autoTable(this.exportC
  }

  handleMemberEnvent(action: string, id?: string, memberName?: string): void {
    if (action && action !== '') {
      this.memberEvent.emit({ action, id, memberName });
    }
  }
}
