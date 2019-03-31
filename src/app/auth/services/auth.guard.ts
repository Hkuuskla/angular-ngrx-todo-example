import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('authGuard')
    return this.store.pipe(
      select(fromAuth.getUser),
      map(user => {
        if (!user) {
          console.log('no user');
          this.router.navigate(['/login']);
          return false;
        }

        console.log('has user', user);

        return true;
      }),
      take(1)
    );
  }
}
