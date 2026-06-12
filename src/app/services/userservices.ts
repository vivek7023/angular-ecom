import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userType } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  private http = inject(HttpClient);

  userSignUp(data: userType) {
    return this.http.post<userType>('https://angular-ecom-rm6f.onrender.com/users', data);
  }

  userLogin(data: any) {
    return this.http.get<userType[]>(
      `https://angular-ecom-rm6f.onrender.com/users?email=${data.email}&password=${data.password}`
    );
  }
}
