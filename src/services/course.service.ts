import { Observable } from "rxjs";
import { Course } from "../models/course";
import { HttpClient } from "@angular/common/http";
import { Lesson } from "../models/lesson";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  // הוספת המתודה הזו
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  // שאר המתודות נשארות כפי שהיו
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getAllStudentCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/student/${localStorage.getItem('userId')}`);
  }

  getLessons(courseId: number | undefined): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`);
  }

  createCourse(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateCourse(updateData: any, selectedCourse: number | undefined | null) {
    return this.http.put(`${this.baseUrl}/${selectedCourse}`, updateData);
  }

  deleteCourse(id: number | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  joinCourse(id: number | undefined, userId: string | null) {
    return this.http.post(`${this.baseUrl}/${id}/enroll`, { userId });
  }

  leaveCourse(id: number | undefined, userId: string | null) {
    return this.http.delete(`${this.baseUrl}/${id}/unenroll`, { body: { userId } });
  }
}
