import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
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
    tipoIntegrante: ['', Validators.required],
    name: ['', Validators.required],
    secondName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth: ['', [Validators.required, Validators.minLength(8)]],
    groupMember_id: ['', Validators.required],
    address: ['', Validators.required],
  });
  formBuilder: any;

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
