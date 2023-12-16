import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UnitMeasureEvent } from 'src/app/models/enums/unitMeasure/UnitMeasureEvent';
import { AddUnitMeasureAction } from 'src/app/models/interfaces/unitMeasure/AddUnitMeasureAction';
import { EventAction } from 'src/app/models/interfaces/unitMeasure/EventAction';

@Component({
  selector: 'app-unitMeasure-form',
  templateUrl: './unitMeasure-form.component.html',
  styleUrls: []
})
export class UnitMeasureFormComponent implements OnInit, OnDestroy {
  @Output() public unitMeasureCreateEvent = new EventEmitter<AddUnitMeasureAction>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(
    private formBuilderUnitMeasure: FormBuilder,
  ) {  }

  public addUnitMeasureAction = UnitMeasureEvent.ADD_UNIT_MEASURE_ACTION
  public editUnitMeasureAction = UnitMeasureEvent.EDIT_UNIT_MEASURE_ACTION
  public disableUnitMeasureAction = UnitMeasureEvent.DISABLE_UNIT_MEASURE_ACTION
  public removeUnitMeasureAction = UnitMeasureEvent.REMOVE_UNIT_MEASURE_ACTION

  public unitMeasureAction!: {event:EventAction}

  public unitMeasureForm = this.formBuilderUnitMeasure.group({
    description:['', Validators.required],
    abbreviation:['', Validators.required]
    });

formBuilder:any;


handleSubmitUnitMeasureAction(): void {
  if (this.unitMeasureAction?.event?.action === this.addUnitMeasureAction) {
    this.handleSubmitAddUnitMeasure();
  } else if (this.unitMeasureAction?.event?.action === this.editUnitMeasureAction) {
    this.handleSubmitEditUnitMeasure();
  }else if(this.unitMeasureAction?.event?.action === this.removeUnitMeasureAction){
    this.handleSubmitRemoveUnitMeasure()
  } else if(this.unitMeasureAction?.event?.action === this.removeUnitMeasureAction){
    this.handleSubmitDisableUnitMeasure()
  }
  return;
}
  ngOnInit() {
  }

  handleSubmitAddUnitMeasure(){

  }

  handleSubmitEditUnitMeasure(){
    
  }
  handleSubmitDisableUnitMeasure(){
    
  }
  handleSubmitRemoveUnitMeasure(){
    
  }

  ngOnDestroy(): void {
    
  }

}
