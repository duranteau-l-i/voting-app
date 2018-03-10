import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  user: string;
  polls: Poll[];
  poll: Poll;

  constructor(private pollsService: PollsService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.admin = this.authService.isLogged('admin');
    this.logged = this.authService.isLogged('user');
    this.listPolls();
    const ls = JSON.parse(localStorage.getItem('data_login'));
    this.user = ls.name;
  }

  listPolls(): void {
    this.pollsService.getPolls()
    .subscribe(data => {
      this.polls = data as any;
    });
  }

  toPollId(event) {
    const id = event.target.id;
    this.pollsService.getPollById(id)
      .subscribe(res => {
        const p = res as any;
        if (this.admin) {
          this.router.navigate([`/polls/stats/${p.question}`]);
        } else if (p.voters.includes(this.user)) {
          this.router.navigate([`/polls/stats/${p.question}`]);
        } else if (this.logged === false) {
          this.router.navigate([`/polls/stats/${p.question}`]);
        } else {
          this.router.navigate(['/polls/' + p.question]);
        }
      });
  }

}
