import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email_valid = false;
  server_errors: any;
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
    const username: string = form.value.username.trim()
    const password = form.value.password.trim()
    const phone = form.value.phone.toString()

    for(let i = 0; i != email.length; ++i) {
      if(email[i] === '@')
        this.email_valid = true;
    }
    if(!this.email_valid) return;
    
    const user: Partial<User> = {
      email,
      username,
      password,
      phone
    };

    this.authService.register(user).subscribe(res => {
      this.loading = false;
      this.server_errors = null;
      this.navigate();
    }, res => {
      this.server_errors = res.error.errors;
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
