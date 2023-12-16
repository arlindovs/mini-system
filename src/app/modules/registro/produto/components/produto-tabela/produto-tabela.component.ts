import { Component, Output, EventEmitter } from '@angular/core';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { EditProductAction } from 'src/app/models/interfaces/product/EditProductAction';


@Component({
  selector: 'app-produto-tabela',
  templateUrl: './produto-tabela.component.html',
  styleUrls: [],
})
export class ProdutoTabelaComponent {

 @Output() public productEvent = new EventEmitter<EditProductAction>();

  public addProductAction = ProductEvent.ADD_PRODUCT_ACTION

  public editProductAction = ProductEvent.EDIT_PRODUCT_ACTION

  showForm = false;

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

  handleProductEvent(action: string, id?: string, productName?: string){
    if(action && action !== ''){
      this.productEvent.emit({action, id, productName})}
  }

}
