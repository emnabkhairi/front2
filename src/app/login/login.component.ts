import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  usernameTouched: boolean = false;
  passwordTouched: boolean = false;

  onSubmit(form: any): void {
    if (form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.rememberMe);

    // Implement actual login logic here
  }
}
