import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuthModel, IjwtTokenModel, IloginResponseModel, LoginModel } from '../shared/models/login.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }


  public registerService(userData: LoginModel): Observable<IAuthModel> {
    return this.http.post<IAuthModel>(environment.registerUrl, userData);
  }

  public loginService(userData: LoginModel): Observable<IloginResponseModel> {
    return this.http.post<IloginResponseModel>(environment.loginURL, userData);
  }

  public storeAccessToken(accessToken: string) {
    localStorage.setItem("access_token", accessToken);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  public isAccessTokenValid(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    return true;
    //skipping this login for developement when back end is not working
    // try {
    //   const decodedToken = jwtDecode<IjwtTokenModel>(token);
    //   const expiry = decodedToken.exp;
    //   return expiry * 1000 > Date.now();
    // }
    // catch {
    //   console.log("Error decoding token");
    //   return false;
    // }
  }

  public refreshToken(): Observable<any> {
    return this.http.post(environment.refreshUrl, { userAgent: navigator.userAgent, ipAddress: "ipaddress not given" })
  }

}
