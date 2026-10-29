import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: AuthService,
          useValue: { isAuthenticated$: of(false), loginWithRedirect: () => {}, logout: () => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a login button when not authenticated', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#login')).toBeTruthy();
  });
});
