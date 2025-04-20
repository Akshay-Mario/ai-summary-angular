import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';
import { IloginResponseModel } from '../shared/models/login.model';
import { catchError, map, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authGaurd: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router)

  if (authService.isAccessTokenValid())
    return true;
  else {
    console.log("authgaurd")
    return authService.refreshToken().pipe(
      map((res: IloginResponseModel) => {
        authService.storeAccessToken(res.accessToken);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        router.navigate(['/login']);
        return of(false);
      })
    )
    
  }


};
