import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerAddProduct } from './seller-add-product';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('SellerAddProduct', () => {
  let component: SellerAddProduct;
  let fixture: ComponentFixture<SellerAddProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddProduct],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerAddProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
