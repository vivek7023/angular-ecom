import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerAllProduct } from './seller-all-product';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('SellerAllProduct', () => {
  let component: SellerAllProduct;
  let fixture: ComponentFixture<SellerAllProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAllProduct],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerAllProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
