import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  data;
  message: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(value) {
    this.authService.changePassword(value).subscribe(res => {
      this.data = res;
      if (this.data.success === true) {
        this.message = 'Change password with success';
        setTimeout(() => {
          this.router.navigate(['/polls']);
        }, 1000);
      } else {
        this.message = 'fialed change password';
      }
    });
  }
}
