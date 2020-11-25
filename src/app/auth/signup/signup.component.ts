import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  ngOnInit(): void {
  }
  // minDate: Date;
  maxDate: Date;

  constructor(private authService:AuthService) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear - 20, 11, 31);
  }

  onSubmit(form:NgForm){
    this.authService.registerUser({email:form.value.email, password:form.value.password})
    // console.log(form.value);

  }

}
