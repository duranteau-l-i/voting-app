import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollStatsComponent } from './poll-stats.component';

describe('PollStatsComponent', () => {
  let component: PollStatsComponent;
  let fixture: ComponentFixture<PollStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
