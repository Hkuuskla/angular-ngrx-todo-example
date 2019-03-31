import { Action } from '@ngrx/store';

import { User } from './../models/user';

export enum AuthActionTypes {
  Login           = '[Auth] Login',
  LoginSuccess    = '[Auth] Login success',
  LoginFailure    = '[Auth] Login failure',
  Logout          = '[Auth] Logout',
  LogoutSuccess   = '[Auth] Logout success',
  LogoutFailure   = '[Auth] Logout failure',
  Register        = '[Auth] Register',
  RegisterSuccess = '[Auth] Register success',
  RegisterFailure = '[Auth] Register failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: User) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;

  constructor(public payload: User) { }
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LogoutFailure;

  constructor(public payload: any) { }
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;

  constructor(public payload: User) { }
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;

  constructor(public payload: any) { }
}

export type AuthActions =
| Login
| LoginSuccess
| LoginFailure
| Logout
| LogoutSuccess
| LogoutFailure
| Register
| RegisterSuccess
| RegisterFailure;
