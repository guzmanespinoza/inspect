import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlServer: string;

  constructor(private http: HttpClient) {
    this.urlServer = `https://jsonplaceholder.typicode.com`;
  }

  login(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let url = `${this.urlServer}/login`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<any>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUsers(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let url = `${this.urlServer}/users`;
    let options = { headers: headers };
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
