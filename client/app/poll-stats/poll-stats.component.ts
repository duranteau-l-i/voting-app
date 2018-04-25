import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-poll-stats',
  templateUrl: './poll-stats.component.html',
  styleUrls: ['./poll-stats.component.css'],
})
export class PollStatsComponent implements OnInit {
  poll;
  pieChartData;

  constructor(
    public authService: AuthService,
    private pollsService: PollsService
  ) {}

  ngOnInit() {
    this.getPoll();
  }

  getPoll() {
    const id = this.pollsService.id;
    this.pollsService.getPollById(id).subscribe(p => {
      const poll = p as any;
      this.pieChartData = {
        chartType: 'PieChart',
        dataTable: [['Task', 'Hours per Day']],
        options: {
          title: poll.question,
          titleTextStyle: {
            fontSize: 18,
          },
          is3D: true,
          width: 350,
          height: 300,
        },
      };
      poll.options.forEach(element => {
        this.pieChartData.dataTable.push([element.option, element.poll]);
      });
    });
  }
}
