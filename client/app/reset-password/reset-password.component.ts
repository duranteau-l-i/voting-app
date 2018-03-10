import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  logged: boolean;
  data;
  message: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLogged('admin') || this.authService.isLogged('user')) {
      this.logged = true;
    }
  }

  onSubmit(value) {
    this.authService.changePassword(value)
        .subscribe(res => {
            console.log(res);
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
