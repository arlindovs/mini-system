import { EventAction } from 'src/app/models/interfaces/member/event/EventAction';
import { Component, EventEmitter, Output } from '@angular/core';
import { MemberAddressEvent } from 'src/app/models/enums/members/MemberAddressEvent';
import { MemberEvent } from 'src/app/models/enums/members/MemberEvent';
import { EditMemberAction } from 'src/app/models/interfaces/member/event/EditMemberAction';
import { OpenMemberFormAction } from 'src/app/models/interfaces/member/event/OpenMemberFormAction';


@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: [],
})
export class MemberTableComponent {
  @Output() public memberEvent = new EventEmitter<EditMemberAction>();

  @Output() public memberOpenFormEvent = new EventEmitter<OpenMemberFormAction>();
  @Output() public memberOpenTableEvent = new EventEmitter<OpenMemberFormAction>();

  public addMemberAction = MemberEvent.ADD_MEMBER_ACTION;

  public openMemberFormAction = true;
  public openMemberTableAction = false;

  constructor() {}

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

  handleMemberFormEvent(openForm: boolean): void {
    if (openForm) {
      this.memberOpenFormEvent.emit({ openForm: openForm });
    } else {
      this.memberOpenTableEvent.emit({ openForm: openForm = false });
    }
  }

  handleMemberEnvent(action: string, id?: string, memberName?: string): void {
    if (action && action !== '') {
      this.memberEvent.emit({ action, id, memberName });
    }
  }
}
