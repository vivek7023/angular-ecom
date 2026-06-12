import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { SellerHome } from './seller-home';

describe('SellerHome', () => {
  let component: SellerHome;
  let fixture: ComponentFixture<SellerHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerHome],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
