import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations:[
    SignupComponent,
    LoginComponent,
  ],
  imports:[
    CommonModule,
    SharedModule,
  ],
  exports:[],
})
export class AuthModule{

}
