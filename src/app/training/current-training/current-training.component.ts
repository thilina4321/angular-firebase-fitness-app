import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from '../stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer:any = 0;
  @Output() end = new EventEmitter<void>();

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
     this.timer = setInterval(()=>{
      this.progress += 20;
      if(this.progress >= 100){
        clearInterval(this.timer)
      }
    }, 1000)
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
            this.progress += 20;
            if(this.progress >= 100){
              clearInterval(this.timer)
            }
          }, 1000)

        }else{
          this.end.emit()
        }
      });
  }



}
