import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  name: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.name = this.authService.name;
  }
}
