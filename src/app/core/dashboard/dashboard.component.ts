import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Logic Stuff
  authSubscription: Subscription;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData != null) {
        this.userIsAuthenticated = true;
      } else
        this.userIsAuthenticated = false;
    })
  }
  onLogout() {
    this.authService.logout();
  }
  

}
