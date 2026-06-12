import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AddProductService } from '../services/add-product-service';
import { productType, cartType } from '../data-type';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product : productType | undefined;
  removeCart = false;
  cartData: cartType | undefined;

  constructor(
    private router : ActivatedRoute,
    private ps : AddProductService,
    private cdr : ChangeDetectorRef,
    private route : Router
  ){

  }

  ngOnInit(){
    this.router.paramMap.subscribe((params) => {
      let id = params.get('productId');
      this.removeCart = false;
      this.cartData = undefined;
      this.product = undefined;
      if(id){
        this.ps.getProductFromId(id).subscribe((result)=>{
            this.product = result;
            

            let user = localStorage.getItem('user');
            if (user) {
              let userId = JSON.parse(user).id;
              this.ps.getCartList(userId).subscribe((res)=>{
                if(res) {
                  let item = res.filter((item: cartType)=> id === item.productId);
                  if(item.length){
                    this.cartData = item[0];
                    this.removeCart = true;
                  } else {
                    this.removeCart = false;
                    this.cartData = undefined;
                  }
                  this.cdr.detectChanges();
                }
              });
            }
            this.cdr.detectChanges();
        })
      }
    });
  }

  addToCart(){
    if(this.product){
      if(!localStorage.getItem('user')){
        alert("Please login first to add items to cart");
        this.route.navigate(['/user-auth']);
        return;
      }
      let productWithQty = { ...this.product, quantity: 1 };
      let user = localStorage.getItem('user');
      let userId = user ? JSON.parse(user).id : '';
      let cartData: cartType = {
        ...productWithQty,
        productId: productWithQty.id,
        userId
      };
      delete cartData.id;
      this.ps.addToCart(cartData).subscribe({
        next: (result: any) => {
          if (result) {
            this.cartData = result;
            this.removeCart = true;
            this.ps.getCartList(userId).subscribe((res) => {
              if (res) {
                this.ps.cartData.emit(res);
              }
            });
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Error adding product to cart:", err);
        }
      });
    }
  }

  removeFromCart(){
    if(this.product){
      let user = localStorage.getItem('user');
      let userId = user ? JSON.parse(user).id : '';
      if (!this.cartData && userId) {
        this.ps.getCartList(userId).subscribe((res) => {
          if (res) {
            let item = res.filter((item: cartType) => this.product?.id === item.productId);
            if (item.length) {
              this.cartData = item[0];
              this.executeRemoveFromCart(userId);
            }
          }
        });
      } else {
        this.executeRemoveFromCart(userId);
      }
    }
  }

  private executeRemoveFromCart(userId: string) {
    if (this.cartData && this.cartData.id) {
      this.ps.removeFromCart(this.cartData.id).subscribe({
        next: (result) => {
          this.removeCart = false;
          this.cartData = undefined;
          this.ps.getCartList(userId).subscribe((res) => {
            if (res) {
              this.ps.cartData.emit(res);
            }
          });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Error removing product from cart:", err);
        }
      });
    }
  }
}
