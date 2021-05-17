import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/models/AuthData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // UI Stuff
  @Output() sidenavItemClicked = new EventEmitter<void>();

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
    // this.userIsAuthenticated = this.authService.getAuthStatus();
  }
  onLogout() {
    this.authService.logout();
  }

}
