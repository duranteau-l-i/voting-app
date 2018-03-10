import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  admin: boolean;
  logged: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.admin = this.authService.isLogged('admin');
    this.logged = this.authService.isLogged('user');
  }

}
