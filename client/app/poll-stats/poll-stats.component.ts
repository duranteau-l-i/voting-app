import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-poll-stats',
  templateUrl: './poll-stats.component.html',
  styleUrls: ['./poll-stats.component.css']
})
export class PollStatsComponent implements OnInit {

  admin: boolean;
  logged: boolean;
  poll;
  pieChartData;

  constructor(private authService: AuthService, private pollsService: PollsService) {
   }

   ngOnInit() {
     if (this.authService.isLogged('admin') || this.authService.isLogged('user')) {
       this.logged = true;
     }
    this.getPoll();
  }

  getPoll() {
    const id = this.pollsService.id;
    this.pollsService.getPollById(id)
      .subscribe(p => {
        const poll = p as any;
        this.pieChartData = {
          chartType: 'PieChart',
          dataTable: [['Task', 'Hours per Day']],
          options: {
            'legend': 'left',
            'title': poll.question,
            'is3D': true,
            'width': 800,
            'height': 600}
        };
        poll.options.forEach(element => {
          this.pieChartData.dataTable.push([element.option, element.poll]);
        });
      });
  }

}
