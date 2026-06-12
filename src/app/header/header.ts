import { NgIf } from '@angular/common';
import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddProductService } from '../services/add-product-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  sellerName=''
  isSellerMenu = true
  userName = ''
  isUserLoggedIn = false
  cartItems = 0

  constructor(private router:Router,private ps :AddProductService, private cdr: ChangeDetectorRef){


          // Initial cart count check for users (if already logged in)
          let user = localStorage.getItem('user');
          if (user) {
            let userId = JSON.parse(user).id;
            this.ps.getCartList(userId).subscribe((result) => {
              this.cartItems = result.length;
              this.cdr.detectChanges();
            });
          }

          // Dynamic cart updates subscription
          this.ps.cartData.subscribe((items) => {
            this.cartItems = items.length;
            this.cdr.detectChanges();
          });

          this.router.events.subscribe((val:any)=>{
          if(val.url){
            if(localStorage.getItem('seller') && val.url.includes('seller')){
              let sellerStore = localStorage.getItem('seller')
              if(sellerStore){
                let sellerData = JSON.parse(sellerStore)
                this.sellerName = sellerData.name
              }
              this.isSellerMenu=true
            }
            else{
              this.isSellerMenu=false;
              let userStore = localStorage.getItem('user');
              if (userStore) {
                let userData = JSON.parse(userStore);
                this.userName = userData.name;
                this.isUserLoggedIn = true;

                // Sync/load count for logged in user
                this.ps.getCartList(userData.id).subscribe((result) => {
                  this.cartItems = result.length;
                  this.cdr.detectChanges();
                });
              } else {
                this.userName = '';
                this.isUserLoggedIn = false;
                this.cartItems = 0;
              }
            }
          }
          this.cdr.detectChanges();
          }) 
  }

  logoutSeller(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  logoutUser(){
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/user-auth']);
    this.cdr.detectChanges();
  }

searchResult:any[] = [];

searchProduct(query:string){
  if(!query || query.trim() === ''){
    this.searchResult = [];
    this.cdr.detectChanges();
    return;
  }

  this.ps.searchProducts(query)
  .subscribe((result:any)=>{
    if (result && result.length > 5) {
      this.searchResult = result.slice(0, 5);
    } else {
      this.searchResult = result;
    }
    this.cdr.detectChanges();
  });
}

@HostListener('document:click')
hideSearch(){
  this.searchResult = [];
  this.cdr.detectChanges();
}

submitSearch(val:string){
  if(val){
    // this.router.navigate([`/search/${val}`])
    this.router.navigate(['/search',val])
  }
}
sendOnDetailPage(id:string){
  this.router.navigate([`/product-detail/${id}`])
}
}
