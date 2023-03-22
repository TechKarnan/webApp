import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebappApiService {

  constructor(public http: HttpClient) { }

  private apiURL = "http://localhost:8080/"; //YOUR API URL

  httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    isLogin(): Observable < Boolean> {
      return this.http.get < Boolean > (this.apiURL + 'login').pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: {
        message: string;
    };status: any;message: any;
}) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
}

}
