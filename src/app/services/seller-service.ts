import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sellerLogin, SingUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http:HttpClient){

  }
    userSignUp(data:SingUp){
        return this.http.post('https://angular-ecom-rm6f.onrender.com/seller',data)
    }

    sellerLogin(data:sellerLogin){
      return this.http.get(`https://angular-ecom-rm6f.onrender.com/seller?email=${data.email}&password=${data.password}`)
    }


}
