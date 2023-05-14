import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: boolean = false;
constructor(private http :HttpClient, private router: Router) {}
  ngOnInit() {}
  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/v1/auth/login', { username: this.username, password: this.password })
      .subscribe(response => {
        if (response.success) {
          console.log('Login successful!');
          localStorage.setItem('userToken',response.token)
          this.router.navigate(['/list']);
        } else {
          this.error = true;
        }
      });
  }
}
