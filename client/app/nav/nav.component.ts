import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  name: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLogged('admin') || this.authService.isLogged('user')) {
      this.logged = true;
      const ls = JSON.parse(localStorage.getItem('data_login'));
      this.name = ls.name;
    }
  }

}
