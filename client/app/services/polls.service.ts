import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Poll } from './poll';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class PollsService {
  private API_URL = 'http://localhost:3000/api';
  polls;
  id;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPolls() {
    return this.http
      .get(`${this.API_URL}/polls`)
      .map(res => res)
      .pipe(catchError(this.handleError('getPolls', [])));
  }

  getPollById(id) {
    return this.http
      .get(`${this.API_URL}/polls/${id}`)
      .pipe(catchError(this.handleError(`getPollById id=${id}`)));
  }

  getPollByUser() {
    const ls = JSON.parse(localStorage.getItem('data_login'));
    const name = ls.name;
    return this.http
      .get(`${this.API_URL}/polls/user/${name}`)
      .pipe(catchError(this.handleError(`get poll by name`)));
  }

  addPoll(poll) {
    return this.http
      .post<Poll>(`${this.API_URL}/new-poll`, poll, httpOptions)
      .pipe(catchError(this.handleError<Poll>('addPoll')));
  }

  polling(id, name) {
    return this.http
      .post(`${this.API_URL}/polling/${id}/${name}`, httpOptions)
      .pipe(catchError(this.handleError<Poll>('Polling')));
  }

  deletePoll(id) {
    return this.http
      .delete(`${this.API_URL}/delete-poll/${id}`, httpOptions)
      .pipe(catchError(this.handleError(`delete poll`)))
      .subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
