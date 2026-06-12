import { Component } from '@angular/core';
import { productType } from '../data-type';
import { FormsModule } from '@angular/forms';
import { AddProductService } from '../services/add-product-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule, NgIf],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css',
})
export class SellerAddProduct {
  constructor(private ps : AddProductService){

  }

  addProduct(data:productType){
    this.ps.addProductToApi(data).subscribe((result)=>{
        if(result){
          console.log('added sucess')
        }
    })
  }
}
