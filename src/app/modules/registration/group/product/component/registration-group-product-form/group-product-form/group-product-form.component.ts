import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductGroupEvent } from 'src/app/models/enums/group/product/ProductGroupEvent';
import { AddProductGroupAction } from 'src/app/models/interfaces/group/product/AddProductGroupAction';
import { EditProductGroupAction } from 'src/app/models/interfaces/group/product/EditProductGroupAction';
import { EventAction } from 'src/app/models/interfaces/EventAction';

@Component({
  selector: 'app-group-product-form',
  templateUrl: './group-product-form.component.html',
  styleUrls: []
})
export class GroupProductFormComponent implements OnInit,OnDestroy {

  @Output() public productGroupCreateEvent = new EventEmitter<AddProductGroupAction>();
  @Output() cancelEvent = new EventEmitter<void>();


  constructor(
    private formBuilderProductGroup: FormBuilder
  ) { }

  public addProductGroupAction = ProductGroupEvent.ADD_PRODUCT_GROUP_ACTION
  public editProductGroupAction = ProductGroupEvent.EDIT_PRODUCT_GROUP_ACTION
  public disableProductGroupAction = ProductGroupEvent.DISABLE_PRODUCT_GROUP_ACTION
  public removeProductGroupAction = ProductGroupEvent.REMOVE_PRODUCT_GROUP_ACTION

    public productGroupAction !: {event: EventAction}

    public productGroupForm = this.formBuilderProductGroup.group({
      descricao:['', Validators.required],
      });

      formBuilder:any;

      handleSubmitProductGroupAction(): void {
        if (this.productGroupAction?.event?.action === this.addProductGroupAction) {
          this.handleSubmitAddProductGroupAction();
        } else if (this.productGroupAction?.event?.action === this.editProductGroupAction) {
          this.handleSubmitEditProductGroupAction();
        }else if(this.productGroupAction?.event?.action === this.removeProductGroupAction){
          this.handleSubmitRemoveProductGroupAction()
        } else if(this.productGroupAction?.event?.action === this.disableProductGroupAction){
          this.handleSubmitDisableProductGroupAction()
        }
        return;
      }

  ngOnDestroy(): void {}

  ngOnInit() {
  }

  handleSubmitAddProductGroupAction(){}

  handleSubmitEditProductGroupAction(){}


  handleSubmitRemoveProductGroupAction(){}

  handleSubmitDisableProductGroupAction(){}
}
