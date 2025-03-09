import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../models/lesson';

@Pipe({
  name: 'lessonCount'
})
export class LessonCountPipe implements PipeTransform {

  transform(lessons: Lesson[], courseId: number): number {
    if (!lessons || !courseId) return 0;
    return lessons.filter(lesson => lesson.courseId === courseId).length;
  }
}



