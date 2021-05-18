import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  server_error: string;
  loading = false;
  constructor(
    private authService: AuthService, 
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    const email = form.value.email.trim().toLowerCase()
    const password = form.value.password.trim()

    this.authService.login({email, password}).subscribe(res => {
      this.loading = false;
      this.server_error = null
      this.navigate();
    }, res => {
      this.server_error = res.error;
      this.loading = false;
    })
  }
  navigate() {
    if(window.history.length > 2)
      this.location.back(); // Only call back if uses came from another page of THIS site.
    else
    this.router.navigateByUrl("/all-tests"); // Go home if came from another website
  }

}
