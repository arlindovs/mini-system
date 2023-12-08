import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { TipoProduto } from 'src/app/models/enums/products/TipoProduto';
import { AddProductAction } from 'src/app/models/interfaces/product/AddProductAction';
import { EventAction } from 'src/app/models/interfaces/product/EventAction';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy {

  @Output() public productCreateEvent = new EventEmitter<AddProductAction>();
  @Output() cancelEvent = new EventEmitter<void>();

  public selectionTipoProduto !: FormGroup

  tipoProduto: string[] = TipoProduto;

  constructor(
    private formBuilderProduct: FormBuilder,
  ) {  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  public addProductAction = ProductEvent.ADD_PRODUCT_ACTION
  public editProductAction = ProductEvent.EDIT_PRODUCT_ACTION
  public disableProductAction = ProductEvent.DISABLE_PRODUCT_ACTION

  public productAction!:{event:EventAction}

  public productForm = this.formBuilderProduct.group({
    description: ['', Validators.required],
    perfilFiscal: ['', Validators.required],
    grupoProduto: [''],
    unidadeVenda: ['', Validators.required],
    unidadeCompra: ['', Validators.required],
    marca: [''],
    tipoProduto: ['', Validators.required],
    codBarras: [''],
    caracteristicas: ['']
  });
  formBuilder: any;

  selectedCaracteristicas: any[] = [];

  caracteristicasProduto: any[] = [
      { name: 'Permite alterar descrição?', key:'true'},
      { name: 'Permite alterar valor unitário?', key:'Permite alterar valor unitário' },
      { name: 'Permite desconto ou acréscimo?', key: 'Permite desconto ou acréscimo' },
      { name: 'Controla estoque', key: 'Controla estoque' },
      { name: 'Tipo Venda', key: 'Tipo Venda' },
      { name: 'Tipo Compra', key: 'Tipo Compra' },
      { name: 'Tipo Equipamento', key: 'Tipo Equipamento' },
      { name: 'Tipo Patrimonio', key: 'Tipo Patrimonio' },
      { name: 'Tipo Matéria-Prima', key: 'Tipo Matéria-Prima' }
  ];

  handleSubmitProductAction(): void {
    if (this.productAction?.event?.action === this.addProductAction) {
      this.handleSubmitAddProduct();
    } else if (this.productAction?.event?.action === this.editProductAction) {
      this.handleSubmitEditProduct();
    }else if(this.productAction?.event?.action === this.disableProductAction){
      this.handleSubmitDisableProuct()
    }
    return;
  }

  handleSubmitDisableProuct(): void{

  }
  
  handleSubmitEditProduct(): void{

  }

  handleSubmitAddProduct(): void{

  }

 

}
