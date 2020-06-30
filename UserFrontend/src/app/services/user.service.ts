import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiBaseUrl = 'https://localhost:44308/api/users'

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userApiBaseUrl)
    .pipe(catchError(this.handleError));
  }

  public getUsersBySearch(searchTerm: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userApiBaseUrl + `/search/${searchTerm}`)
    .pipe(catchError(this.handleError));
  }

  

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
