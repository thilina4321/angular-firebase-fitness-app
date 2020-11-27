import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService:AuthService,
    private appService:AppService,
    ){}

  ngOnInit(){

    this.authService.authListner()

    this.authSubscription = this.authService.isAuth.subscribe((authStatus)=>{
      this.isAuth = authStatus;
    })

  }

  onLogout(){
    this.appService.logout()
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe()

    // this.authService.cancelAuthSubscription()
  }


}
