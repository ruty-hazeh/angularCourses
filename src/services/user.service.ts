import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/users'; 
 
   constructor(private http:HttpClient) { }
 
   getUsers(): Observable<any> {
     return this.http.get(`${this.baseUrl}`);
   }
   getUserById(id:number): Observable<any> {
     return this.http.get(`${this.baseUrl}/${id}`);
   }
 
   updateUser(id: number, user: any): Observable<any> {
     return this.http.put(`${this.baseUrl}/${id}`, user);
   }
 
   deleteUser(id: number): Observable<any> {
     return this.http.delete(`${this.baseUrl}/${id}`);
   }
 
}
