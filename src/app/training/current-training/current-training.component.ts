import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from '../stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer:any = 0;

  constructor(private dialog:MatDialog,
    private trainingService:TrainingService
    ) { }

     step!: number;
     ngOnInit(): void {

      this.step = (this.trainingService.currenExe$.duration / 100) * 1000
      console.log(this.step);

     this.timer = setInterval(()=>{
      this.progress += 1;
      if(this.progress >= 100){
        this.trainingService.completeExerice()
        clearInterval(this.timer)
      }
    }, this.step)
  }

  stopExerice(){

    clearInterval(this.timer)
      const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
        width: '250px',
        data: {progress:this.progress}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(!result){
          this.timer = setInterval(()=>{
            this.progress += 1;
            if(this.progress >= 100){
              this.trainingService.completeExerice()
              clearInterval(this.timer)
            }
          }, this.step)

        }else{
          this.trainingService.cancelExerice()

        }
      });
  }



}
