import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training-dialog',
  templateUrl: './stop-training-dialog.component.html',
  styleUrls: ['./stop-training-dialog.component.css']
})
export class StopTrainingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {progress: string}) { }


  ngOnInit(): void {
  }

}
