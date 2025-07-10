import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl: string = "http://localhost:8080/auth/register";

    constructor(private httpClient: HttpClient) { }

    register(firstName: string, surname: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl, {firstName, surname, email, password})
      .pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.username)
        })
      )
  }

}
