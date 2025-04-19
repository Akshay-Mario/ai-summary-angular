import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginModel } from '../shared/models/login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  registerService(userData: LoginModel): Observable<string> {
    this.http.get("http://localhost")
    return of("value")
  }

  
}
