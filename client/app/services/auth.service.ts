import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  AUTH_URL = 'http://localhost:3000/auth';

  logged: boolean;
  admin: boolean;
  localStorageData = 'data_login';
  name = '';
  data;

  constructor(private http: HttpClient, private router: Router) { }


  login(user) {
    return this.http.post<User>(`${this.AUTH_URL}/login`, user, httpOptions)
      .subscribe(res => {
        const data = {_id: res._id, name: res.name, role: res.role} ;
        const ls = JSON.stringify(data);
        localStorage.setItem(this.localStorageData, ls);
        this.name = res.name;
        if (res.role === 'user') {
          this.logged = true;
        } else if (res.role === 'admin') {
          this.logged = true;
          this.admin = true;
        }
      });
  }

  isLogged(status) {
    const ls = localStorage.getItem('data_login');
    if (JSON.parse(ls) !== null) {
      const lsp = JSON.parse(ls);
      if (lsp.role === status) {
        return true;
      }
    }
    return false;
  }

  logout() {
    this.name = '';
    localStorage.removeItem(this.localStorageData);
    this.router.navigate(['/']);
  }

  createUser(user) {
    return this.http.post<User>(`${this.AUTH_URL}/register`, user, httpOptions)
      .pipe(
        catchError(this.handleError(`create user`))
      )
      .map(res => res);
  }

  changePassword(passwords) {
    const {currentPassword, newPassword} = passwords;
    const data = {name: this.name, currentPassword: currentPassword, newPassword: newPassword};
    return this.http.post(`${this.AUTH_URL}/change-password`, data, httpOptions)
      .pipe(
        catchError(this.handleError(`change password`))
      )
      .map(res => res);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
