import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { OktaAuthWrapper } from '../shared/auth/okta.auth.wrapper';

@Component({
  template: `<div *ngIf="givenName">
<h2>Welcome, {{givenName}}!</h2>
<button (click)="logout()" class="btn btn-default">Logout</button>
<p><a routerLink="/search" routerLinkActive="active">Search</a></p>
</div>

<div class="panel panel-default" *ngIf="!givenName">
    <div class="panel-body">
        <p>Login with Authorization Server</p>
        <button class="btn btn-default" (click)="login()">Login</button>
    </div>
</div>

<div class="panel panel-default" *ngIf="!givenName">
    <div class="panel-body">
        <p>Login with Username/Password</p>

        <p style="color:red; font-weight:bold" *ngIf="loginFailed">
            Login wasn't successful.
        </p>

        <div class="form-group">
            <label>Username</label>
            <input class="form-control" [(ngModel)]="username">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input class="form-control" type="password" [(ngModel)]="password">
        </div>
        <div class="form-group">
            <button class="btn btn-default" (click)="loginWithPassword()">Login</button>
        </div>        
    </div>
</div>`
})
export class HomeComponent {
  username;
  password;

  constructor(private oauthService: OAuthService, private oktaAuthWrapper: OktaAuthWrapper) {
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  loginWithPassword() {
    this.oktaAuthWrapper.login(this.username, this.password)
      .then(_ => console.debug('logged in'))
      .catch(err => console.error('error logging in', err));
  }
}
