import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(value) {
    this.authService.login(value);
    setTimeout(() => {
      if (this.authService.isLogged() === true) {
        this.router.navigate(['/polls']);
      } else {
        this.message = 'Failed authentification';
      }
    }, 500);
  }
}
