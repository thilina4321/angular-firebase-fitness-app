import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(
    private trainingService: TrainingService,

    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.trainingService
    .fetchFinishedExerices()
    this.trainingService.fetchAvailableTraining();
    this.trainingSubscription = this.trainingService.exerices$.subscribe((exe)=>{
      this.training = exe
    })




  }

  ngOnDestroy(){
    this.trainingSubscription.unsubscribe()
  }

  onstartTraining(f: NgForm) {
    this.trainingService.getExerice(f.value.exerice);
  }
}
