import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let authService: { isAuthenticated$: unknown, user$: unknown, loginWithRedirect: unknown, logout: unknown };

  async function render(user?: { name: string }) {
    authService = {
      isAuthenticated$: of(!!user),
      user$: of(user ?? null),
      loginWithRedirect: vi.fn(),
      logout: vi.fn()
    };
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), {provide: AuthService, useValue: authService}]
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should show a login button when not authenticated', async () => {
    const compiled = await render();
    compiled.querySelector<HTMLButtonElement>('#login')?.click();
    expect(authService.loginWithRedirect).toHaveBeenCalled();
  });

  it('should welcome the user and show a logout button when authenticated', async () => {
    const compiled = await render({name: 'Nikola Jokić'});
    expect(compiled.querySelector('h2')?.textContent).toContain('Welcome, Nikola Jokić!');
    compiled.querySelector<HTMLButtonElement>('#logout')?.click();
    expect(authService.logout).toHaveBeenCalled();
  });
});
