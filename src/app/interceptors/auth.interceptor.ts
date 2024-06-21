import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = sessionStorage.getItem('JWT_TOKEN');
  if(jwtToken){
    req.clone({
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`,
        'Access-Control-Allow-Origin':"*"
      },
    });
  }
  return next(req);
};