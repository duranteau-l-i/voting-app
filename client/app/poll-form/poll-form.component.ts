import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.css']
})
export class PollFormComponent implements OnInit {

  logged: boolean;
  poll;

  constructor(private pollsService: PollsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.logged = this.authService.isLogged('user');
    this.getPoll();
  }

  getPoll(): void {
    const id = this.pollsService.id;
    this.pollsService.getPollById(id)
      .subscribe(poll => this.poll = poll);
  }

  onSubmit(value) {
    const ls = JSON.parse(localStorage.getItem('data_login'));
    const name = ls.name;
    console.log(value, name);
    this.pollsService.polling(value.option, name)
        .subscribe();
    this.pollsService.getPollById(this.poll._id)
        .subscribe();
    this.router.navigate([`/polls/stats/${this.poll.question}`]);
  }

}
