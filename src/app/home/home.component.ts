import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../shared';

@Component({
  template: `
    <div *ngIf="givenName" class="col-12 mt-2">
      <button (click)="logout()" class="btn btn-sm btn-outline-primary float-right">Logout</button>
      <h2>Welcome, {{givenName}}!</h2>
      <p><a routerLink="/search" routerLinkActive="active">Search</a></p>
    </div>

    <div class="card mt-2" *ngIf="!givenName">
      <div class="card-body">
        <h4 class="card-title">Login with Authorization Server</h4>
        <button class="btn btn-primary" (click)="login()">Login</button>
      </div>
    </div>

    <div class="card mt-2" *ngIf="!givenName">
      <div class="card-body">
        <h4 class="card-title">Login with Username/Password</h4>

        <p class="alert alert-error" *ngIf="loginFailed">
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
          <button class="btn btn-primary" (click)="loginWithPassword()">Login</button>
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
