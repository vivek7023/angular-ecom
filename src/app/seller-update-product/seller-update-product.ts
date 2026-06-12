import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { productType } from '../data-type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddProductService } from '../services/add-product-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule, NgIf],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css',
})
export class SellerUpdateProduct {
  id:string|null=''
  product : productType | undefined
  constructor(private router : ActivatedRoute,private ps : AddProductService, private cdr: ChangeDetectorRef){
    
  }

  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id')
    this.id && this.ps.getProductFromId(this.id).subscribe((result)=>{
      this.product = result
      console.log('====================================');
      console.log(this.product);
      console.log('====================================');
      this.cdr.detectChanges();
    })
  }

  updateProductData(data:productType){
    if(this.product){
      data.id = this.product.id
    }
    this.ps.updateProduct(data).subscribe((res)=>{
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
  }
}
