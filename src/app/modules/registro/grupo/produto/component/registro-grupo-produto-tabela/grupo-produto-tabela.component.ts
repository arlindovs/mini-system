import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductGroupEvent } from 'src/app/models/enums/group/product/ProductGroupEvent';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { EditProductGroupAction } from 'src/app/models/interfaces/group/product/EditProductGroupAction';

@Component({
  selector: 'app-grupo-produto-tabela',
  templateUrl: './grupo-produto-tabela.component.html',
  styleUrls: []
})
export class GrupoProdutoTabelaComponent implements OnInit {
  @Output() public productGroupEvent = new EventEmitter<EditProductGroupAction>();

  constructor() { }

  public addProductGroupAction = ProductGroupEvent.ADD_PRODUCT_GROUP_ACTION
  public editProductGroupAction = ProductGroupEvent.EDIT_PRODUCT_GROUP_ACTION
  public disableProductGroupAction = ProductGroupEvent.DISABLE_PRODUCT_GROUP_ACTION
  public removeProductGroupAction = ProductGroupEvent.REMOVE_PRODUCT_GROUP_ACTION

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

  handleProductGroupEvent(action:string, id?: string, productGroupName?: string){
    if(action && action!==''){
      this.productGroupEvent.emit({action,id,productGroupName})
    }
  }

  ngOnInit() {
  }

}
