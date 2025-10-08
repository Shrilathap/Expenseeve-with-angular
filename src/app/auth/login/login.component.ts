import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  ngForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.ngForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if(this.ngForm.invalid){
      this.ngForm.markAllAsTouched();
      return
    }
    // Implement login logic here, e.g., call AuthService
    this.authService.login(this.ngForm.value.email, this.ngForm.value.password).subscribe({
      next: response => {
        if(response) {
          this.router.navigate(['/'])
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    });
  } 
  
  get email() {
    return this.ngForm.get('email');
  }

  get password() {
    return this.ngForm.get('password');
  }

}
