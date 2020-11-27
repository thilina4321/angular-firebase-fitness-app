import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';
import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NextComponent } from './next/next.component';

@NgModule({
  declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    NewTrainingComponent,
    StopTrainingDialogComponent,
    PastTrainingComponent,
    NextComponent,
  ],
  imports:[
    CommonModule,
    SharedModule,
  ],
  exports:[]
})
export class TraningModule{}
