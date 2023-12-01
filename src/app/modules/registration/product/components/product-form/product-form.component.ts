import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: [],
  })
  export class ProductFormComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    
  }