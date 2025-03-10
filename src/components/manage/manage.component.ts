

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  standalone: true,
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
export class ManageComponent {
  courses: Course[] = [];
  myForm: FormGroup;
  isForbidden = false;


  constructor(private fb: FormBuilder, private courseService: CoursesService) {
    this.myForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
    });
  }

  addFlag: boolean = false
  deleteFlag: boolean = false
  updateFlag: boolean = false
loadCourses(){
  this.courseService.getAllCourses().subscribe({
    next: (courses) => {
      this.courses = courses;
    },
    error: (err) => {
      console.error('Error loading courses:', err);
    }
  });

}

  addClick() {
    this.addFlag = true
    this.deleteFlag = false
    this.updateFlag = false
  }

  deleteClick() {
    this.deleteFlag = true
    this.addFlag = false
    this.updateFlag = false
  }

  updateClick() {
    this.updateFlag = true
    this.addFlag = false
    this.deleteFlag = false
  }

  onSubmitAdd() {
    console.log(this.myForm.value);
    const { title, description } = this.myForm.value
    const data = { title, description }

    this.courseService.createCourse(data).subscribe({
      next: res =>{ console.log('Success:', res),
        this.myForm.reset();
      },
      error: err =>{ console.error('Error:', err)
        this.isForbidden = true
      }
      })
  }

  onSubmitDelete() {
    const courseId = Number(this.myForm.value.id);
    if (!courseId || isNaN(courseId)) { 
      console.error('Invalid course ID');
      return;
  }
    console.log("the id:",courseId);
    this.courseService.deleteCourse(courseId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error deleting course:', error);
        this.isForbidden = true
      })
  }
  onSubmitUpdate() {
    const courseData = {
      title: this.myForm.value.title,
      description: this.myForm.value.description,
      teacherId: Number(localStorage.getItem('userId'))
    }
    const courseId = this.myForm.value.id
    console.log(this.myForm.value.id);    

    this.courseService.updateCourse(courseData,courseId).subscribe(
      (data) => {
        console.log("course updated succesfully", data);
        this.loadCourses();
      },
      (error) => {
        console.error('Error fetching courses:', error)
        this.isForbidden = true
      })
 
  }
}