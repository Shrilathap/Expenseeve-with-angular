import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  ngForm:FormGroup;

  constructor( private fb:FormBuilder){
    this.ngForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      changePassword:['',[Validators.required,Validators.minLength(6)]]
    })
  }

    get email() {
    return this.ngForm.get('email');
  }

  get password() {
    return this.ngForm.get('password');
  }

  get changePassword() {
    return this.ngForm.get('changePassword')
  }

   onSubmit() {
    
  }
}
