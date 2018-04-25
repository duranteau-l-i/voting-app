import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css'],
})
export class MyPollsComponent implements OnInit {
  polls: Poll[];

  constructor(
    private pollsService: PollsService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.listPolls();
  }

  listPolls() {
    this.pollsService
      .getPollByUser()
      .subscribe(data => (this.polls = data as any));
  }

  deletePoll(event) {
    event.stopPropagation();
    const id = event.target.id;
    this.pollsService.deletePoll(id);
    setTimeout(() => {
      this.listPolls();
    }, 500);
  }

  toStats(event) {
    const id = event.target.id;
    this.pollsService.id = id;
    const poll = this.polls.find(p => p._id === id);
    const question = poll.question;
    this.router.navigate([`/polls/stats/${question}`]);
  }
}
