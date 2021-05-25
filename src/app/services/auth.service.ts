import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/AuthData';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.BASE_URL;
  private authenticatedUserSource = new ReplaySubject<AuthData>(1); // Keeps track of user Authentication Status
  authenticatedUser$ = this.authenticatedUserSource.asObservable();
  private oldTokenForInterceptor = new ReplaySubject<AuthData>(1);
  oldTokenForInterceptor$ = this.oldTokenForInterceptor.asObservable();

  isAuthenticated: boolean;

  constructor(private http: HttpClient) { }

  login(login_creds: Partial<User>) {
    return this.http.post(`${this.BASE_URL}/account/login`, login_creds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.setUser(authData);
        }
      })
    )
  }
  logout() {
    localStorage.removeItem('authData');
    this.authenticatedUserSource.next(null);
    this.isAuthenticated = false;
  }
  register(register_creds: Partial<User>) {
    return this.http.post(`${this.BASE_URL}/account/register`, register_creds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.setUser(authData);
        }
      })
    )
  }
  
  setUser(authData: AuthData) {
    if(authData)
      this.isAuthenticated = true;
    else
      this.isAuthenticated = false;
    this.authenticatedUserSource.next(authData);
  }
  getAuthStatus() {
    return this.isAuthenticated;
  }
  refrestToken(authData: AuthData) {
    return this.http.post<AuthData>(`${this.BASE_URL}/account/refresh`, authData);
  }
  emitOldAuthData(authData: AuthData) {
    this.oldTokenForInterceptor.next(authData);
  }
  
}
