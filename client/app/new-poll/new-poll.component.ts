import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {

  admin;
  name: string;

  poll: any = {
    options: [
      {
        number: 1,
        option: 'Answer 1',
        poll: 0,
        voters: []
      },
      {
        number: 2,
        option: 'Answer 2',
        poll: 0,
        voters: []
      }
    ],
    question: 'Your question',
    user: '',
  };

  constructor(private pollsService: PollsService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.admin = this.authService.isLogged('admin');
    const ls = JSON.parse(localStorage.getItem('data_login'));
    this.poll.user = ls.name;
    console.log(this.poll.user);
  }

  addInputAnswer() {
    const number: number = this.poll.options.length + 1;
    this.poll.options.push({number: number, option: 'Option', poll: 0});
  }

  deleteInputAnswer(event) {
    const number = event.target.id  - 1;
    this.poll.options.splice(number, 1);
  }

  onSubmit(): void {
    this.pollsService.addPoll(this.poll);
    setTimeout(() => {
      this.router.navigate(['/my-polls']);
    }, 500);
  }

}
