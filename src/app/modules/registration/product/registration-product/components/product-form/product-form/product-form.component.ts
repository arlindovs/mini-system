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
  public removeProductAction = ProductEvent.REMOVE_PRODUCT_ACTION

  public productAction!:{event:EventAction}

  public productForm = this.formBuilderProduct.group({
    descricao: ['', Validators.required],
    perfilFiscal: ['', Validators.required],
    grupoProduto: [''],
    unidadeVenda: ['', Validators.required],
    unidadeCompra: ['', Validators.required],
    marca: [''],
    tipoProduto: ['', Validators.required],
    codBarras: [''],
    alterarDescricao: [''],
    alterarValorUnitario: [''],
    permiteDescontoAcrescimo:[''],
    controlaEstoque:[''],
    tipoVenda:[''],
    tipoCompra:[''],
    tipoEquipamento:[''],
    tipoPatrimonio:[''],
    tipoMateriaPrima:['']
  });
  formBuilder: any;

  handleSubmitProductAction(): void {
    if (this.productAction?.event?.action === this.addProductAction) {
      this.handleSubmitAddProduct();
    } else if (this.productAction?.event?.action === this.editProductAction) {
      this.handleSubmitEditProduct();
    }else if(this.productAction?.event?.action === this.disableProductAction){
      this.handleSubmitDisableProuct()
    } else if(this.productAction?.event?.action === this.removeProductAction){

    }
    return;
  }

  handleSubmitDisableProuct(): void{

  }
  
  handleSubmitEditProduct(): void{

  }

  handleSubmitAddProduct(): void{

  }

  handleSubmitRemoveProduct(): void{

  }

}
