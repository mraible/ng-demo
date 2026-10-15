import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-06bzs1cu.us.auth0.com',
      clientId: 'GlzZCL2mpQvStRsLVQvR57kyVGCqwKcy',
      authorizationParams: {
        redirect_uri: window.location.origin + '/home'
      },
      // Keep users logged in when they reload the page
      useRefreshTokens: true,
      cacheLocation: 'localstorage'
    })
  ]
};
