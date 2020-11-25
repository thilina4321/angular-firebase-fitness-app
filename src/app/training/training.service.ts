import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Exerice } from './exerice';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor() { }


  exerices$ = new BehaviorSubject<Exerice[]>([]);
  exe$ = new Subject<boolean>();
  currenExe$!:Exerice
  completeOrCancelExerice:Exerice[] = []

  exerices:Exerice[] = [
    {id:'1', name:'Streched', duration:30, calories:8},
    {id:'2', name:'Chumches', duration:60, calories:18},
    {id:'3', name:'Tobolo', duration:120, calories:9},
    {id:'4', name:'ArmGymsics', duration:180, calories:13},
  ];

  getTraining(){
    this.exerices$.next(this.exerices)
  }

  getAllTrainings(){
    return [...this.completeOrCancelExerice]
  }

  getExerice(id:string){
    let exe = this.exerices.find(ex=> ex.id == id)
    if(exe){
      this.exe$.next(true)

      this.currenExe$ = exe
    }

  }

  completeExerice(){
    this.completeOrCancelExerice.push({...this.currenExe$,
      state:'completed',
       date:new Date()})
       console.log('complete');
       this.exe$.next(false)

  }

  cancelExerice(){

    this.completeOrCancelExerice.push({...this.currenExe$,
      state:'canceled',
       date:new Date()})
       console.log('cancel');
       this.exe$.next(false)

  }



}
