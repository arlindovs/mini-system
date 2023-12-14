import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnitMeasureEvent } from 'src/app/models/enums/unitMeasure/UnitMeasureEvent';
import { EditUnitMeasureAction } from 'src/app/models/interfaces/unitMeasure/EditUnitMeasureAction';

@Component({
  selector: 'app-unitMeasure-table',
  templateUrl: './unitMeasure-table.component.html',
  styleUrls: []
})
export class UnitMeasureTableComponent {
  @Output() public unitMeasureEvent = new EventEmitter<EditUnitMeasureAction>();

  public addUnitMeasureAction = UnitMeasureEvent.ADD_UNIT_MEASURE_ACTION
  public removeUnitMeasureAction = UnitMeasureEvent.REMOVE_UNIT_MEASURE_ACTION
  public editUnitMeasureAction = UnitMeasureEvent.EDIT_UNIT_MEASURE_ACTION
  public disableUnitMeasureAction = UnitMeasureEvent.DISABLE_UNIT_MEASURE_ACTION

  constructor() { }


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

  handleUnitMeasureEvent(action:string, id?: string, unitMeasureName?: string){
    if(action && action !== ''){
      this.unitMeasureEvent.emit({action,id,unitMeasureName})
    }
  }
  ngOnInit() {
  }

}
