import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "An error occurred!";
      switch (error.status) {
      case 403:
        errorMessage = "Access denied. You do not have permission to perform this action.";
        break;
      case 404:
        errorMessage = "Resource not found. Please check the URL.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 0: 
        errorMessage = "Network error. Please check your internet connection.";
        break;
      default:
        errorMessage = `Unknown error: ${error.message}`;
        break;
      }
      console.error("HTTP Error:", error);
      return throwError(() => new Error(errorMessage));
    }) 
  );
};