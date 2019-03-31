import { catchError, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { Credentials } from './../../models/credentials';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  error: null | string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(credentials: Credentials) {
    console.log('submit')
    this.authService.login(credentials)
    .pipe(
      take(1),
      catchError((error) => {
        if (error.status === 401) {
          this.error = 'Username or password is incorrect!';
        } else {
          this.error = 'Unexpected error!';
        }

        return EMPTY;
      })
    )
    .subscribe(() => this.router.navigate(['/']));
  }

}
