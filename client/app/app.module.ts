import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { PollsService } from './services/polls.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { PollsComponent } from './polls/polls.component';
import { PollStatsComponent } from './poll-stats/poll-stats.component';
import { PollFormComponent } from './poll-form/poll-form.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './services/auth.guard.service';
import { AuthAdminGuard } from './services/auth.admin.guard.service';

const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'reset',
    canActivate: [AuthGuard],
    component: ResetPasswordComponent,
  },
  {
    path: 'new-poll',
    canActivate: [AuthAdminGuard],
    component: NewPollComponent,
  },
  {
    path: 'my-polls',
    canActivate: [AuthAdminGuard],
    component: MyPollsComponent,
  },
  { path: 'polls/stats/:id', component: PollStatsComponent },
  { path: 'polls/:id', canActivate: [AuthGuard], component: PollFormComponent },
  { path: 'polls', component: PollsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    NewPollComponent,
    MyPollsComponent,
    PollsComponent,
    PollStatsComponent,
    PollFormComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, PollsService, AuthGuard, AuthAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
