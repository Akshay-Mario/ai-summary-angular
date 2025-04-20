import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../service/login.service';
import { environment } from '../../environments/environment';
import { catchError, switchMap, throwError } from 'rxjs';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(LoginService);

  //skip adding header
  if (environment.excludedUrls.some(x => req.url.includes(x))) {
    return next(req);
  }

  const token = auth.getAccessToken();

  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        return auth.refreshToken().pipe(
          switchMap((res) => {
            auth.storeAccessToken(res.accessToken);
            const retryReq = authReq.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            })
            return next(retryReq);
          }),
          catchError((refreshErr) => {
            auth.logout();
            return throwError(() => refreshErr);
          })
        )
      }
      return throwError(() => err);
    })
  )


};
