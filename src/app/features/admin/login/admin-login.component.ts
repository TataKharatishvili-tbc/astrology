import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    // Simulate API call
    setTimeout(() => {
      const { username, password } = this.loginForm.value;
      
      // Simple mock validation
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isAdmin', 'true');
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.error = 'მომხმარებლის სახელი ან პაროლი არასწორია';
        this.isLoading = false;
      }
    }, 1000);
  }
}
