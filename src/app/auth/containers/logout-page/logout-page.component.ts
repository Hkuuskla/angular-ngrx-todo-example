import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  template: '',
  styleUrls: []
})
export class LogoutPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logout().subscribe();
    this.router.navigate(['/login']);
  }

}
