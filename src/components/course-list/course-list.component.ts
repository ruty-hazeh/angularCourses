import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/course.service';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CoursesService, private router: Router) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    const token = sessionStorage.getItem('token')
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  // פונקציה להוספה לקורס
  add(courseId: number) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.courseService.joinCourse(courseId, userId).subscribe({
        next: () => {
          alert('Successfully enrolled in the course!');
        },
        error: (err: any) => {
          console.error('Error enrolling in course:', err);
          alert('Failed to enroll in the course.');
        }
      });
    }
  }

  // פונקציה להסרת קורס
  remove(courseId: number) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.courseService.leaveCourse(courseId, userId).subscribe({
        next: () => {
          alert('Successfully unenrolled from the course!');
        },
        error: (err: any) => {
          console.error('Error unenrolling from course:', err);
          alert('Failed to unenroll from the course.');
        }
      });
    }
  }

  // ניווט לדף פרטי הקורס
  viewCourseDetails(courseId: number) {
    this.router.navigate(['/course-details', courseId]);
  }
}