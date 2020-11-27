import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromApp from '../../appReducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading$!:Observable<boolean>

  constructor(private authService:AuthService,
    private store:Store<{ui:fromApp.State}>
    ) { }
  isAuth = false;
  isLoadingSubscription!:Subscription

  ngOnDestroy(){
    //  this.isLoadingSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map(state=> state.ui.isLoading))
   console.log('log -->', this.isLoading$);

    // this.isLoadingSubscription = this.authService.isLoading.subscribe(load=>{
    //   this.isLoading = load
    //   console.log(this.isLoading);

    // })

  }

  onSubmit(form:NgForm){
    this.authService.login({email:form.value.email, password:form.value.password})
    // console.log(form.value);


  }

}
