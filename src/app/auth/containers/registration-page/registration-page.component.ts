import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  error: null | string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(credentials: Credentials) {
    console.log('submit')
    this.authService.register(credentials)
    .pipe(
      take(1),
      catchError((error) => {
        if (error.status === 409) {
          this.error = 'This username is taken!';
        } else {
          this.error = 'Unexpected error!';
        }

        return throwError(error);
      })
    )
    .subscribe(() => this.router.navigate(['/']));
  }

}
