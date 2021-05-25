import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthData } from './models/AuthData';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  userData: AuthData;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authSubscription = this.authService.authenticatedUser$.subscribe(authData => {
      this.isLoading = false;
      if(authData == null) {
        this.router.navigateByUrl("/login");
      }
    })
    this.setupUser();
  }
  setupUser() {
    this.isLoading = true;
    this.userData = JSON.parse(localStorage.getItem('authData')) as AuthData
    if(this.userData) {
      this.authService.emitOldAuthData(this.userData);
      this.authService.refrestToken(this.userData).pipe(take(1)).subscribe(newAuthData => {
        localStorage.setItem('authData', JSON.stringify(newAuthData));
        this.isLoading = false;
        this.authService.setUser(newAuthData);
      }, err => {
        this.isLoading = false;
        localStorage.removeItem('authData');
      })
    }else {
      this.isLoading = false;
      this.authService.setUser(null);
    }
      
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
