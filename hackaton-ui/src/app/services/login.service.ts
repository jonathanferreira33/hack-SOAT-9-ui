import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string = "http://localhost:8080/auth/login";

  login(email:string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl, {email, password})
      .pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.userName)
          sessionStorage.setItem("userID", value.userID)
        })
      )
  }
}
