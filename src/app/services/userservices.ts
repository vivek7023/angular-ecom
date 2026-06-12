import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userType } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  private http = inject(HttpClient);

  userSignUp(data: userType) {
    return this.http.post<userType>('http://localhost:3000/users', data);
  }

  userLogin(data: any) {
    return this.http.get<userType[]>(
      `http://localhost:3000/users?email=${data.email}&password=${data.password}`
    );
  }
}
