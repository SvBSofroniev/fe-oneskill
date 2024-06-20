import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if(jwtToken){
    req.clone({
      setHeaders:{
        Authorization: 'Bearer ${jwtToken}',
      },
    });
  }
  return next(req);
};


function getJwtToken(): string | null {
  return sessionStorage.getItem('JWT_TOKEN');
}