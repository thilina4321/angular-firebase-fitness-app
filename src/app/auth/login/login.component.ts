import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
    ) { }
  isAuth = false;
  authSubscription!:Subscription

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.authService.login({email:form.value.email, password:form.value.password})
    // console.log(form.value);


  }

}
