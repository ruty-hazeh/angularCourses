

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { LessonsService } from '../../services/lesson.service';
// import { RouterModule } from '@angular/router';
// import { Lesson } from '../../models/lesson';
// import { CommonModule } from '@angular/common';
// import { CoursesService } from '../../services/course.service';
// @Component({
//   selector: 'app-lessons',
//   standalone: true,
//   imports: [RouterModule,
//     FormsModule, MatInputModule,
//     MatFormFieldModule,
//     MatButtonModule,
//     ReactiveFormsModule,
//     CommonModule],
//   templateUrl: './lessons.component.html',
//   styleUrls: ['./lessons.component.css']
// })
// export class LessonsComponent {
// //   myForm: FormGroup;
// //   lessons: Lesson[] = [];
// //   selectedLesson: Lesson | null = null;
// //   courseId: number | undefined;
// //   isForbidden = false;

// //   constructor(private fb: FormBuilder, private lessonsService: LessonsService) {
// //     this.myForm = this.fb.group({
// //       id: [''],
// //       title: ['', Validators.required],
// //       content: ['', Validators.required]
// //     });
// //   }

// //   // טעינת השיעורים של הקורס
// //   loadLessons() {
// //     if (this.courseId) {
// //       this.lessonsService.getLessons(this.courseId).subscribe(
// //         (data) => {
// //           this.lessons = data;
// //         },
// //         (error) => {
// //           console.error('Error fetching lessons:', error);
// //           this.isForbidden = true;
// //         }
// //       );
// //     }
// //   }

// //   // הוספת שיעור חדש
// //   onSubmitAdd() {
// //     if (this.myForm.invalid || !this.courseId) return;
// //     const { title, content } = this.myForm.value;

// //     this.lessonsService.createLesson(this.courseId, { title, content }).subscribe(
// //       (data) => {
// //         console.log(data);
// //         this.loadLessons();  // עדכון רשימת השיעורים אחרי ההוספה
// //       },
// //       (error) => {
// //         console.error('Error creating lesson:', error);
// //         this.isForbidden = true;
// //       }
// //     );
// //   }

// //   // עדכון שיעור
// //   onSubmitUpdate() {
// //     if (this.myForm.invalid || !this.selectedLesson || !this.courseId) return;

// //     const { title, content } = this.myForm.value;
// //     const updates = { title, content };

// //     this.lessonsService.updateLesson(this.courseId, this.selectedLesson.id, updates).subscribe(
// //       (data) => {
// //         console.log(data);
// //         this.loadLessons();  // עדכון רשימת השיעורים אחרי העדכון
// //       },
// //       (error) => {
// //         console.error('Error updating lesson:', error);
// //         this.isForbidden = true;
// //       }
// //     );
// //   }

// //   // מחיקת שיעור
// //   onSubmitDelete() {
// //     if (!this.selectedLesson || !this.courseId) return;

// //     this.lessonsService.deleteLesson(this.courseId, this.selectedLesson.id).subscribe(
// //       (data) => {
// //         console.log(data);
// //         this.loadLessons();  // עדכון רשימת השיעורים אחרי המחיקה
// //       },
// //       (error) => {
// //         console.error('Error deleting lesson:', error);
// //         this.isForbidden = true;
// //       }
// //     );
// //   }

// //   // בחירת שיעור לעריכה או מחיקה
// //   selectLesson(lesson: Lesson) {
// //     this.selectedLesson = lesson;
// //     this.myForm.patchValue({
// //       id: lesson.id,
// //       title: lesson.title,
// //       content: lesson.content
// //     });
// //   }

// //   // סילוק בחירה של שיעור
// //   deselectLesson() {
// //     this.selectedLesson = null;
// //     this.myForm.reset();
// //   }

// //   // הגדרת ID של הקורס
// //   setCourseId(courseId: number) {
// //     this.courseId = courseId;
// //     this.loadLessons();
// //   }
// // }

