import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  // UI Stuff
  @Output() sidenavItemClicked = new EventEmitter<void>();

  // Logic Stuff
  authSubscription: Subscription;
  userIsAuthenticated = false;
  userIsAdmin = false;
  username: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData) {
        this.userIsAuthenticated = true;
        this.username = authData.username;
        if(authData.roles[0] === 'Admin')
          this.userIsAdmin = true;
        else
          this.userIsAdmin = false;
      } else {
        this.userIsAuthenticated = false;
        this.userIsAdmin = false;
      }
        
    })
    // this.userIsAuthenticated = this.authService.getAuthStatus();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }


}
