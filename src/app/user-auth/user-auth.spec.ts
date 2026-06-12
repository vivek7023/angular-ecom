import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { UserAuth } from './user-auth';

describe('UserAuth', () => {
  let component: UserAuth;
  let fixture: ComponentFixture<UserAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuth],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