// lessonForm: FormGroup;
// lessons: any[] = [];
// courses: any[] = [];
// constructor(private fb: FormBuilder, private lessonService: LessonsService, private coursesService: CoursesService) {
//   this.lessonForm = this.fb.group({
//     courseId: ['', Validators.required],
//     lessonId: [''],
//     title: ['', Validators.required],
//     content: ['', Validators.required]
//   });
// }
// ngOnInit(): void {
//   this.lessonService.getLessons(this.lessonForm.value.courseId).subscribe((response) => {
//     console.log("response from API:", response);
//     this.lessons = response;
//   })
// }

// addLesson() {
//   const { courseId, title, content } = this.lessonForm.value;
//   this.lessonService.createLesson(courseId, { title, content }).subscribe(response => {
//     alert('Lesson added successfully!');
//     this.loadLessons();
//   });
// }
// loadCourses() {
//   this.coursesService.getAllCourses().subscribe({
//     next: (courses: any[]) => {
//       this.courses = courses;
//     },
//     error: (err: any) => {
//       console.error('Error loading courses:', err);
//     }
//   });

// }
// loadLessons() {
//   this.loadCourses();
//   this.courses.forEach(course => {
//     this.lessonService.getLessons(course.id).subscribe({
//       next: (lessons) => {
//         this.lessons = lessons;
//       },
//       error: (err) => {
//         console.error('Error loading lessons:', err);
//       }
//     });
//   });
// }

// deleteLesson() {
//   const { courseId, lessonId } = this.lessonForm.value;
//   this.lessonService.deleteLesson(courseId, lessonId).subscribe(response => {
//     alert('Lesson deleted successfully!');
//     this.loadLessons();
//   });
// }

// updateLesson() {
//   const courseId = this.lessonForm.value.courseId;
//   const lessonId = this.lessonForm.value.lessonId;
//   const title = this.lessonForm.value.title;
//   const content = this.lessonForm.value.content;

//   this.lessonService.updateLesson(courseId, lessonId, { title, content }).subscribe(response => {
//     alert('Lesson updated successfully!');
//     this.loadLessons();
//   });
// }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LessonsService } from '../../services/lesson.service';
import { RouterModule } from '@angular/router';
import { Lesson } from '../../models/lesson';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/course.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessonForm: FormGroup;
  lessons: Lesson[] = [];
  courses: any[] = [];
  isForbidden = false;
  courseId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonsService,
    private coursesService: CoursesService
  ) {
    this.lessonForm = this.fb.group({
      courseId: ['', Validators.required],
      lessonId: [''],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: any[]) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  loadLessons() {
    if (this.courseId) {
      this.lessonService.getLessons(this.courseId).subscribe({
        next: (lessons: Lesson[]) => {
          this.lessons = lessons;
        },
        error: (err) => {
          console.error('Error loading lessons:', err);
          this.isForbidden = true;
        }
      });
    }
  }

  addLesson() {
    const { courseId, title, content } = this.lessonForm.value;
    this.lessonService.createLesson(courseId, { title, content }).subscribe({
      next: (response) => {
        alert('Lesson added successfully!');
        this.lessons.push(response);  // הוספת השיעור החדש לרשימה
      },
      error: (err) => {
        console.error('Error creating lesson:', err);
        this.isForbidden = true;
      }
    });
  }

  deleteLesson() {
    const { courseId, lessonId } = this.lessonForm.value;
    this.lessonService.deleteLesson(courseId, lessonId).subscribe({
      next: (response) => {
        alert('Lesson deleted successfully!');
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);  // מחיקת השיעור מהרשימה
      },
      error: (err) => {
        console.error('Error deleting lesson:', err);
        this.isForbidden = true;
      }
    });
  }

  updateLesson() {
    const { courseId, lessonId, title, content } = this.lessonForm.value;
    this.lessonService.updateLesson(courseId, lessonId, { title, content }).subscribe({
      next: (response) => {
        alert('Lesson updated successfully!');
        this.loadLessons();  // עדכון הרשימה
      },
      error: (err) => {
        console.error('Error updating lesson:', err);
        this.isForbidden = true;
      }
    });
  }

  setCourseId(courseId: number) {
    this.courseId = courseId;
    this.loadLessons();  // טוען את השיעורים כשמגדירים קורס
  }
}

