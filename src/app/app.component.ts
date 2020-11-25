import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService:AuthService){}

  ngOnInit(){

    this.authService.authListner()

    this.authSubscription = this.authService.isAuth.subscribe((authStatus)=>{
      this.isAuth = authStatus;
    })

  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe()
    // this.authService.cancelAuthSubscription()
  }


}
