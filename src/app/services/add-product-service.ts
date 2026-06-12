import { HttpClient } from '@angular/common/http';
import { inject, Injectable, EventEmitter } from '@angular/core';
import { productType, cartType } from '../data-type';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  httpc = inject(HttpClient)
  cartData = new EventEmitter<any>();
  constructor(private http: HttpClient ) {

  }

  addProductToApi(data:productType){
    return this.http.post("https://angular-ecom-rm6f.onrender.com/products",data)
  }

  getProductFromApi(){
    return this.http.get<productType[]>("https://angular-ecom-rm6f.onrender.com/products")
  }

  deleteProductFromApi(id:string): Observable<any> {
    return this.http.delete(`https://angular-ecom-rm6f.onrender.com/products/${id}`);
  }

  getProductFromId(id:string){
    return this.httpc.get<productType>(`https://angular-ecom-rm6f.onrender.com/products/${id}`)
  }

  updateProduct(product:productType){
    return this.http.put(`https://angular-ecom-rm6f.onrender.com/products/${product.id}`,product)
  }

popularProducts(){
  return this.http.get<productType[]>(
    'https://angular-ecom-rm6f.onrender.com/products?_limit=3'
  );
}

trendyProducts(){
  return this.http.get<productType[]>(
    'https://angular-ecom-rm6f.onrender.com/products?_limit=8'
  );
}

searchProducts(query:string){
  return this.http.get(
    `https://angular-ecom-rm6f.onrender.com/products?q=${query}`
  );
}

searchProductsButtonQuery(query:string){
  return this.http.get<productType[]>(
    `https://angular-ecom-rm6f.onrender.com/products?q=${query}`
  );
}

searchProductById(id:string){
  return this.http.get<productType>(`https://angular-ecom-rm6f.onrender.com/products?${id}`)
}

addToCart(cartData: cartType) {
  return this.http.post('https://angular-ecom-rm6f.onrender.com/cart', cartData);
}

getCartList(userId: string) {
  return this.http.get<cartType[]>('https://angular-ecom-rm6f.onrender.com/cart?userId=' + userId);
}

removeFromCart(cartId: string) {
  return this.http.delete('https://angular-ecom-rm6f.onrender.com/cart/' + cartId);
}
}
