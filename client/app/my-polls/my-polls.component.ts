import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {

  admin: boolean;
  polls: Poll[];

  constructor(private pollsService: PollsService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.admin = this.authService.isLogged('admin');
    this.listPolls();
  }

  listPolls() {
    this.pollsService.getPollByUser()
    .subscribe(data => this.polls = data as any);
  }

  deletePoll(event) {
    event.stopPropagation();
    const id = event.target.id;
    this.pollsService.deletePoll(id);
    setTimeout(() => {
      this.router.navigate(['/polls']);
      // window.location.reload();
    }, 500);
  }

  toStats(event) {
    const id = event.target.id;
    this.pollsService.id = id;
    const poll = this.polls.find((p) => p._id === id);
    console.log('question: ' + poll.question);
    const question = poll.question;
    this.router.navigate([`/polls/stats/${question}`]);
  }

}
