import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:UserData | undefined;
  isAuth = new Subject<boolean>();

  constructor(private router:Router) { }

  registerUser(authData:AuthData){
    this.user = {
      email:authData.email,
      userId: (Math.round(Math.random() * 1000)).toString()
    }
    this.isAuth.next(true)
  }

  login(authData:AuthData){
    this.user = {
      email:authData.email,
      userId: (Math.round(Math.random() * 1000)).toString()
    }
    this.isAuth.next(true);
    if(this.isAuth){
      this.router.navigate(['/training'])
    }

  }

  logout(){
    this.user = undefined;
    this.isAuth.next(false)
    this.router.navigate(['/login'])
  }

  getUser(){
    return {...this.user}
  }



}
