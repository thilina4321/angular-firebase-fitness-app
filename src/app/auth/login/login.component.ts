import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false

  constructor(private authService:AuthService,
    ) { }
  isAuth = false;
  isLoadingSubscription!:Subscription

  ngOnDestroy(){
     this.isLoadingSubscription.unsubscribe()
  }

  ngOnInit(): void {

    this.isLoadingSubscription = this.authService.isLoading.subscribe(load=>{
      this.isLoading = load
      console.log(this.isLoading);

    })

  }

  onSubmit(form:NgForm){
    this.authService.login({email:form.value.email, password:form.value.password})
    // console.log(form.value);


  }

}
