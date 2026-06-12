import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddProductService } from '../services/add-product-service';
import { productType } from '../data-type';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-all-product',
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './seller-all-product.html',
  styleUrl: './seller-all-product.css',
})
export class SellerAllProduct implements OnInit{

  products:productType[] = []

  constructor(private ps:AddProductService,private cdr: ChangeDetectorRef){

  }

  ngOnInit(){
    this.show()
  }

show(){
  console.log('show called');

  this.ps.getProductFromApi().subscribe((res)=>{
    console.log('response received');

    this.products = res;
    console.log('====================================');
    console.log(this.products);
    console.log('====================================');
    this.cdr.detectChanges();
  })
}
deleteProduct(id:string){
  console.log('delete called for id:', id);
  this.ps.deleteProductFromApi(id).subscribe((res)=>{
    console.log('delete response received:', res);
    this.show(); // Refresh the product list after deletion
  })
}
}
