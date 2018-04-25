import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { Poll } from '../services/poll';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css'],
})
export class NewPollComponent implements OnInit {
  admin;
  name: string;
  number: number = 2;
  message: string;

  pollForm: FormGroup;

  constructor(
    private pollsService: PollsService,
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.name = this.authService.name;
    this.initForm();
  }

  initForm() {
    this.pollForm = this.formBuilder.group({
      question: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z0-9_]{4,}')],
      ],
      options: this.formBuilder.array([
        new FormControl('', [
          Validators.required,
          Validators.pattern('[A-Za-z0-9_]{2,}'),
        ]),
        new FormControl('', [
          Validators.required,
          Validators.pattern('[A-Za-z0-9_]{2,}'),
        ]),
      ]),
    });
  }

  getOptions(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addInputAnswer() {
    const newOptionsControl = this.formBuilder.control('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9_]{2,}'),
    ]);
    this.getOptions().push(newOptionsControl);
  }

  onSubmit() {
    const formValue = this.pollForm.value;
    const opt = formValue['options'].map((element, index) => {
      return { number: index + 1, option: element, poll: 0, voters: [] };
    });
    const newPoll = {
      question: formValue['question'],
      options: opt,
      user: this.name,
    };

    this.pollsService.addPoll(newPoll).subscribe(res => {
      if (res === null) {
        setTimeout(() => {
          this.router.navigate(['/my-polls']);
        }, 500);
      } else {
        this.message = 'Poll al ready exists !';
      }
    });
  }

  deleteInputAnswer(event) {
    const number = event;
    if (this.getOptions().controls.length > 2) {
      this.getOptions().controls.splice(number, 1);
    }
  }
}
