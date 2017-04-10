import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
declare let OktaAuth: any;

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

  constructor(private oauthService: OAuthService, private router: Router) {
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
    return claims.name;
  }

  loginWithPassword() {
    this.oauthService.createAndSaveNonce().then(nonce => {
      const authClient = new OktaAuth({
        url: 'https://dev-158606.oktapreview.com'
      });
      authClient.signIn({
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.status === 'SUCCESS') {
          authClient.token.getWithoutPrompt({
            clientId: 'RqjWvpvWO77qMGgDfukY',
            responseType: ['id_token', 'token'],
            scopes: ['openid', 'profile', 'email'],
            sessionToken: response.sessionToken,
            nonce: nonce,
            redirectUri: window.location.origin
          })
            .then((tokens) => {
              this.oauthService.processIdToken(tokens[0].idToken, tokens[1].accessToken);
              this.router.navigate(['/home']);
            })
            .catch(error => console.error(error));
        } else {
          throw new Error('We cannot handle the ' + response.status + ' status');
        }
      }).fail(function (err) {
        console.error(err);
      });
    });
  }
}
