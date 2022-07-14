import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ApiHandlerInterceptor implements HttpInterceptor {

  constructor(private localStorage:LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;

        }
        // console.log(errorMessage);
        // alert('No Internet Connectivity found.')
        if(this.localStorage.get('type')==='admin'){
          window.location.href="/login/admin"
          return throwError(errorMessage);
        }
         else if(!this.localStorage.get('token') && this.localStorage.get('type')==='member'){
          window.location.href="/login/member"
          return throwError(errorMessage);
         }

        return throwError(errorMessage);
      })
    );
  }
}
