import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exerice } from '../exerice';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  training: Exerice[] = [];
  trainingSubscription!: Subscription;
  isLaoding = false
  isLaodingSubscription!:Subscription

  constructor(
    private trainingService: TrainingService,
  ) {}

  userId!:string

  ngOnInit(): void {
    this.isLaodingSubscription = this.trainingService.isLoading.subscribe((load)=>{
      this.isLaoding = load
    })

    this.trainingService
    .fetchFinishedExerices()
    this.trainingService.fetchAvailableTraining();
    this.trainingSubscription = this.trainingService.exerices$.subscribe((exe)=>{
      this.training = exe
    })




  }

  ngOnDestroy(){
    this.isLaodingSubscription.unsubscribe()
    this.trainingSubscription.unsubscribe()
  }

  onstartTraining(f: NgForm) {
    this.trainingService.getExerice(f.value.exerice);
  }
}
