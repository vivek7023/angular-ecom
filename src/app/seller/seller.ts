import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller-service';
import { Router } from '@angular/router';
import { sellerLogin, SingUp } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller',
  imports: [FormsModule,NgIf],
  templateUrl: './seller.html',
  styleUrl: './seller.css',
})
export class Seller {

  isNewSeller = true

  constructor(private sellerService:SellerService,private router:Router){

  }

  ngOnInit():void{
     if(localStorage.getItem('seller')){
       this.router.navigate(['seller-home'])
      } 

      
  }

  signUp(data:SingUp){
    this.sellerService.userSignUp(data).subscribe((result)=>{
        if(result){
          localStorage.setItem('seller',JSON.stringify(result))
          this.router.navigate(['seller-home'])
        }
    })
  }

  login(data:sellerLogin){
    this.sellerService.sellerLogin(data).subscribe((result:any)=>{
          if(result.length){
            localStorage.setItem('seller',JSON.stringify(result))
            this.router.navigate(['seller-home'])
        }
    })
  }
}
