import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'loginpage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  user = {
    email: '',
    password: ''
  }
  

  constructor(private loginService: LoginService, private router: Router) {}

  async login() {
    try {
      const response = await firstValueFrom(this.loginService.login(this.user.email, this.user.password));

      if (response.success) {
        alert('Login successful!');
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Login failed: ' + response.message);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      alert('An error occurred. Please try again later.');
    }
  }
}
