import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public isLogin = false;

  SignInForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    role: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap.get('type');
    this.isLogin = routeParam === 'login';
  
    if (this.isLogin) {
      this.SignInForm.get('name')?.clearValidators();
      this.SignInForm.get('role')?.clearValidators();
    } else {
      this.SignInForm.get('name')?.setValidators(Validators.required);
      this.SignInForm.get('role')?.setValidators(Validators.required);
    }
  
    this.SignInForm.get('name')?.updateValueAndValidity();
    this.SignInForm.get('role')?.updateValueAndValidity();
  }

  Submit() {
    if (this.SignInForm.valid) {
      const { name, email, password, role } = this.SignInForm.value as { name: string; email: string; password: string; role: string };

      if (this.isLogin) {
        this.authService.login({ email, password }).subscribe({
          next: (res) => {
            alert('Login successful!');
            sessionStorage.setItem('token', res.token);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('role', res.role);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            alert('Login failed: ' + (err.error?.message || 'Unknown error'));
          }
        });
      } else {
        const newUser = new User(0, name, email, password, role);
        this.authService.register(newUser).subscribe({
          next: (res) => {
            alert('Registration successful!');
            sessionStorage.setItem('token', res.token);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('role', res.role);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
          }
        });
      }
    }
  }
}
