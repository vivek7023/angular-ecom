import { TestBed } from '@angular/core/testing';
import { AddProductService } from './add-product-service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('AddProductService', () => {
  let service: AddProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(AddProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
