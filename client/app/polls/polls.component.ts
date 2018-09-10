import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  polls: Poll[];
  pollsSubscription: Subscription;
  poll: Poll;

  constructor(
    private pollsService: PollsService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.pollsService.getPolls();
    this.pollsSubscription = this.pollsService.pollsSubject.subscribe(poll => {
      this.polls = poll;
    });
  }

  toPollId(event) {
    const id = event.target.id;
    this.pollsService.id = id;
    this.pollsService.getPollById(id).subscribe(res => {
      const p = res as any;
      if (this.authService.admin) {
        this.router.navigate([`/polls/stats/${p.question}`]);
      } else if (p.voters.includes(this.authService.name)) {
        this.router.navigate([`/polls/stats/${p.question}`]);
      } else if (this.authService.logged === false) {
        this.router.navigate([`/polls/stats/${p.question}`]);
      } else {
        this.router.navigate(['/polls/' + p.question]);
      }
    });
  }
}
