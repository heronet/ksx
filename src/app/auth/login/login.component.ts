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
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    const email = form.value.email.trim().toLowerCase()
    const password = form.value.password.trim()

    this.authService.login({email, password}).subscribe(res => {
      this.loading = false;
      this.server_error = null
      this.router.navigateByUrl("/all-tests");
    }, res => {
      this.server_error = res.error;
      this.loading = false;
    })
  }

}
