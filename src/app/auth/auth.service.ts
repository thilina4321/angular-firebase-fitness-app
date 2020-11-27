import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data';

export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false
  authSubscription!: Subscription;
  isLoading = new BehaviorSubject<boolean>(false);
  userId!: string;
  user$!: Observable<any>;
  isAllow$ = new BehaviorSubject<boolean>(false);
  authStateSubscription!:Subscription

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private trainingService: TrainingService
  ) {}

  authListner() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['/training']);

        this.user$ = this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        // this.user$.subscribe((user)=>{
        //   if(user['roles']['admin']){
        //     this.isAllow = true
        //     console.log('allow dunna kollo');

        //   }

        // })


        this.userId = user.uid;
        this.isAuth = true
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.isLoading.next(true);
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.isAuth = true
        this.isLoading.next(false);
      })
      .catch((error) => {
        this.isLoading.next(false);
        this._snackBar.open(error.message, '', {
          duration: 2000,
        });
      });
  }

  // function getRole(role) {
  //   return get(/databases/$(database)/documents/users
  //$(request.auth.uid)).data.roles[role]
  // }

  login(authData: AuthData) {
    this.isLoading.next(true);

    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.updateUserData(res.user);

        this.isLoading.next(false);

        this.isAuth = true
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.isLoading.next(false);

        this._snackBar.open('Invalid email or password', '', {
          duration: 5000,
        });
      });
  }

  updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,

      roles: {
        subscriber: true,
      },
    };
    return userRef.set(data, { merge: true });
  }

  isAdmin(): any {
    this.authSubscription = this.user$.subscribe((user) => {
      if (user['roles']['admin']) {
        this.isAllow$.next(true)
        console.log('halooo');

      } else {
        this.isAllow$.next(false)
      }
    });


  }

  logout() {
    this.auth.signOut();
    this.trainingService.cancelSubscription();
    if(this.authStateSubscription){
      this.authStateSubscription.unsubscribe()
    }
    if(this.authSubscription){
      this.authSubscription.unsubscribe()
    }
  }
}
