import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy, AfterViewInit {
  ongoiningTraining = false;
  trainingSubscription!: Subscription;
  isAllow = false
  isAllowSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    if (this.isAllowSubscription) {
      this.isAllowSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.authService.isAdmin()
     this.authService.isAllow$.subscribe(allow=>{
       this.isAllow = allow
     })
     console.log(this.isAllow);


    this.trainingSubscription = this.trainingService.exe$.subscribe(
      (isTraining) => {
        this.ongoiningTraining = isTraining;
      }
    );
  }

  ngAfterViewInit() {
    // this.isAllowSubscription = this.authService.user$.subscribe((user) => {
    //   if (user['roles']['admin']) {
    //     this.isAllow = true;
    //     console.log('view');

    //   }
    // });
  }

  goNext() {
    this.router.navigate(['/next']);
  }
}
