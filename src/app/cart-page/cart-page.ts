import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddProductService } from '../services/add-product-service';
import { cartType } from '../data-type';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  cartData: cartType[] = [];
  priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(
    private ps: AddProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    let user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/user-auth']);
      return;
    }
    let userId = JSON.parse(user).id;
    this.ps.getCartList(userId).subscribe((result) => {
      if (result) {
        this.cartData = result;
        this.calculateSummary();
        this.cdr.detectChanges();
      }
    });
  }

  calculateSummary() {
    let price = 0;
    this.cartData.forEach((item) => {
      if (item.pprice) {
        const qty = item.quantity || 1;
        price += Number(item.pprice) * qty;
      }
    });

    this.priceSummary.price = price;
    this.priceSummary.discount = Math.round(price / 10);
    this.priceSummary.tax = Math.round(price / 10);
    this.priceSummary.delivery = price > 0 ? (price > 1000 ? 0 : 100) : 0;
    this.priceSummary.total = price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;
  }

  removeFromCart(cartId: string | undefined) {
    if (cartId) {
      this.ps.removeFromCart(cartId).subscribe((result) => {
        if (result) {
          this.loadCart();
          let user = localStorage.getItem('user');
          if (user) {
            let userId = JSON.parse(user).id;
            this.ps.getCartList(userId).subscribe((res) => {
              if (res) {
                this.ps.cartData.emit(res);
              }
            });
          }
        }
      });
    }
  }

  checkout() {
    alert("Proceeding to checkout! Payment features will be integrated next.");
  }
}
