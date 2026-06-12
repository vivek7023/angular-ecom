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
    return this.http.post("http://localhost:3000/products",data)
  }

  getProductFromApi(){
    return this.http.get<productType[]>("http://localhost:3000/products")
  }

  deleteProductFromApi(id:string): Observable<any> {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductFromId(id:string){
    return this.httpc.get<productType>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:productType){
    return this.http.put(`http://localhost:3000/products/${product.id}`,product)
  }

popularProducts(){
  return this.http.get<productType[]>(
    'http://localhost:3000/products?_limit=3'
  );
}

trendyProducts(){
  return this.http.get<productType[]>(
    'http://localhost:3000/products?_limit=8'
  );
}

searchProducts(query:string){
  return this.http.get(
    `http://localhost:3000/products?q=${query}`
  );
}

searchProductsButtonQuery(query:string){
  return this.http.get<productType[]>(
    `http://localhost:3000/products?q=${query}`
  );
}

searchProductById(id:string){
  return this.http.get<productType>(`http://localhost:3000/products?${id}`)
}

addToCart(cartData: cartType) {
  return this.http.post('http://localhost:3000/cart', cartData);
}

getCartList(userId: string) {
  return this.http.get<cartType[]>('http://localhost:3000/cart?userId=' + userId);
}

removeFromCart(cartId: string) {
  return this.http.delete('http://localhost:3000/cart/' + cartId);
}
}
