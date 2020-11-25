import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = new Subject<boolean>();
  authSubscription!:Subscription

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private auth: AngularFireAuth
  ) {}

  authListner() {
    this.auth.authState.subscribe((user) => {
      if (user) {

        this.isAuth.next(true);
        this.router.navigate(['/training']);
      } else {

        this.isAuth.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.isAuth.next(true);
      })
      .catch((error) => console.log(error));
  }

  login(authData: AuthData) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {

        this.isAuth.next(true);
        this.router.navigate(['/training']);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  logout() {
    this.auth.signOut();
    this.trainingService.cancelSubscription();

  }

}
