import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData == null) {
        this.router.navigateByUrl("/login");
      }
    })
    this.setupUser();
  }
  setupUser() {
    this.userData = JSON.parse(localStorage.getItem('authData')) as AuthData
    if(this.userData) {
      this.authService.setUser(this.userData);
    }
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
