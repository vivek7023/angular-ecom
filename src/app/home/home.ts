import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { productType } from '../data-type';
import { AddProductService } from '../services/add-product-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
popularProducts: productType[] = [];
trendyProducts: productType[] = [];
currentSlide = 0;
userName = '';
private slideInterval: any;

constructor(private ps : AddProductService, private cdr: ChangeDetectorRef,private router : Router){

}

ngOnInit(){
  let userStore = localStorage.getItem('user');
  if (userStore) {
    let userData = JSON.parse(userStore);
    this.userName = userData.name;
  }

  this.ps.popularProducts()
    .subscribe((data)=>{
      this.popularProducts = data;
      this.cdr.detectChanges();
      this.startSlideShow();
    });

  this.ps.trendyProducts()
    .subscribe((data)=>{
      this.trendyProducts = data;
      this.cdr.detectChanges();
    });
}

ngOnDestroy() {
  this.stopSlideShow();
}

startSlideShow() {
  this.stopSlideShow();
  this.slideInterval = setInterval(() => {
    this.nextSlide();
  }, 2000);
}

stopSlideShow() {
  if (this.slideInterval) {
    clearInterval(this.slideInterval);
  }
}

nextSlide() {
  if (this.popularProducts.length > 0) {
    this.currentSlide = (this.currentSlide + 1) % this.popularProducts.length;
    this.cdr.detectChanges();
  }
}

prevSlide() {
  if (this.popularProducts.length > 0) {
    this.currentSlide = (this.currentSlide - 1 + this.popularProducts.length) % this.popularProducts.length;
    this.cdr.detectChanges();
  }
}

setSlide(index: number) {
  this.currentSlide = index;
  this.cdr.detectChanges();
  this.startSlideShow(); // reset interval
}

sendOnDetailPage(id:string){
  this.router.navigate([`/product-detail/${id}`])
}
}
