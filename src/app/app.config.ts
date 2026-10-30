import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';

const config = {
  domain: 'dev-06bzs1cu.us.auth0.com',
  clientId: 'GlzZCL2mpQvStRsLVQvR57kyVGCqwKcy',
  authorizationParams: {
    redirect_uri: window.location.origin + '/home',
  },
  // keep the session across page loads (e.g. a refresh, or Cypress visiting a guarded route)
  useRefreshTokens: true,
  cacheLocation: 'localstorage' as const,
  httpInterceptor: {
    allowedList: ['/api/*'],
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes),
    provideAuth0(config),
  ],
};
