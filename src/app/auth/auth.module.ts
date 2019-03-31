import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPageComponent } from './containers/registration-page/registration-page.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ForgotPasswordPageComponent } from './containers/forgot-password-page/forgot-password-page.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import * as fromAuth from './reducers/auth.reducer';
import { LogoutPageComponent } from './containers/logout-page/logout-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegistrationPageComponent,
    RegistrationFormComponent,
    ForgotPasswordPageComponent,
    ForgotPasswordFormComponent,
    LogoutPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('auth', fromAuth.reducer, { metaReducers: fromAuth.metaReducers }),
  ]
})
export class AuthModule { }
