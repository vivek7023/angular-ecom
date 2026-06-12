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
        return this.http.post('http://localhost:3000/seller',data)
    }

    sellerLogin(data:sellerLogin){
      return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`)
    }


}
