import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }
}
