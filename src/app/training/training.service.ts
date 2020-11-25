import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {   Subject, Subscription } from 'rxjs';
import { Exerice } from './exerice';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private firestore:AngularFirestore) { }


  exe$ = new Subject<boolean>();
  currenExe$!:Exerice
  exerices$ = new Subject<Exerice[]>()
  finishedExe$ = new Subject<Exerice[]>()
  trainingSubscriptions:Subscription[] = []



  completeOrCancelExerice:Exerice[] = []
  exerices:Exerice[] = []


  fetchFinishedExerices() {

    let exe:Exerice[] = [];
     this.trainingSubscriptions.push(this.firestore.collection('finishedExerices').snapshotChanges()
   .subscribe((result)=>{

    console.log(result);



     this.completeOrCancelExerice = result.map((res:any)=>{
       return res.payload.doc.data()
     })
     this.finishedExe$.next([...this.completeOrCancelExerice])

   }))
 }

   fetchAvailableTraining() {
     console.log('kollo');

     let exe:Exerice[] = [];
     this.trainingSubscriptions.push(this.firestore.collection('exerices').snapshotChanges()
    .subscribe((result)=>{
      result.forEach(res => {
         let data:any = res.payload.doc.data()
         exe.push({
          id:res.payload.doc.id,
          name : data['name'],
          duration : data['duration'],
          calories : data['calories']
        })

      });

      this.exerices = exe
      this.exerices$.next([...this.exerices])

    }))
  }



  getExerice(id:string){
    let exe = this.exerices.find(ex=> ex.id == id)
    if(exe){
      this.exe$.next(true)

      this.currenExe$ = exe
    }

  }

  completeExerice(){
    this.exe$.next(false)
    this.addDataToDatabase({...this.currenExe$,
      state:'completed',
       date:new Date()})

  }

  cancelExerice(){
    this.exe$.next(false)

    this.addDataToDatabase({...this.currenExe$,
      state:'canceled',
       date: new Date()})

  }

  addDataToDatabase(exerice:Exerice){
    this.firestore.collection('finishedExerices').add(exerice)
  }

  cancelSubscription(){
    this.trainingSubscriptions.forEach(ac=> ac.unsubscribe())
  }



}
