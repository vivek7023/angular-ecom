import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Userservices } from '../services/userservices';
import { AddProductService } from '../services/add-product-service';
import { userType, cartType } from '../data-type';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth implements OnInit {
  isNewUser = true;
  authError = '';

  constructor(
    private userService: Userservices,
    private productService: AddProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  signUp(data: userType): void {
    this.userService.userSignUp(data).subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result));
        this.localCartToRemoteCart(result.id);
        this.router.navigate(['/']);
      }
      this.cdr.detectChanges();
    });
  }

  login(data: any): void {
    this.authError = '';
    this.userService.userLogin(data).subscribe((result) => {
      if (result && result.length) {
        let userVal = result[0];
        localStorage.setItem('user', JSON.stringify(userVal));
        this.localCartToRemoteCart(userVal.id);
        this.router.navigate(['/']);
      } else {
        this.authError = 'Please enter valid user details';
      }
      this.cdr.detectChanges();
    });
  }

  localCartToRemoteCart(userId: string) {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: any[] = JSON.parse(data);
      
      cartDataList.forEach((product: any, index) => {
        let cartData: cartType = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item added in registry");
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
            this.productService.getCartList(userId).subscribe((result) => {
              if (result) {
                this.productService.cartData.emit(result);
              }
            });
          }
        }, 500);
      });
    } else {
      this.productService.getCartList(userId).subscribe((result) => {
        if (result) {
          this.productService.cartData.emit(result);
        }
      });
    }
  }
}
