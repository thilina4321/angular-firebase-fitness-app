import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations:[],
  imports:[
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
  ],
  exports:[
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
  ],
})
export class SharedModule{}
