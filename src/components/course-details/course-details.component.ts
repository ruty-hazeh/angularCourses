import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/course.service';
import { Course } from '../../models/course';
import { LessonsService } from '../../services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../models/lesson';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course | null = null;
  lessons: Lesson[] = [];
  private courseIdSubscription: Subscription | null = null; 

  constructor(
    private route: ActivatedRoute, 
    private courseService: CoursesService, 
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    const courseId =this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(+courseId);
    }
  }

  loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe(
      (data) => {
        this.course = data;
        this.loadLessons(id);
      },
      (error) => {
        console.error('Error loading course:', error);
      }
    );
  }

  loadLessons(courseId: number) {
    this.lessonService.getLessons(courseId).subscribe(
      (lessonsData: Lesson[]) => {
        this.lessons = lessonsData; 
        console.log('Lessons loaded:', this.lessons);
      },
      (error: any) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  userId = localStorage.getItem('userId');
}
