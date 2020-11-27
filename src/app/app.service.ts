import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training/training.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private auth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  logout() {
    this.auth.signOut();
    this.trainingService.cancelSubscription();
  }
}
