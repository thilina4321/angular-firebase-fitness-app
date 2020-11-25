import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exerice } from '../exerice';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnDestroy,OnInit,AfterViewInit {

  constructor(private trainingService:TrainingService) { }
  trainingSubscription!:Subscription

  ngOnDestroy(){
    this.trainingSubscription.unsubscribe()
  }

  ngOnInit(): void {
    // let exe:Exerice[] = []

    this.trainingSubscription = this.trainingService.finishedExe$.subscribe((exe)=>{
      console.log(exe.length);

      this.dataSource.data = exe
    })


  }


  displayedColumns: string[] = ['date', 'name', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exerice>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilter(e: string){
    this.dataSource.filter = e.trim().toLowerCase()

  }
}






