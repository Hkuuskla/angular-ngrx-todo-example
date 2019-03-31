import { Credentials } from './../models/credentials';
import * as AuthActions from './../actions/auth.actions';
import * as fromAuth from './../reducers/auth.reducer';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl    = '//localhost:3000/auth/login';
  logoutUrl   = '//localhost:3000/auth/logout';
  registerUrl = '//localhost:3000/auth/register';

  constructor(private http: HttpClient, private authStore: Store<fromAuth.State>) { }

  login(credentials: Credentials) {
    this.authStore.dispatch(new AuthActions.Login());

    return this.http.post<User>(this.loginUrl, credentials)
      .pipe(
        tap((user: User) => {
          this.authStore.dispatch(new AuthActions.LoginSuccess(user));
        }),
        catchError((err, caught) => {
          this.authStore.dispatch(new AuthActions.LoginFailure(err));
          return throwError(err);
        })
      );
  }

  logout() {
    this.authStore.dispatch(new AuthActions.Logout());

    return this.http.get<User>(this.logoutUrl)
      .pipe(
        tap((user: User) => {
          this.authStore.dispatch(new AuthActions.LogoutSuccess(user));
        }),
        catchError((err, caught) => {
          this.authStore.dispatch(new AuthActions.LogoutFailure(err));
          return throwError(err);
        })
      );
  }

  register(credentials: Credentials) {
    this.authStore.dispatch(new AuthActions.Register());

    return this.http.post<User>(this.registerUrl, credentials)
      .pipe(
        tap((user: User) => {
          this.authStore.dispatch(new AuthActions.RegisterSuccess(user));
        }),
        catchError((err, caught) => {
          this.authStore.dispatch(new AuthActions.RegisterFailure(err));
          return throwError(err);
        })
      );
  }
}
