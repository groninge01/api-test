import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://api-test20180917094553.azurewebsites.net/umbraco/oauth/token';
  constructor(private http: HttpClient) { }

  getBearerToken(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };

    const body = 'grant_type=password' + '&username=' + username + '&password=' + password;

    return this.http.post<any>(this.url, body, httpOptions);

  }

}
