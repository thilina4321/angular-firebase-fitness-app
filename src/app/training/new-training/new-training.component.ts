import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exerice } from '../exerice';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  training:Exerice[] = []

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {

    this.trainingService.getTraining()
    this.trainingService.exerices$.subscribe((trainingData)=>{
      this.training = trainingData;
    })
  }

  onstartTraining(f:NgForm){

    this.trainingService.getExerice(f.value.exerice)
  }


}
