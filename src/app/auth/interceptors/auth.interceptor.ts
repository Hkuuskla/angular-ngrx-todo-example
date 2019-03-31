import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const request = req.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      catchError(error => {
        console.log(error);

        if (error.status === 401 && this.router.url !== '/login') {
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }
}
