import { TestBed } from '@angular/core/testing';
import { SellerService } from './seller-service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('SellerService', () => {
  let service: SellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(SellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
