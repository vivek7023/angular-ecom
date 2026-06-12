import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerUpdateProduct } from './seller-update-product';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('SellerUpdateProduct', () => {
  let component: SellerUpdateProduct;
  let fixture: ComponentFixture<SellerUpdateProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerUpdateProduct],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerUpdateProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
