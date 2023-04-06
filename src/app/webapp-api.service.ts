import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebappApiService {

  constructor(public http: HttpClient) { }

  private apiURL = "http://localhost:8080/"; //YOUR API URL

  private catalogApiUrl = "http://localhost:8090/";

  httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

 

    isLogin(username:string,password:string): Observable < string> {
        const params = new HttpParams()
        .set('username',username)
        .set('password', password);
      return this.http.get(this.apiURL + 'login', {params,responseType: 'text'}).pipe(catchError(this.errorHandler));
  }

     register(data:any): Observable < Boolean> {
        return this.http.post < Boolean > (this.apiURL + 'register',data,this.httpOptions).pipe(catchError(this.errorHandler));
    }

    upload(data:any,file:File): Observable < Boolean> {
         data.append('file', file);
        return this.http.post < Boolean > (this.apiURL + 'photos/add',data,this.httpOptions).pipe(catchError(this.errorHandler));
    }

    getProducts(page:number,size:number): Observable < any> {
        const params = new HttpParams()
        .set('page',page)
        .set('size', size);
        return this.http.get < any > (this.catalogApiUrl + 'getPage',{params}).pipe(catchError(this.errorHandler));
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
