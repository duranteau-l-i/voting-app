import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  message: string;
  data;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.logged = this.authService.isLogged('admin');
    this.logged = this.authService.isLogged('user');
  }

  onSubmit(formData) {
    formData.role = 'user';
    const name = formData.name;
    const password = formData.password;
    this.authService.createUser(formData)
        .subscribe(res => {
          console.log(res);
          this.data = res;
          if (this.data.success === true) {
            this.message = 'Register with success';
            this.authService.login({name: name, password: password});
            setTimeout(() => {
              this.router.navigate(['/polls']);
            }, 1000);
          } else {
            this.message = 'fialed register. Email al ready exists.';
          }
        });
  }

}
