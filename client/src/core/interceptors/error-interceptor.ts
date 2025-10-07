import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from '../service/toast-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router)


  return next(req).pipe(
    catchError(error => {
      if(error){
        switch(error.status){
          case 400:
            toast.error(error.error);
            break;
          case 401:
            toast.error("Unauthorized");
            break;
          case 404:
            toast.error("Not Found");
            break;
          case 500:
            toast.error("Server Error");
            break;
          default:
          toast.error("Que merde a passe!?");
            break;
        }
      }
      throw error;
    })
  );
};
