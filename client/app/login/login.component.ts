import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  message: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.logged = this.authService.isLogged('admin');
    this.logged = this.authService.isLogged('user');
  }

  onSubmit(value) {
    this.authService.login(value);
    setTimeout(() => {
      if (this.authService.isLogged('user') === true || this.authService.isLogged('admin') === true) {
        this.router.navigate(['/polls']);
      } else {
        this.message = 'Failed authentification';
      }
    }, 500);
  }

}
