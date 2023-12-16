import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MemberGroupEvent } from 'src/app/models/enums/group/member/MemberGroupEvent';
import { EditMemberGroupAction } from 'src/app/models/interfaces/group/member/EditMemberGroupAction';

@Component({
  selector: 'app-grupo-integrante-tabela',
  templateUrl: './grupo-integrante-tabela.component.html',
  styleUrls: []
})
export class GrupoIntegranteTabelaComponent implements OnInit {
  @Output() public memberGroupEvent = new EventEmitter<EditMemberGroupAction>();

  constructor() { }

  public addMemberGroupAction = MemberGroupEvent.ADD_MEMBER_GROUP_ACTION
  public editMemberGroupAction = MemberGroupEvent.EDIT_MEMBER_GROUP_ACTION
  public disableMemberGroupAction = MemberGroupEvent.DISABLE_MEMBER_GROUP_ACTION
  public removerMemberGroupAction = MemberGroupEvent.REMOVE_MEMBER_GROUP_ACTION
  
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

  handleMemberGroupEvent(action:string, id?: string, memberGroupName?: string){
    if(action && action !== ''){
      this.memberGroupEvent.emit({action,id,memberGroupName})
    }
  }
  
  ngOnInit() {
  }

}
