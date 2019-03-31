import { Action, ActionReducer, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { User } from './../models/user';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case AuthActionTypes.RegisterSuccess: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case AuthActionTypes.Logout: {
      return {
        ...state,
        user: null
      };
    }

    default:
      return state;
  }
}

export function localStorageSyncReducer(r: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['user'], rehydrate: true})(r);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const selectAuthState = createFeatureSelector<State>('auth');

export const getUser = createSelector(
  selectAuthState,
  (state: State) => state.user
);
