import { LogoutPageComponent } from './containers/logout-page/logout-page.component';
import { ForgotPasswordPageComponent } from './containers/forgot-password-page/forgot-password-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegistrationPageComponent } from './containers/registration-page/registration-page.component';
import { LoginPageGuard } from './services/login-page.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
