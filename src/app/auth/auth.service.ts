import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AuthData } from './auth-data';

// ngrx
import { Store } from '@ngrx/store';
import * as fromApp  from '../appReducer'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = new Subject<boolean>();
  authSubscription!:Subscription
  isLoading = new BehaviorSubject<boolean>(false);
  userId!:string

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private _snackBar:MatSnackBar,
    private afs:AngularFirestore,
    private store:Store<{ui:fromApp.State}>
  ) {}

  authListner() {
    this.auth.authState.subscribe((user) => {
      if (user) {

        this.userId = user.uid

        this.isAuth.next(true);
        this.router.navigate(['/training']);
      } else {

        this.isAuth.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.isLoading.next(true)
    this.store.dispatch({type:'START'})
    this.auth
    .createUserWithEmailAndPassword(authData.email, authData.password)
    .then((res) => {
      this.isAuth.next(true);
      this.store.dispatch({type:'STOP'})


        // this.isLoading.next(false)
      })
      .catch((error) => {

        // this.isLoading.next(false)
        this.store.dispatch({type:'STOP'})

        this._snackBar.open(error.message, '', {
          duration: 2000,
        });
      }

      );
    }


    // function getRole(role) {
    //   return get(/databases/$(database)/documents/users
    //$(request.auth.uid)).data.roles[role]
    // }


    login(authData: AuthData) {
      this.isLoading.next(true)
      this.store.dispatch({type:'START'})


      this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        // this.updateUserData(res.user)
        console.log('meh', res.user);

        this.isLoading.next(false)
        this.store.dispatch({type:'STOP'})

        this.isAuth.next(true);
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.isLoading.next(false)
        this.store.dispatch({type:'STOP'})

        this._snackBar.open('Invalid email or password', '', {
          duration: 5000,
        });
      });

  }

   updateUserData(user:any) {
    // Sets user data to firestore on login
    const userRef = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true })
  }
}






