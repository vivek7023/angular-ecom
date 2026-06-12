import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [RouterLink],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.css',
})
export class SellerHome implements OnInit {
  sellerName = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const sellerStore = localStorage.getItem('seller');
    if (sellerStore) {
      const sellerData = JSON.parse(sellerStore);
      if (Array.isArray(sellerData) && sellerData.length > 0) {
        this.sellerName = sellerData[0].name;
      } else if (sellerData && sellerData.name) {
        this.sellerName = sellerData.name;
      }
    }
    this.cdr.detectChanges();
  }
}
