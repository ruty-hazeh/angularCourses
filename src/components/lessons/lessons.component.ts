// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { LessonsService } from '../../services/lessons.service';
// import { RouterModule } from '@angular/router';
// import { Lesson } from '../../models/lesson';
// import { CommonModule } from '@angular/common';
// import { CoursesService } from '../../services/course.service';
// import { ReactiveFormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-lessons',
//   standalone: true,
//   imports: [ReactiveFormsModule,RouterModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule],
//   templateUrl: './lessons.component.html',
//   styleUrls: ['./lessons.component.css']
// })
// export class LessonsComponent implements OnInit {
//   lessonForm: FormGroup;
//   lessons: Lesson[] = [];
//   courses: any[] = [];
//   isForbidden = false;
//   courseId: number | undefined;

//   constructor(
//     private fb: FormBuilder,
//     private lessonService: LessonsService,
//     private coursesService: CoursesService
//   ) {
//     this.lessonForm = this.fb.group({
//       courseId: ['', Validators.required],
//       lessonId: [''],
//       title: ['', Validators.required],
//       content: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses() {
//     this.coursesService.getAllCourses().subscribe({
//       next: (courses: any[]) => {
//         this.courses = courses;
//         console.log("ruty1")

//       },
//       error: (err) => {
//         console.error('Error loading courses:', err);
//       }
//     });
//   }

//   loadLessons() {
//     if (this.courseId) {
//       this.lessonService.getLessons(this.courseId).subscribe({
//         next: (lessons: Lesson[]) => {
//           this.lessons = lessons;
//           console.log("ruty2")
//         },
//         error: (err) => {
//           console.error('Error loading lessons:', err);
//           this.isForbidden = true;
//         }
//       });
//     }
//   }

//   addLesson() {
//     const { courseId, title, content } = this.lessonForm.value;
//     this.lessonService.createLesson(courseId, { title, content }).subscribe({
//       next: (response) => {
//         alert('Lesson added successfully!');
//         this.lessons.push(response);  // הוספת השיעור החדש לרשימה
//       },
//       error: (err) => {
//         console.error('Error creating lesson:', err);
//         this.isForbidden = true;
//       }
//     });
//   }

//   deleteLesson() {
//     const { courseId, lessonId } = this.lessonForm.value;
//     this.lessonService.deleteLesson(courseId, lessonId).subscribe({
//       next: (response) => {
//         alert('Lesson deleted successfully!');
//         this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);  // מחיקת השיעור מהרשימה
//       },
//       error: (err) => {
//         console.error('Error deleting lesson:', err);
//         this.isForbidden = true;
//       }
//     });
//   }

//   updateLesson() {
//     const { courseId, lessonId, title, content } = this.lessonForm.value;
//     this.lessonService.updateLesson(courseId, lessonId, { title, content }).subscribe({
//       next: (response) => {
//         alert('Lesson updated successfully!');
//         this.loadLessons();  // עדכון הרשימה
//       },
//       error: (err) => {
//         console.error('Error updating lesson:', err);
//         this.isForbidden = true;
//       }
//     });
//   }

//   setCourseId(courseId: number) {
//     this.courseId = courseId;
//     this.loadLessons();  // טוען את השיעורים כשמגדירים קורס
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../../services/lessons.service';
import { Lesson } from '../../models/lesson';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-lessons',
  standalone: true,
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatListModule
  ]
})
export class LessonsComponent {
  lessons: Lesson[] = [];
  lessonForm: FormGroup;
  isForbidden = false;

  addFlag = false;
  deleteFlag = false;
  updateFlag = false;

  constructor(private fb: FormBuilder, private lessonService: LessonsService) {
    this.lessonForm = this.fb.group({
      courseId: ['', Validators.required],
      lessonId: [''],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  loadLessons(courseId: number) {
    this.lessonService.getLessons(courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (err) => {
        console.error('Error loading lessons:', err);
        this.isForbidden = true;
      }
    });
  }

  addClick() {
    this.addFlag = true;
    this.deleteFlag = false;
    this.updateFlag = false;
  }

  deleteClick() {
    this.deleteFlag = true;
    this.addFlag = false;
    this.updateFlag = false;
  }

  updateClick() {
    this.updateFlag = true;
    this.addFlag = false;
    this.deleteFlag = false;
  }

  onSubmitAdd() {
    const { courseId, title, content } = this.lessonForm.value;
    this.lessonService.createLesson(courseId, { title, content }).subscribe({
      next: (response) => {
        alert('Lesson added successfully!');
        this.lessons.push(response);
        this.lessonForm.reset();
      },
      error: (err) => {
        console.error('Error creating lesson:', err);
        this.isForbidden = true;
      }
    });
  }

  onSubmitDelete() {
    const { courseId, lessonId } = this.lessonForm.value;
    this.lessonService.deleteLesson(courseId, lessonId).subscribe({
      next: () => {
        alert('Lesson deleted successfully!');
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      },
      error: (err) => {
        console.error('Error deleting lesson:', err);
        this.isForbidden = true;
      }
    });
  }

  onSubmitUpdate() {
    const { courseId, lessonId, title, content } = this.lessonForm.value;
    this.lessonService.updateLesson(courseId, lessonId, { title, content }).subscribe({
      next: () => {
        alert('Lesson updated successfully!');
        this.loadLessons(courseId);
      },
      error: (err) => {
        console.error('Error updating lesson:', err);
        this.isForbidden = true;
      }
    });
  }
}
